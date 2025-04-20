import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import TodoList from '../TodoList';

// Define Todo interface
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Mock the TodoItem component to simplify testing
vi.mock('../TodoItem', () => ({
  default: ({ todo, onToggle, onDelete }: {
    todo: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
  }) => (
    <div data-testid={`todo-item-${todo.id}`}>
      <span>{todo.text}</span>
      <button onClick={() => onToggle(todo.id)}>Toggle</button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  )
}));

describe('TodoList Component', () => {
  const mockTodos = [
    { id: 1, text: 'Task 1', completed: false },
    { id: 2, text: 'Task 2', completed: true },
    { id: 3, text: 'Task 3', completed: false }
  ];
  
  const mockToggle = vi.fn();
  const mockDelete = vi.fn();

  beforeEach(() => {
    mockToggle.mockClear();
    mockDelete.mockClear();
  });

  it('renders the correct number of todo items', () => {
    render(
      <TodoList 
        todos={mockTodos} 
        onToggle={mockToggle} 
        onDelete={mockDelete} 
      />
    );
    
    expect(screen.getByTestId('todo-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-2')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-3')).toBeInTheDocument();
    expect(screen.getAllByTestId(/todo-item-/)).toHaveLength(3);
  });

  it('renders no items when todos array is empty', () => {
    render(
      <TodoList 
        todos={[]} 
        onToggle={mockToggle} 
        onDelete={mockDelete} 
      />
    );
    
    expect(screen.queryByTestId(/todo-item-/)).not.toBeInTheDocument();
  });
}); 