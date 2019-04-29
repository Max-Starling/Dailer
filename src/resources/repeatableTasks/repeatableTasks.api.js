import axios from "axios";

export const fetchRepeatableTasks = async () => {
  let tasks = [];
  try {
    const res = await axios.post(
      'http://localhost:4000/graphql',
      `query {
        tasks {
          _id,
          title,
          frequency,
          status,
          startTime
        }
      }`,
      {
        headers: { "Content-Type": "application/graphql" }
      },
    );
    if (res.status === 200 && res.data && res.data.data && res.data.data.tasks) {
      tasks = [...res.data.data.tasks];
    }
  } catch (e) {
    console.log(e);
  }
  return { tasks };
};

export const addRepeatableTask = async (taskData) => {
  let task = {};
  try {
    const res = await axios.post(
      'http://localhost:4000/graphql',
      `mutation {
        createTask(title: "${taskData.title}", frequency: ${taskData.frequency}) {
          _id,
          title,
          frequency,
          status,
          startTime
        }
      }`,
      {
        headers: { "Content-Type": "application/graphql" }
      },
    );
    if (res.status === 200 && res.data && res.data.data && res.data.data.createTask) {
      task = { ...res.data.data.createTask };
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
  return { task };
};

export const editRepeatableTask = async (taskData) => {
  let task = {};
  try {
    const res = await axios.post(
      'http://localhost:4000/graphql',
      `mutation {
        updateTask(_id: "${taskData._id}", title: "${taskData.title}", status: "${taskData.status}", frequency: ${taskData.frequency}) {
          _id,
          title,
          frequency,
          status,
          startTime
        }
      }`,
      {
        headers: { "Content-Type": "application/graphql" }
      },
    );
    if (res.status === 200 && res.data && res.data.data && res.data.data.updateTask) {
      task = { ...res.data.data.updateTask };
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
  return { task };
};
