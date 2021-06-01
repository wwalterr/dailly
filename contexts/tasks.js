import React, { createContext, useState, useContext, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const key = "Tasks";

const defaultTasks = [];

const TasksContext = createContext(defaultTasks);

const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState(defaultTasks);

  useEffect(() => {
    (async () => {
      const _tasks = await AsyncStorage.getItem(key);

      if (_tasks) setTasks(JSON.parse(_tasks));
    })();
  }, []);

  const createTask = async (task) => {
    const _tasks = [task, ...tasks];

    setTasks(_tasks);

    await AsyncStorage.setItem(key, JSON.stringify(_tasks));
  };

  const findTask = async (id) => {
    return tasks.find((task) => task.id === id);
  };

  const updateTask = async (id, task) => {
    const _tasks = tasks.map((__task) => (__task.id === id ? task : __task));

    setTasks(_tasks);

    await AsyncStorage.setItem(key, JSON.stringify(_tasks));
  };

  const removeTask = async (id) => {
    const _tasks = tasks.filter((task) => !(task.id === id));

    setTasks(_tasks);

    await AsyncStorage.setItem(key, JSON.stringify(_tasks));
  };

  const importTasks = async (_tasks) => {
    const __tasks = [...tasks, ..._tasks];

    setTasks(__tasks);

    await AsyncStorage.setItem(key, JSON.stringify(__tasks));
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        createTask,
        findTask,
        updateTask,
        removeTask,
        importTasks,
      }}
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
