import React, { createContext, useState, useContext } from "react";

import * as SecureStore from "expo-secure-store";

/*
	Task example:

	{
		id: '',
		category: '',
		text: '',
		remindEmail: false,
		remindNotification: false,
		increment: false,
		counter: 0,
	}
*/

const TasksDefaultState = [];

const TasksContext = createContext(TasksDefaultState);

const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState(TasksDefaultState);

  const addTask = async (task) => {
    setTasks((previousTasks) => [...previousTasks, task]);

    try {
      await SecureStore.setItemAsync("tasks", JSON.stringify(tasks));
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const updateTask = async (id, task) => {
    setTasks((previousTasks) =>
      previousTasks.map((_task) => (_task.id === id ? task : _task))
    );

    try {
      await SecureStore.setItemAsync("tasks", JSON.stringify(tasks));
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const removeTask = async (id) => {
    setTasks((previousTasks) => previousTasks.filter((task) => task.id === id));

    try {
      await SecureStore.setItemAsync("tasks", JSON.stringify(tasks));
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, updateTask, removeTask }}>
      {children}
    </TasksContext.Provider>
  );
};

const useTasks = () => {
  const context = useContext(TasksContext);

  if (!context)
    throw new Error("useTasks must be used within an TasksProvider");

  return context;
};

export { TasksProvider, useTasks };
