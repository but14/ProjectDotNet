"use client";

import { useState } from "react";

// Define the structure of a Todo item
interface Todo {
  id: number;
  title: string; 
  completed: boolean;
}

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const [text, setText] = useState("");

  const API_URL = "http://localhost:5112/api/todos";

  const add = async () => {
    if (!text) return;

    const res = await fetch(`${API_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: text, isComplete: false }),
    });

    const newTodo: Todo = await res.json();
    setTodos([...todos, newTodo]);
    setText("");
  };

  const remove = async (id: number) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="p-5 max-w-md mx-auto bg-white shadow-lg rounded-xl mt-10">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Công việc cần làm
      </h1>

      <div className="flex gap-2 mb-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-2 flex-1 rounded text-black"
          placeholder="Thêm công việc mới..."
        />
        <button
          onClick={add}
          className="bg-blue-600 text-white px-4 rounded-4 hover:bg-blue-700"
        >
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between p-3 bg-gray-50 border rounded items-center"
          >
            <span className="text-gray-700">{todo.title}</span>
            <button
              onClick={() => remove(todo.id)}
              className="text-red-500 font-medium text-sm"
            >
              Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
