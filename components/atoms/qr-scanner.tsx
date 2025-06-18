'use client';

import { Html5Qrcode } from 'html5-qrcode';
import { useEffect, useState } from 'react';
import AnimatedModal from './animated-modal';

const QrScanner = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    const scanner = new Html5Qrcode("reader");
    scanner.start(
      { facingMode: "environment" }, // Use back camera if available
      {
        fps: 10,
        qrbox: 250
      },
      (decodedText, decodedResult) => {
        if (decodedText && !open) {
          setOpen(true);
          setValue(decodedText);
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
  }, [open]);

  return (
    <div className="flex justify-center mt-10">
      <div id="reader" style={{ width: "300px" }}></div>
      <AnimatedModal isOpen={open} onClose={() => setOpen(false)}>
        <h2 className="text-xl font-semibold mb-2">🎉 Welcome!</h2>
        <p className="text-gray-600 mb-4">Đây là modal chứa tên người dùng.</p>
        <p className='text-gray-600 text-xl font-bold mb-4'>{value}</p>
        <p className='text-blue-300 text-2xl font-bold mb-4'>Checkin thành công</p>
        <button
          onClick={() => setOpen(false)}
          className="bg-red-500 text-white px-3 py-1 rounded w-full"
        >
          Đóng
        </button>
      </AnimatedModal>
    </div>
  );
};

export default QrScanner;
