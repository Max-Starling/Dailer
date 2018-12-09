import {
  ADD_REPEATABLE_TASK, 
  // FETCH_REPEATABLE_TASKS, 
  EDIT_REPEATABLE_TASK,
} from './repeatableTasks.types';

// export const fetchRepeatableTasks = () => async (dispatch) => {
//   const { repeatableTasks } = await api.fetchRepeatableTasks();
//   dispatch({ type: FETCH_REPEATABLE_TASKS, payload: repeatableTasks });
//   return repeatableTasks;
// };

export const addRepeatableTask = taskData => (dispatch) => {
  dispatch({
    type: ADD_REPEATABLE_TASK,
    payload: taskData,
  });
};

export const editRepeatableTask = taskData => (dispatch) => {
  dispatch({
    type: EDIT_REPEATABLE_TASK,
    payload: taskData,
  });
};
