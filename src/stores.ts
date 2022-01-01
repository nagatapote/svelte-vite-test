import { writable } from "svelte/store";

export const Priorities = {
  High: 1,
  Mid: 2,
  Low: 3,
} as const;
export type Priority = typeof Priorities[keyof typeof Priorities];

export type TodoItem = {
  id: number;
  title: string;
  priority: Priority;
};

const createTodoList = () => {
  const { subscribe, update } = writable<TodoItem[]>([]);

  const addItem = (title: string, priority: Priority) => {
    const id = new Date().getTime();
    update((todoList) => [...todoList, { id, title, priority }]);
  };

  const completeItem = (id: number) => {
    update((todoList) => todoList.filter((todo) => todo.id !== id));
  };

  return { subscribe, addItem, completeItem };
};

export const todoList = createTodoList();
