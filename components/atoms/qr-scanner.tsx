'use client';

import { Html5Qrcode } from 'html5-qrcode';
import { startTransition, useActionState, useEffect, useState } from 'react';
import AnimatedModal from './animated-modal';
import { ActionState } from '@/lib/auth/middleware';
import { checkUser } from '@/app/(login)/actions';
import LoadingModal from './loading-modal';

const QrScanner = () => {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    checkUser, { error: '', success: '' }
  );
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleChange = async (email = '') => {
    const formData = new FormData();
    formData.append('email', email);
    startTransition(() => {
      formAction(formData);
    });

  }

  useEffect(() => {
    const scanner = new Html5Qrcode("reader");
    scanner.start(
      { facingMode: "environment" }, // Use back camera if available
      {
        fps: 10,
        qrbox: 250
      },
      (decodedText, decodedResult) => {
        if (decodedText && !open && !isPending) {
          setIsPending(true)
          handleChange(decodedText)
        }
        // Optionally: scanner.stop();
      },
      (errorMessage) => {
        // console.warn(`QR Code no match: ${errorMessage}`);
      }
    ).catch((err) => {
      console.error("Error starting scanner", err);
    });

    return () => {
      scanner.stop().catch(() => { });
    };
  }, [open, isPending]);

  useEffect(() => {
    if (!pending && (state.success || state.error)) {
      console.log('✅ Transition done');
      console.log('Result:', state);

      // Ví dụ: mở modal khi thành công
      setIsPending(false)
      setOpen(true);
    }
  }, [pending, state]);


  return (
    <div className="flex justify-center mt-10">
      <div id="reader" className={isPending ? 'hidden' : ''} style={{ width: "300px" }}></div>
      <AnimatedModal isOpen={open} onClose={() => setOpen(false)}>
        <h2 className="text-xl font-semibold mb-2">🎉 Welcome!</h2>
        <p className="text-gray-600 mb-4">Đây là modal chứa tên người dùng.</p>
        <p className='text-gray-600 text-xl font-bold mb-4'>{state.error ?? state.success}</p>
        {state.success ?
          <p className='text-blue-300 text-2xl font-bold mb-4'>Checkin thành công</p> :
          <p className='text-red-300 text-2xl font-bold mb-4'>Vui lòng kiểm tra lại</p>}
        <button
          onClick={() => setOpen(false)}
          className="bg-red-500 text-white px-3 py-1 rounded w-full"
        >
          Đóng
        </button>
      </AnimatedModal>
      <LoadingModal isOpen={isPending} />
    </div>
  );
};

export default QrScanner;
