import React from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todos/todosSlice';
import { v4 as uuidv4 } from 'uuid';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Grid } from '@mui/material';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  // description: Yup.string().required('Description is required'),
  // deadline: Yup.date().required('Deadline is required').nullable(),
});

interface FormValues {
  title: string;
  description: string;
  deadline: string;
}

const TodoForm: React.FC = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
    dispatch(addTodo({
      id: uuidv4(),
      title: values.title,
      description: values.description,
      deadline: values.deadline,
      completed: false,
      overdue: false,
    }));

    resetForm();
  };

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        deadline: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Grid container spacing={2}>
          <Grid item xs={12} >
          <Box display="flex" alignItems="center" flexWrap="wrap">
            <Box marginLeft={2}>
              <Field
                as={TextField}
                name="title"
                label="Title"
                variant="outlined"
                margin="normal"
                error={touched.title && !!errors.title}
                helperText={touched.title && errors.title}
              />
            </Box>
            <Box marginLeft={2}>
              <Field
                as={TextField}
                name="description"
                label="Description"
                variant="outlined"
                margin="normal"
                multiline
                rows={1}
                error={touched.description && !!errors.description}
                helperText={touched.description && errors.description}
              />
            </Box>
            <Box marginLeft={2}>
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
            </Box>
            <Box marginLeft={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: 16 }}
              >
                Add Todo
              </Button>
            </Box>
          </Box>
          </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default TodoForm;

