import { fireEvent, render, screen } from '@testing-library/react'
import { TodoList } from './TodoList'

describe('TodoList', () => {
  it('should render todo list', () => {
    render(<TodoList />)
    expect(screen.getByText('Todo List')).toBeInTheDocument()
  })

  it('should render initial todo list', () => {
    render(<TodoList />)
    
    expect(screen.getByText('Lavar a louça')).toBeInTheDocument()
    expect(screen.getByText('Escovar o dente')).toBeInTheDocument()
    expect(screen.getByText('Codar')).toBeInTheDocument()
  })

  it('should add new task when clicking add button', () => {
    render(<TodoList />)
    
    const input = screen.getByPlaceholderText('type your task')
    const addButton = screen.getByText('Add Task')
    
    fireEvent.change(input, { target: { value: 'Nova tarefa' } })
    fireEvent.click(addButton)
    
    expect(screen.getByText('Nova tarefa')).toBeInTheDocument()
  })

  it('should toggle task completion when clicking checkbox', () => {
    render(<TodoList />)
    
    const checkbox = screen.getAllByRole('checkbox')[0]
    fireEvent.click(checkbox)
    
    expect(checkbox).toBeChecked()
  })

  it('should delete task when clicking delete button', () => {
    render(<TodoList />)
    
    const deleteButtons = screen.getAllByText('❌')
    fireEvent.click(deleteButtons[0])
    
    expect(screen.queryByText('Lavar a louça')).not.toBeInTheDocument()
  })
})