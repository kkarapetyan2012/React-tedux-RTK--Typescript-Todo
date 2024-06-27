import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TrashList from './components/TrashList';
import { loadState } from './features/todos/todosSlice';
import Filter from './components/Filter';
import { Box, Grid, Typography } from '@mui/material';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadState());
  }, [dispatch]);

  return (
    <Grid container justifyContent="center" alignItems="center" >
      <Grid item>
        <Box 
          sx={{
            padding: '12px'
          }}
        > 
          <Typography
            variant="h1"
            sx={{
              textAlign: 'center',
              fontSize: {
                xs: '2.5rem',
                sm: '3.5rem',
                md: '4rem',
              }
            }}
          >
            Todo list
          </Typography>
          <TodoForm />
          <Filter />
          <TodoList />
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              fontSize: {
                xs: '1.5rem',
                sm: '2.5rem',
                md: '3.5rem',
              }
            }}
          >
            Trashed list
          </Typography>
          <TrashList />
        </Box>
      </Grid>
    </Grid>
  );
}

export default App;
