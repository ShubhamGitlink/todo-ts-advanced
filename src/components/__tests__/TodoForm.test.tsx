import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoForm from '../TodoForm';

describe('TodoForm Component', () => {
  const mockAddTodo = vi.fn();

  beforeEach(() => {
    mockAddTodo.mockClear();
  });

  it('renders input field and submit button', () => {
    render(<TodoForm onAddTodo={mockAddTodo} />);
    
    expect(screen.getByPlaceholderText('Add a new task...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('updates input value when typing', async () => {
    render(<TodoForm onAddTodo={mockAddTodo} />);
    const user = userEvent.setup();
    
    const input = screen.getByPlaceholderText('Add a new task...');
    await user.type(input, 'New Todo Item');
    
    expect(input).toHaveValue('New Todo Item');
  });

  it('calls onAddTodo with input text on form submission', async () => {
    render(<TodoForm onAddTodo={mockAddTodo} />);
    const user = userEvent.setup();
    
    const input = screen.getByPlaceholderText('Add a new task...');
    const submitButton = screen.getByRole('button', { name: /add/i });
    
    await user.type(input, 'New Todo Item');
    await user.click(submitButton);
    
    expect(mockAddTodo).toHaveBeenCalledTimes(1);
    expect(mockAddTodo).toHaveBeenCalledWith('New Todo Item');
  });

  it('clears input field after submission', async () => {
    render(<TodoForm onAddTodo={mockAddTodo} />);
    const user = userEvent.setup();
    
    const input = screen.getByPlaceholderText('Add a new task...');
    const submitButton = screen.getByRole('button', { name: /add/i });
    
    await user.type(input, 'New Todo Item');
    await user.click(submitButton);
    
    expect(input).toHaveValue('');
  });

  it('does not call onAddTodo when submitting an empty input', async () => {
    render(<TodoForm onAddTodo={mockAddTodo} />);
    const user = userEvent.setup();
    
    const submitButton = screen.getByRole('button', { name: /add/i });
    await user.click(submitButton);
    
    expect(mockAddTodo).not.toHaveBeenCalled();
  });
}); 