'use client'

import { useState } from "react";
import AnimatedModal from "./animated-modal";

export function Instructions() {
    const [open, setOpen] = useState(false)
    return (
        <div className="text-sm">
            <span className="text-sm py-2 px-2 text-black font-bold rounded-sm bg-cyan-200 hover:cursor-pointer" onClick={() => setOpen(true)}>
                Nhấn vào để xem hướng dẫn
            </span>
            <AnimatedModal isOpen={open} onClose={() => setOpen(false)}>
                <div className="bg-white py-4 text-gray-800 space-y-3 text-left">
                    <h2 className="text-2xl font-bold text-blue-600">🎉 Chào mừng bạn!</h2>
                    <p>🖼️ <strong>Bước 1:</strong> Tải ảnh đại diện từ thiết bị và căn chỉnh khuôn mặt.</p>
                    <p>✍️ <strong>Bước 2:</strong> Nhập họ tên và sự kiện bạn muốn mời.</p>
                    <p>🧩 <strong>Bước 3:</strong> Xem trước thiệp mời với ảnh và thông tin bạn đã điền.</p>
                    <p>📩 <strong>Bước 4:</strong> Gửi qua email hoặc tải ảnh về máy.</p>
                    <p className="text-green-600 font-medium">✅ Chúc bạn tạo được thiệp mời thật ưng ý!</p>
                </div>
                <button
                    onClick={() => setOpen(false)}
                    className="bg-red-500 text-white px-3 py-1 rounded w-full"
                >
                    Đóng
                </button>
            </AnimatedModal>
        </div>
    )
}