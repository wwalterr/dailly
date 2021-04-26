import React, { createContext, useState, useContext } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const key = "Tasks";

const TasksDefaultState = [];

const TasksContext = createContext(TasksDefaultState);

const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState(TasksDefaultState);

  const startTasks = async () => {
    const _tasks = await AsyncStorage.getItem(key);

    if (_tasks) setTasks(JSON.parse(_tasks));
  };

  const createTask = async (task) => {
    const _tasks = [...tasks, task];

    setTasks(_tasks);

    await AsyncStorage.setItem(key, JSON.stringify(_tasks));
  };

  const updateTask = async (id, task) => {
    const _tasks = tasks.map((__task) => (__task.id == id ? task : __task));

    setTasks(_tasks);

    await AsyncStorage.setItem(key, JSON.stringify(_tasks));
  };

  const removeTask = async (id) => {
    const _tasks = tasks.filter((task) => !(task.id === id));

    setTasks(_tasks);

    await AsyncStorage.setItem(key, JSON.stringify(_tasks));
  };

  return (
    <TasksContext.Provider
      value={{ tasks, startTasks, createTask, updateTask, removeTask }}
    >
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
