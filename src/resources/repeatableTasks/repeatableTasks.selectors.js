export const getRepeatableTasks = ({ repeatableTasks }) => repeatableTasks;

export const getActiveRepeatableTasks = ({ repeatableTasks }) => repeatableTasks.filter(item => item.status === 'active');

export const getInactiveRepeatableTasks = ({ repeatableTasks }) => repeatableTasks.filter(item => item.status === 'inactive');
