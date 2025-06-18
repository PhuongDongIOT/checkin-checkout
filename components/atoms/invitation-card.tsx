'use client';

import { useActionState, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { QRCodeCanvas } from 'qrcode.react';
import FormExample from './form-example';
import { signUp } from '@/app/(login)/actions';
import { ActionState } from '@/lib/auth/middleware';
import { startTransition } from 'react';

export function base64ToFile(base64: string, filename: string): File {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || '';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

export default function InvitationCard() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [name, setName] = useState<string>('John Doe');
  const [event, setEvent] = useState<string>('Birthday Party');
  const cardRef = useRef<HTMLDivElement>(null);
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    signUp, { error: '' }
  );


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
      let base64 = canvas.toDataURL('image/png');
      link.href = base64;
      const file = base64ToFile(base64, 'avatar.png');
      const formData = new FormData();
      formData.append('avatar', file);
      formData.append('email', 'phuongdong@gmail.com');
      formData.append('password', 'password');
      startTransition(() => {
        formAction(formData)
      })
      const res = await fetch('/api/upload-avatar', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      console.log(data);
      
      link.click();
    }
  };

  const changeValueEvent = (name = '', event = '') => {
    setName(name)
    setEvent(event)
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <input type="file" accept="image/*" onChange={handleUpload} />
      <FormExample onCallBack={changeValueEvent} />
      <div
        ref={cardRef}
        className="w-[350px] h-[500px] bg-gradient-to-br from-pink-200 to-yellow-100 shadow-lg rounded-xl text-center p-6 flex flex-col items-center justify-center gap-4"
      >
        <div className='relative'>
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="avatar"
              className="w-44 h-44 object-cover rounded-full shadow"
            />
          ) : (
            <div className="w-44 h-44 bg-gray-200 rounded-full"></div>
          )}
          <div className="w-12 h-12 absolute -bottom-4 right-0">
            <QRCodeCanvas
              value={name}
              size={46}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
              includeMargin
            />
          </div>
        </div>
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
