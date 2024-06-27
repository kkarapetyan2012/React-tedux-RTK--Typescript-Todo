import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RootState {
  todos: TodosState;
}

interface Todo {
  id: string;
  title: string;
  description: string;
  deadline: string;
  completed: boolean;
  overdue?: boolean;
}

export type FilterType = 'all' | 'completed' | 'incomplete' | 'overdue';

interface TodosState {
  items: Todo[];
  trash: Todo[];
  filter: FilterType;
}

const initialState: TodosState = {
  items: [],
  trash: [],
  filter: 'all',
};

const saveStateToLocalStorage = (state: TodosState) => {
  localStorage.setItem('todos', JSON.stringify(state.items));
  localStorage.setItem('trash', JSON.stringify(state.trash));
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.items.push(action.payload);
      saveStateToLocalStorage(state);
    },
    toggleComplete: (state, action: PayloadAction<{ id: string }>) => {
      const todo = state.items.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed;
        todo.overdue = !todo.completed && new Date(todo.deadline) < new Date();
        saveStateToLocalStorage(state);
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const todo = state.items.find(todo => todo.id === action.payload);
      if (todo) {
        state.items = state.items.filter(todo => todo.id !== action.payload);
        state.trash.push(todo);
        saveStateToLocalStorage(state);
      }
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.items.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
        saveStateToLocalStorage(state);
      }
    },
    setOverdue: (state) => {
      const now = new Date();
      state.items.forEach(todo => {
        if (!todo.completed && new Date(todo.deadline) < now) {
          todo.overdue = true;
        } else {
          todo.overdue = false;
        }
      });
      saveStateToLocalStorage(state);
    },
    setFilter: (state, action: PayloadAction<'all' | 'completed' | 'incomplete' | 'overdue'>) => {
      state.filter = action.payload;
    },
    loadState: (state) => {
      const savedTodos = localStorage.getItem('todos');
      const savedTrash = localStorage.getItem('trash');
      if (savedTodos) {
        state.items = JSON.parse(savedTodos);
      }
      if (savedTrash) {
        state.trash = JSON.parse(savedTrash);
      }
    },
    restoreTodo: (state, action: PayloadAction<string>) => {
      const todo = state.trash.find(todo => todo.id === action.payload);
      if (todo) {
        state.trash = state.trash.filter(todo => todo.id !== action.payload);
        state.items.push(todo);
        saveStateToLocalStorage(state);
      }
    },
    editTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.items.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
        saveStateToLocalStorage(state);
      }
    }
  },
});

export const { addTodo, toggleComplete, deleteTodo, updateTodo, setOverdue, setFilter, loadState, restoreTodo, editTodo } = todosSlice.actions;

// Selector to get the current filter
export const selectFilter = (state: { todos: TodosState }) => state.todos.filter;

// Selector to get todo items
export const selectTodos = (state: { todos: TodosState }) => state.todos.items;

// Selector to get trash items
export const selectTrash = (state: { todos: TodosState }) => state.todos.trash;

export default todosSlice.reducer;
