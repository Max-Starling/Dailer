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
  const now = new Date();

  dispatch({
    type: ADD_REPEATABLE_TASK,
    payload: {
      ...taskData,
      id: now.toISOString(),
      startDate: now.toISOString(),
      priority: 'medium',
      status: 'active',
    },
  });
};

export const editRepeatableTask = taskData => (dispatch) => {
  dispatch({
    type: EDIT_REPEATABLE_TASK,
    payload: taskData,
  });
};
