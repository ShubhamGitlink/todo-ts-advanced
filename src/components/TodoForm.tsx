import { useState } from 'react'
import { Box, TextField, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

interface TodoFormProps {
  onAddTodo: (text: string) => void;
}

const TodoForm = ({ onAddTodo }: TodoFormProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTodo(inputValue);
      setInputValue('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', mb: 2 }}>
      <TextField
        fullWidth
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new task..."
        variant="outlined"
        size="small"
        sx={{ mr: 1 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
      >
        Add
      </Button>
    </Box>
  );
};

export default TodoForm; 