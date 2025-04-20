import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Box, Paper, Typography, Button, Alert } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import TodoList from '../components/TodoList'

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const CompletedTasks = () => {
  const [completedTodos, setCompletedTodos] = useState<Todo[]>(() => {
    // Load from localStorage on initial render
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos).filter((todo: Todo) => todo.completed);
    }
    return [];
  });

  useEffect(() => {
    // Update completed todos whenever localStorage changes
    const handleStorageChange = () => {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        setCompletedTodos(JSON.parse(savedTodos).filter((todo: Todo) => todo.completed));
      }
    };

    // Listen for storage events (won't catch changes in the same tab)
    window.addEventListener('storage', handleStorageChange);
    
    // Poll for changes every second (to catch changes in the same tab)
    const interval = setInterval(() => {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        const parsedTodos = JSON.parse(savedTodos).filter((todo: Todo) => todo.completed);
        if (JSON.stringify(parsedTodos) !== JSON.stringify(completedTodos)) {
          setCompletedTodos(parsedTodos);
        }
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [completedTodos]);

  const handleToggle = (id: number) => {
    // Get current todos
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      const allTodos = JSON.parse(savedTodos);
      // Toggle the completed status
      const updatedTodos = allTodos.map((todo: Todo) => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      // Save back to localStorage
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      // Update state
      setCompletedTodos(updatedTodos.filter((todo: Todo) => todo.completed));
    }
  };

  const handleDelete = (id: number) => {
    // Get current todos
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      const allTodos = JSON.parse(savedTodos);
      // Remove the todo
      const updatedTodos = allTodos.filter((todo: Todo) => todo.id !== id);
      // Save back to localStorage
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      // Update state
      setCompletedTodos(updatedTodos.filter((todo: Todo) => todo.completed));
    }
  };

  return (
    <Box>
      <Paper elevation={3} sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="h1">
            Completed Tasks
          </Typography>
          <Button 
            component={Link} 
            to="/todos" 
            variant="contained" 
            color="primary"
            startIcon={<ArrowBackIcon />}
            size="small"
          >
            Back to Todo List
          </Button>
        </Box>
        
        <Box sx={{ mt: 2 }}>
          <TodoList 
            todos={completedTodos} 
            onToggle={handleToggle} 
            onDelete={handleDelete} 
          />
          
          {completedTodos.length === 0 && (
            <Alert severity="info" sx={{ mt: 2 }}>
              No completed tasks yet. Complete some tasks from your Todo list!
            </Alert>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default CompletedTasks; 