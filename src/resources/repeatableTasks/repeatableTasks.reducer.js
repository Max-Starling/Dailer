
import {
  ADD_REPEATABLE_TASK,
  EDIT_REPEATABLE_TASK,
  FETCH_REPEATABLE_TASKS,
} from './repeatableTasks.types';

const initialState = [
  {
    id: 31,
    title: 'Подойти к Репникову',
    priority: 'high',
    startDate: '2018-12-12 16:00:00.000Z',
    frequency: 7,
    status: 'active'
  },
  {
    id: 32,
    title: 'Тренировка',
    priority: 'medium',
    startDate: '2018-12-12 15:00:00.000Z',
    frequency: 3,
    status: 'active',
  },
  {
    id: 33,
    title: 'Курсы вождения',
    priority: 'medium',
    startDate: '2018-11-12 15:00:00.000Z',
    frequency: 7,
    status: 'inactive',
  },
];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_REPEATABLE_TASK:
      return ([
        ...state,
        action.payload,
      ]);
    
    case EDIT_REPEATABLE_TASK:
      return state.map(item => item.id === action.payload.id
        ? { ...item, ...action.payload }
        : item
      );

    case FETCH_REPEATABLE_TASKS:
      return ([
        ...action.payload,
      ]);

    default:
      return state;
  }
};
