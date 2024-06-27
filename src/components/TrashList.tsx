import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTrash, restoreTodo } from '../features/todos/todosSlice';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

interface Todo {
  id: string;
  title: string;
  description: string;
  deadline: string;
  completed: boolean;
}

const TrashList: React.FC = () => {
  const dispatch = useDispatch();
  const trash: Todo[] = useSelector(selectTrash); // Ensure your selector is typed

  const handleRestore = (id: string) => {
    dispatch(restoreTodo(id));
  };

  return (
    <Box>
      {trash && trash.length ? (
        <List>
          {trash.map((todo: Todo) => (
            <ListItem key={todo.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }} divider>
              <ListItemText
                primary={todo.title}
                secondary={
                  <>
                    Description: {todo.description}<br />
                    Deadline: {todo.deadline}<br />
                    Status: {todo.completed ? 'Completed' : 'Incomplete'}
                  </>
                }
                primaryTypographyProps={{ component: "div" }}
                secondaryTypographyProps={{ component: "div" }}
              />
              <Button variant="contained" color="primary" onClick={() => handleRestore(todo.id)}>
                Restore
              </Button>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="subtitle1" component="div">No trashed todos to show.</Typography>
      )}
    </Box>
  );
};

export default TrashList;
