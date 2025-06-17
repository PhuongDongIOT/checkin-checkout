'use client';

import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export default function QrGenerator() {
    const [value, setValue] = useState('https://example.com');

    return (
        <div className="flex flex-col items-center gap-4 p-6 relative">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Nhập nội dung / URL"
                className="border p-2 w-80 rounded"
            />

            <div className="relative w-[200px] h-[200px]">
                <QRCodeCanvas
                    value={value}
                    size={200}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    level="H"
                    includeMargin
                />
                
                <img
                    src="/avatar.png"
                    alt="Avatar"
                    className="w-12 h-12 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white shadow-md"
                />
            </div>

            <p className="text-sm text-gray-500">QR Code sẽ thay đổi theo nội dung bên trên.</p>
        </div>
    );
}
