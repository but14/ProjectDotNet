import TodoList from "@/components/TodoList";

async function getData() {
  // Gọi API C# để lấy dữ liệu ban đầu
  // Cache: 'no-store' để luôn lấy dữ liệu mới nhất, không lưu cache cũ
  const res = await fetch("http://localhost:5112/api/todos", {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
  const todos = await getData();

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Truyền dữ liệu đã lấy xuống cho Component con */}
      <TodoList initialTodos={todos} />
    </main>
  );
}
