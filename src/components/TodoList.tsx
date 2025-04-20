import { List, Divider } from '@mui/material'
import TodoItem from './TodoItem'

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
  return (
    <List>
      {todos.map((todo, index) => (
        <div key={todo.id}>
          <TodoItem 
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
          {index < todos.length - 1 && <Divider />}
        </div>
      ))}
    </List>
  );
};

export default TodoList; 