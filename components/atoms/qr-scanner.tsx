'use client';

import { Html5Qrcode } from 'html5-qrcode';
import { useEffect } from 'react';

const QrScanner = () => {
  useEffect(() => {
    const scanner = new Html5Qrcode("reader");
    scanner.start(
      { facingMode: "environment" }, // Use back camera if available
      {
        fps: 10,
        qrbox: 250
      },
      (decodedText, decodedResult) => {
        alert(`QR Code detected: ${decodedText}`);
        // Optionally: scanner.stop();
      },
      (errorMessage) => {
        // console.warn(`QR Code no match: ${errorMessage}`);
      }
    ).catch((err) => {
      console.error("Error starting scanner", err);
    });

    return () => {
      scanner.stop().catch(() => {});
    };
  }, []);

  return (
    <div className="flex justify-center mt-10">
      <div id="reader" style={{ width: "300px" }}></div>
    </div>
  );
};

export default QrScanner;
