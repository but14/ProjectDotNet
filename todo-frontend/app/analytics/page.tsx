"use client";

import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Đăng ký các thành phần của biểu đồ
ChartJS.register(ArcElement, Tooltip, Legend);

interface Todo {
  id: number;
  title: string;
  isComplete: boolean;
}

export default function AnalyticsPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Lấy dữ liệu từ API .NET
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5263/api/todos"); // KIỂM TRA PORT
        const data = await res.json();
        setTodos(data);
      } catch (error) {
        console.error("Lỗi kết nối:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 2. Tính toán số liệu
  const total = todos.length;
  const completed = todos.filter((t) => t.isComplete).length;
  const pending = total - completed;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  // 3. Cấu hình dữ liệu cho Biểu đồ tròn (Doughnut Chart)
  const chartData = {
    labels: ["Hoàn thành", "Đang chờ"],
    datasets: [
      {
        data: [completed, pending],
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)", // Màu xanh lá (Completed)
          "rgba(239, 68, 68, 0.8)", // Màu đỏ (Pending)
        ],
        borderColor: ["rgba(34, 197, 94, 1)", "rgba(239, 68, 68, 1)"],
        borderWidth: 1,
      },
    ],
  };

  if (loading) return <div className="p-8">Đang tải dữ liệu...</div>;

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Thống kê hiệu suất
      </h1>

      {/* --- PHẦN 1: CÁC THẺ SỐ LIỆU TỔNG QUAN --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Tổng số */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Tổng công việc</p>
            <p className="text-3xl font-bold text-blue-600">{total}</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full text-blue-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
        </div>

        {/* Card 2: Đã hoàn thành */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Đã hoàn thành</p>
            <p className="text-3xl font-bold text-green-600">{completed}</p>
          </div>
          <div className="p-3 bg-green-100 rounded-full text-green-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Card 3: Tỷ lệ */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">
              Tỷ lệ thành công
            </p>
            <p className="text-3xl font-bold text-purple-600">{percentage}%</p>
          </div>
          <div className="p-3 bg-purple-100 rounded-full text-purple-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* --- PHẦN 2: BIỂU ĐỒ VÀ CHI TIẾT --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Cột Trái: Biểu đồ */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-6 text-gray-800">
            Biểu đồ trạng thái
          </h2>
          <div className="w-64 h-64 mx-auto">
            {/* Component biểu đồ từ thư viện */}
            <Doughnut data={chartData} />
          </div>
          <div className="mt-6 text-center text-sm text-gray-500">
            Biểu quan trực quan giữa công việc đã làm và còn lại.
          </div>
        </div>

        {/* Cột Phải: Thanh tiến độ & Phân tích */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-6 text-gray-800">Mục tiêu</h2>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  Tiến độ tổng thể
                </span>
                <span className="text-sm font-medium text-blue-700">
                  {percentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <h3 className="font-medium text-slate-800 mb-2">Nhận xét:</h3>
              {percentage === 100 ? (
                <p className="text-sm text-green-600">
                  Tuyệt vời! Bạn đã hoàn thành tất cả công việc.
                </p>
              ) : percentage > 50 ? (
                <p className="text-sm text-blue-600">
                  Bạn đang làm rất tốt, hãy cố gắng hoàn thành nốt nhé.
                </p>
              ) : (
                <p className="text-sm text-orange-600">
                  Bạn còn khá nhiều việc tồn đọng, hãy tập trung hơn.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
