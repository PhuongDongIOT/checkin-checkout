'use client';
import { useState } from 'react';

export default function SendQrForm() {
  const [email, setEmail] = useState('');
  const [qrValue, setQrValue] = useState('https://example.com');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    const res = await fetch('/api/send-qr', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: email, qrData: qrValue }),
    });

    const data = await res.json();
    alert(data.success ? 'Email sent successfully!' : 'Error: ' + data.error);
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4 p-4 max-w-sm mx-auto">
      <input
        type="email"
        placeholder="Nhập email người nhận"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Dữ liệu QR"
        value={qrValue}
        onChange={(e) => setQrValue(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        onClick={handleSend}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Đang gửi...' : 'Gửi mã QR qua Email'}
      </button>
    </div>
  );
}
