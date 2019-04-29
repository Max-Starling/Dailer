import {
  ADD_REPEATABLE_TASK, 
  FETCH_REPEATABLE_TASKS, 
  EDIT_REPEATABLE_TASK,
} from './repeatableTasks.types';

import * as api from './repeatableTasks.api';

export const fetchRepeatableTasks = () => async (dispatch) => {
  const { tasks } = await api.fetchRepeatableTasks();
  dispatch({ type: FETCH_REPEATABLE_TASKS, payload: tasks });
  return tasks;
};

export const addRepeatableTask = taskData => async (dispatch) => {
  const { task } = await api.addRepeatableTask(taskData);

  dispatch({
    type: ADD_REPEATABLE_TASK,
    payload: task,
  });
};

export const editRepeatableTask = taskData => async (dispatch) => {
  const { task } = await api.editRepeatableTask(taskData);

  dispatch({
    type: EDIT_REPEATABLE_TASK,
    payload: task,
  });
};
