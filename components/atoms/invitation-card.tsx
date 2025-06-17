'use client';

import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

export default function InvitationCard() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [name, setName] = useState<string>('John Doe');
  const [event, setEvent] = useState<string>('Birthday Party');
  const cardRef = useRef<HTMLDivElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarUrl(URL.createObjectURL(file));
    }
  };

  const handleDownload = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current);
      const link = document.createElement('a');
      link.download = 'invitation-card.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <input type="file" accept="image/*" onChange={handleUpload} />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tên khách mời"
        className="border px-2 py-1 rounded w-full max-w-sm"
      />
      <input
        type="text"
        value={event}
        onChange={(e) => setEvent(e.target.value)}
        placeholder="Sự kiện"
        className="border px-2 py-1 rounded w-full max-w-sm"
      />

      {/* Invitation Card */}
      <div
        ref={cardRef}
        className="w-[350px] h-[500px] bg-pink-100 shadow-lg rounded-xl text-center p-6 flex flex-col items-center justify-center gap-4"
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="avatar"
            className="w-32 h-32 object-cover rounded-full shadow"
          />
        ) : (
          <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
        )}
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-lg text-gray-700">You're invited to</p>
        <h3 className="text-2xl font-semibold text-purple-600">{event}</h3>
        <p className="text-sm text-gray-500 mt-4">Save the date!</p>
      </div>

      <button
        onClick={handleDownload}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Tải thẻ mời xuống
      </button>
    </div>
  );
}
