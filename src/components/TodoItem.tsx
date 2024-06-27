import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleComplete, deleteTodo, editTodo } from '../features/todos/todosSlice';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Edit, Delete, Save } from '@mui/icons-material';

interface Todo {
  id: string;
  title: string;
  description: string;
  deadline: string;
  completed: boolean;
  overdue?: boolean | undefined;
}

interface TodoFormValues {
  title: string;
  description: string;
  deadline: string;
}


// Validation schema using Yup
const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  // description: Yup.string().required('Description is required'),
  // deadline: Yup.date().required('Deadline is required').nullable(),
});

interface TodoItemProps {
  todo: Todo;
}

const TodoItem:React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleComplete = () => {
    dispatch(toggleComplete({ id: todo.id }));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (values: TodoFormValues, { resetForm }: FormikHelpers<TodoFormValues>) => {
    dispatch(editTodo({
      id: todo.id,
      title: values.title,
      description: values.description,
      deadline: values.deadline,
      completed: todo.completed,
      overdue: todo.overdue,
    }));
    setIsEditing(false);
    resetForm();
  };

  let changeTaskStatus;

  if (todo.overdue) {
    changeTaskStatus = 'red';
  } else if (todo.completed) {
    changeTaskStatus = 'green';
  } else {
    changeTaskStatus = 'black';
  }

  return (
    <ListItem
      style={{ display: 'flex', alignItems: 'center', marginBottom: 12, color: changeTaskStatus }}
      divider
    >
      {isEditing ? (
        <Formik
          initialValues={{
            title: todo.title,
            description: todo.description,
            deadline: todo.deadline,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSave}
        >
          {({ errors, touched }) => (
            <Form style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <Field
                as={TextField}
                name="title"
                label="Title"
                variant="outlined"
                margin="normal"
                error={touched.title && !!errors.title}
                helperText={touched.title && errors.title}
              />
              <Field
                as={TextField}
                name="description"
                label="Description"
                variant="outlined"
                margin="normal"
                multiline
                rows={4}
                error={touched.description && !!errors.description}
                helperText={touched.description && errors.description}
              />
              <Field
                as={TextField}
                name="deadline"
                label="Deadline"
                type="date"
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                error={touched.deadline && !!errors.deadline}
                helperText={touched.deadline && errors.deadline}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<Save />}
                style={{ alignSelf: 'flex-end', marginTop: 12 }}
              >
                Save
              </Button>
            </Form>
          )}
        </Formik>
      ) : (
        <Box style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <ListItemText
            primary={todo.title}
            secondary={
              <>
                <Typography component="span" variant="body2" color="textPrimary">
                  {todo.description}
                </Typography>
                <Typography component="span" variant="body2" color="textSecondary">
                  {` - ${todo.deadline}`}
                </Typography>
                <Typography component="span" variant="body2" color="textSecondary">
                  {` - ${todo.completed ? 'Completed' : 'Incomplete'}`}
                </Typography>
                {todo.overdue && (
                  <Typography component="span" variant="body2" color="error">
                    - Overdue
                  </Typography>
                )}
              </>
            }
          />
          {!todo.overdue && (
            <IconButton onClick={handleToggleComplete} color="primary">
              <Typography variant="body2" style={{ fontSize: '12px' }}>
                {todo.completed ? 'Did' : 'Done'}
              </Typography>
            </IconButton>
          )}
          {!todo.completed && (
            <>
              <IconButton onClick={handleDelete} color="secondary">
                <Delete />
              </IconButton>
              <IconButton onClick={handleEdit} color="default">
                <Edit />
              </IconButton>
            </>
          )}
        </Box>
      )}
    </ListItem>
  );
}

export default TodoItem;
