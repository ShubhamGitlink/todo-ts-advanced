import { ListItem, ListItemIcon, ListItemText, Checkbox, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton 
          edge="end" 
          onClick={() => onDelete(todo.id)}
          color="error"
          size="small"
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          color="primary"
        />
      </ListItemIcon>
      <ListItemText
        primary={todo.text}
        sx={{ 
          textDecoration: todo.completed ? 'line-through' : 'none',
          color: todo.completed ? 'text.disabled' : 'text.primary'
        }}
      />
    </ListItem>
  );
};

export default TodoItem; 