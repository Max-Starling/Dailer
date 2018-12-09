
import {
  ADD_REPEATABLE_TASK,
  EDIT_REPEATABLE_TASK,
  FETCH_REPEATABLE_TASKS,
} from './repeatableTasks.types';

const initialState = [
  {
    id: Math.floor(Math.random() * 10000),
    title: 'Подойти к Репникову',
    priority: 'high',
    startDate: '2018-12-03 21:00:00.000Z',
    frequency: 7,
  },
  {
    id: Math.floor(Math.random() * 10000),
    title: 'Тренировка',
    priority: 'medium',
    startDate: '2018-12-09 21:00:00.000Z',
    frequency: 3,
  },
];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_REPEATABLE_TASK:
      return ([
        ...state,
        action.payload,
      ]);
    
    case EDIT_REPEATABLE_TASK: {
      return state.map(item => item._id === action.payload._id
        ? action.payload
        : item
      );
    }

    case FETCH_REPEATABLE_TASKS:
      return ([
        ...action.payload,
      ]);

    default:
      return state;
  }
};
