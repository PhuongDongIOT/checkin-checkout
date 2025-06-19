'use client';

import { startTransition, useActionState, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { QRCodeCanvas } from 'qrcode.react';
import FormExample from './form-example';
import { signUp } from '@/app/(login)/actions';
import { ActionState } from '@/lib/auth/middleware';
import LoadingModal from './loading-modal';
import { ImagePan } from './image-pan';

export type FormEvent = {
  name: string;
  event: string;
  email: string;
}

export const event: FormEvent = {
  name: '',
  event: '',
  email: '',
}

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
  const [isPending, setIsPending] = useState<boolean>(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isAllow, setIsAllow] = useState<boolean>(false)
  const [dataForm, setDataForm] = useState<FormEvent>(event);
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
    setIsPending(true)

    if (cardRef.current) {
      const scale = 2;
      const canvas = await html2canvas(cardRef.current, {
        scale,
        useCORS: true,
        allowTaint: false,
        logging: false,
        backgroundColor: null,
      })
      const resizedCanvas = document.createElement('canvas');
      const ctx = resizedCanvas.getContext('2d');

      const width = cardRef.current.offsetWidth;
      const height = cardRef.current.offsetHeight;

      resizedCanvas.width = width;
      resizedCanvas.height = height;

      ctx?.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, width, height);

      const base64 = resizedCanvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'invitation-card.png';
      // let base64 = canvas.toDataURL('image/png');
      link.href = base64;
      const file = base64ToFile(base64, 'avatar.png');
      const formData = new FormData();
      formData.append('avatar', file);
      Object.entries(dataForm).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append('password', 'password');
      startTransition(() => {
        formAction(formData)
      })
      const res = await fetch('/api/upload-avatar', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      link.click();
      setIsAllow(false);
    }
    setIsPending(false)
  };

  const changeValueEvent = (value: FormEvent) => {
    setDataForm(value);
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
          className="w-[350px] h-[500px] bg-gradient-to-br from-pink-200 to-yellow-100 shadow-lg rounded-xl text-center py-4 px-2 flex flex-col items-center justify-center gap-4"
        >
          <div className='relative'>
            <div className='w-56 h-full object-cover rounded-full shadow overflow-hidden'>
              <div className='w-56 h-56'>
                {avatarUrl ? (
                  <ImagePan src={avatarUrl} />
                ) : null}
              </div>
            </div>
            <div className="w-12 h-12 absolute -bottom-4 right-0">
              <div className='rounded-sm overflow-hidden bg-white'>
                <QRCodeCanvas
                  value={`DXMD-${dataForm.name}`}
                  size={46}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="H"
                  includeMargin
                />
              </div>
            </div>
          </div>
          <h2 className="text-xl font-bold">{dataForm.name}</h2>
          <p className="text-lg text-gray-700">You're invited to</p>
          <h3 className="text-2xl font-semibold text-purple-600">{dataForm.event}</h3>
          <p className="text-sm text-gray-500 mt-4">Save the date!</p>
        </div>

        {isAllow ? <button
          onClick={handleDownload}
          className="bg-green-600 text-white mx-2 py-2 rounded hover:bg-green-700 w-full"
        >
          Tải thẻ mời xuống
        </button> : null}
      </div>
      <LoadingModal isOpen={isPending} />
    </div>
  );
}
