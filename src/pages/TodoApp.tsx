import { useState, useEffect } from 'react'
import { Box, Paper, Typography, Alert } from '@mui/material'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    // Load from localStorage on initial render
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    return [];
  });

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    if (text.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text,
        completed: false
      };
      setTodos([...todos, newTodo]);
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <Box>
      <Paper elevation={3} sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Todo List
        </Typography>
        
        <TodoForm onAddTodo={addTodo} />
        
        <Box sx={{ mt: 2 }}>
          <TodoList 
            todos={todos.filter(todo => !todo.completed)} 
            onToggle={toggleTodo} 
            onDelete={deleteTodo} 
          />
          
          {todos.filter(todo => !todo.completed).length === 0 && (
            <Alert severity="info" sx={{ mt: 2 }}>
              No active todos. Add a new one above!
            </Alert>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default TodoApp; 