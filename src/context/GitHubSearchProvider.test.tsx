import { render, screen, act, waitFor, fireEvent } from '@testing-library/react'
import axios from 'axios'
import { GitHubSearchProvider } from './GitHubSearchProvider'
import { useGitHubSearch } from './useGitHubSearch'

jest.mock('axios')

const TestComponent = () => {
  const { searchTerm, setSearchTerm, results, loading } = useGitHubSearch()
  return (
    <div>
      <input 
        data-testid="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading && <div>Loading...</div>}
      <ul>
        {results.map(user => (
          <li key={user.id}>{user.login}</li>
        ))}
      </ul>
    </div>
  )
}

describe('GitHubSearchProvider', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should provide search context to children', () => {
    render(
      <GitHubSearchProvider>
        <TestComponent />
      </GitHubSearchProvider>
    )
    expect(screen.getByTestId('search-input')).toBeInTheDocument()
  })

it('should fetch results after debounced input', async () => {
    const mockData = {
      items: [
        { id: 1, login: 'user1' },
        { id: 2, login: 'user2' }
      ]
    }
    
    // Create a promise that we can resolve manually
    let resolvePromise: (value: unknown) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    
    (axios.get as jest.Mock).mockImplementation(() => promise);

    render(
      <GitHubSearchProvider>
        <TestComponent />
      </GitHubSearchProvider>
    )

    const input = screen.getByTestId('search-input')
    fireEvent.change(input, { target: { value: 'test' } })

    // Wait for debounce and check loading state
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    }, { timeout: 600 })

    // Resolve the API call
    resolvePromise!({ data: mockData });

    // Check results
    await waitFor(() => {
      expect(screen.getByText('user1')).toBeInTheDocument()
      expect(screen.getByText('user2')).toBeInTheDocument()
    })
})

  it('should handle API errors gracefully', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    ;(axios.get as jest.Mock).mockRejectedValueOnce(new Error('API Error'))

    render(
      <GitHubSearchProvider>
        <TestComponent />
      </GitHubSearchProvider>
    )

    
    const input:HTMLInputElement = screen.getByTestId('search-input')
    
    act(() => {
      input.value = 'test'
      input.dispatchEvent(new Event('change'))
    })

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled()
    })

    consoleErrorSpy.mockRestore()
  })
})