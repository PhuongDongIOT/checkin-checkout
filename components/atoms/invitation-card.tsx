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
  const [isAllow, setIsAllow] = useState<boolean>(false)
  const [name, setName] = useState<string>('Nguyễn Văn A');
  const [event, setEvent] = useState<string>('Chúc mừng sinh nhật');
  const [mail, setMail] = useState<string>('phuongdongiot@gmail.com');
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
      formData.append('name', name);
      formData.append('mail', mail);
      formData.append('email', mail);
      formData.append('password', 'password');
      startTransition(() => {
        formAction(formData)
      })
      const res = await fetch('/api/upload-avatar', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setIsAllow(false);
      link.click();
    }
  };

  const changeValueEvent = (name = '', event = '', mail = '') => {
    setName(name)
    setEvent(event)
    setMail(mail)
    setIsAllow(true);
  }

  return (
    <div className='mx-auto max-w-sm'>
      <div className="flex flex-col items-center gap-4 p-6">
        <div className="mb-4 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tải ảnh lên:</label>

          <label className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 transition">
            <span className="text-sm text-gray-700">Chọn ảnh từ thiết bị</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
          </label>
        </div>
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
                value={`DXMD-${name}`}
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

        {isAllow ? <button
          onClick={handleDownload}
          className="bg-green-600 text-white mx-2 py-2 rounded hover:bg-green-700 w-full"
        >
          Tải thẻ mời xuống
        </button> : null}
      </div>
    </div>
  );
}
