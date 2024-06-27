import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, selectFilter, FilterType, RootState } from '../features/todos/todosSlice';
import { Grid, ButtonGroup, Button } from '@mui/material';

const Filter: React.FC = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector<RootState, FilterType>(selectFilter);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{
          display: 'flex', 
          flexWrap: 'wrap',
          '& > *': {
            margin: 0.5,
          }
        }}>
          {(['all', 'completed', 'incomplete', 'overdue'] as FilterType[]).map((filter) => (
            <Button
              key={filter}
              disabled={currentFilter === filter}
              onClick={() => dispatch(setFilter(filter))}
              style={{ marginLeft: 12 }}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Button>
          ))}
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}

export default Filter;
