import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CompletedTasks from '../CompletedTasks';

// Define Todo interface
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Mock TodoList component
vi.mock('../../components/TodoList', () => ({
  default: ({ todos, onToggle, onDelete }: {
    todos: Todo[];
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
  }) => (
    <div data-testid="todo-list">
      {todos.length === 0 && <div>No completed todos</div>}
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

// Helper component wrapper to provide router context
const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe('CompletedTasks Component', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
    
    // Clear addEventListener and interval mocks
    vi.spyOn(window, 'addEventListener').mockClear();
    vi.spyOn(window, 'removeEventListener').mockClear();
    vi.spyOn(window, 'setInterval').mockClear();
    vi.spyOn(window, 'clearInterval').mockClear();
  });

  it('renders the completed tasks page with title', () => {
    renderWithRouter(<CompletedTasks />);
    
    expect(screen.getByText('Completed Tasks')).toBeInTheDocument();
    expect(screen.getByText('Back to Todo List')).toBeInTheDocument();
  });

  it('shows info message when no completed tasks', () => {
    // Empty or no completed todos in localStorage
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify([]));
    
    renderWithRouter(<CompletedTasks />);
    
    expect(screen.getByText('No completed tasks yet. Complete some tasks from your Todo list!')).toBeInTheDocument();
  });

  it('displays completed todos from localStorage', () => {
    const mockTodos = [
      { id: 1, text: 'Task 1', completed: true },
      { id: 2, text: 'Task 2', completed: false },
      { id: 3, text: 'Task 3', completed: true }
    ];
    
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(mockTodos));
    
    renderWithRouter(<CompletedTasks />);
    
    // Should only display completed todos
    expect(screen.getByTestId('todo-1')).toBeInTheDocument();
    expect(screen.getByTestId('todo-3')).toBeInTheDocument();
    expect(screen.queryByTestId('todo-2')).not.toBeInTheDocument();
  });

  it('sets up event listeners and intervals on mount', () => {
    // Spy on addEventListener and setInterval
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const setIntervalSpy = vi.spyOn(window, 'setInterval').mockReturnValue(123);
    
    renderWithRouter(<CompletedTasks />);
    
    expect(addEventListenerSpy).toHaveBeenCalledWith('storage', expect.any(Function));
    expect(setIntervalSpy).toHaveBeenCalled();
  });

  it('cleans up event listeners and intervals on unmount', () => {
    // Spy on removeEventListener and clearInterval
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval');
    
    // Setup interval mock
    vi.spyOn(window, 'setInterval').mockReturnValue(123);
    
    const { unmount } = renderWithRouter(<CompletedTasks />);
    
    // Unmount the component
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('storage', expect.any(Function));
    expect(clearIntervalSpy).toHaveBeenCalledWith(123);
  });
}); 