"use client"; // Dùng client component để xử lý sự kiện (nút bấm, nhập liệu)

import { useState } from "react";

export default function SettingsPage() {
  // Giả lập state cho các cài đặt
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "Phạm Nguyễn Hoàng Long",
    email: "long.pnh@example.com",
    emailNotifications: true,
    darkMode: false,
  });

  // Hàm xử lý khi lưu
  const handleSave = () => {
    setLoading(true);
    // Giả lập gọi API mất 1 giây
    setTimeout(() => {
      setLoading(false);
      alert("Đã lưu cài đặt thành công!");
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Cài đặt</h1>

      <div className="grid gap-6">
        {/* --- PHẦN 1: THÔNG TIN TÀI KHOẢN --- */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Thông tin cá nhân
          </h2>

          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Họ và tên
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                disabled // Không cho sửa email
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* --- PHẦN 2: TÙY CHỌN --- */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Tùy chọn hệ thống
          </h2>

          <div className="space-y-4">
            {/* Toggle Switch: Dark Mode */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">
                  Chế độ tối (Dark Mode)
                </p>
                <p className="text-sm text-gray-500">
                  Giao diện nền tối bảo vệ mắt
                </p>
              </div>
              <button
                onClick={() =>
                  setFormData({ ...formData, darkMode: !formData.darkMode })
                }
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out ${
                  formData.darkMode ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                    formData.darkMode ? "translate-x-6" : "translate-x-0"
                  }`}
                ></div>
              </button>
            </div>

            <hr className="border-gray-100" />

            {/* Toggle Switch: Email Notification */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">Thông báo qua Email</p>
                <p className="text-sm text-gray-500">
                  Nhận email khi có công việc quá hạn
                </p>
              </div>
              <input
                type="checkbox"
                checked={formData.emailNotifications}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    emailNotifications: e.target.checked,
                  })
                }
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* --- NÚT LƯU --- */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={loading}
            className={`px-6 py-2 rounded-lg text-white font-medium shadow-md transition-all
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
              }
            `}
          >
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </div>
    </div>
  );
}
