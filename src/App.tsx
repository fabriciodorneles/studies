import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import './App.css'
import { TodoList } from './components/TodoList'
import { DebouncedSearch } from './components/DebouncedSearch'
import { DebouncedSearch2 } from './components/DebouncedSearch2'
import { GitHubSearchProvider } from './context/GitHubSearchProvider'
import { ApolloLocations } from './components/ApolloLocations'

function App() {
  return (
    <GitHubSearchProvider>
      <Router>
        <div style={{ height: '100vh' }}>
          <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            padding: '1rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            zIndex: 1000
          }}>
            <ul style={{ 
              display: 'flex', 
              gap: '20px', 
              listStyle: 'none',
              margin: 0,
              padding: 0
            }}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/todo">Todo List</Link>
              </li>
              <li>
                <Link to="/debounced">Debounced Search</Link>
              </li>
              <li>
                <Link to="/debounced2">Debounced Search 2</Link>
              </li>
              <li>
                <Link to="/apollo-locations">Apollo Query</Link>
              </li>
            </ul>
          </nav>

          <main style={{ 
            paddingTop: '60px',
            padding: '80px 20px 20px'
          }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/todo" element={<TodoList />} />
              <Route path="/debounced" element={<DebouncedSearch />} />
              <Route path="/debounced2" element={<DebouncedSearch2 />} />
              <Route path="/apollo-locations" element={<ApolloLocations />} />
            </Routes>
          </main>
        </div>
      </Router>
    </GitHubSearchProvider>
  )
}

export default App