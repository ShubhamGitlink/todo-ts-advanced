import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoApp from '../TodoApp';

// Define Todo interface
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Mock the child components to simplify testing
vi.mock('../../components/TodoForm', () => ({
  default: ({ onAddTodo }: { onAddTodo: (text: string) => void }) => (
    <div data-testid="todo-form">
      <input 
        data-testid="todo-input" 
        placeholder="Add a new task..." 
      />
      <button 
        data-testid="add-button"
        onClick={() => onAddTodo('New Test Todo')}
      >
        Add
      </button>
    </div>
  )
}));

vi.mock('../../components/TodoList', () => ({
  default: ({ todos, onToggle, onDelete }: {
    todos: Todo[];
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
  }) => (
    <div data-testid="todo-list">
      {todos.map((todo: Todo) => (
        <div key={todo.id} data-testid={`todo-${todo.id}`}>
          <span>{todo.text}</span>
          <button 
            data-testid={`toggle-${todo.id}`}
            onClick={() => onToggle(todo.id)}
          >
            Toggle
          </button>
          <button 
            data-testid={`delete-${todo.id}`}
            onClick={() => onDelete(todo.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}));

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: vi.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('TodoApp Component', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('renders TodoForm and empty TodoList by default', () => {
    render(<TodoApp />);
    
    expect(screen.getByTestId('todo-form')).toBeInTheDocument();
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
    expect(screen.getByText('No active todos. Add a new one above!')).toBeInTheDocument();
  });

  it('adds a new todo when TodoForm calls addTodo', async () => {
    render(<TodoApp />);
    const user = userEvent.setup();
    
    // Simulate adding a new todo
    await user.click(screen.getByTestId('add-button'));
    
    // Check localStorage was updated
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'todos', 
      expect.stringContaining('New Test Todo')
    );
  });

  it('loads todos from localStorage on mount', () => {
    const mockTodos = [
      { id: 1, text: 'Saved Todo', completed: false }
    ];
    
    // Setup localStorage with initial data
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(mockTodos));
    
    render(<TodoApp />);
    
    // Verify the saved todo is displayed
    expect(screen.getByTestId('todo-1')).toBeInTheDocument();
    expect(screen.getByText('Saved Todo')).toBeInTheDocument();
  });
}); 