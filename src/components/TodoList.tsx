import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import { selectTodos, selectFilter, setOverdue } from '../features/todos/todosSlice';
import { List, Typography } from '@mui/material';

const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const filter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(setOverdue());
  }, [dispatch, todos]);

  const getFilteredTodos = () => {
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'incomplete':
        return todos.filter(todo => !todo.completed);
      case 'overdue':
        return todos.filter(todo => todo.overdue);
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();

  return (
    <div>
      {filteredTodos.length ? (
        <List>
          {filteredTodos.map(todo => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </List>
      ) : (
        <Typography variant="subtitle1" color="textSecondary">
          No todos to show.
        </Typography>
      )}
    </div>
  );
}

export default TodoList;
