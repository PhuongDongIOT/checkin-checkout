import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import { Resend } from 'resend';
import QRCode from 'qrcode';
import { appendRow } from '@/lib/services/sheet-google';

const resend = new Resend(process.env.RESEND_API_KEY);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

function streamToBuffer(stream: Readable): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const chunks: any[] = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', reject);
    });
}


function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result);
            } else {
                reject('Failed to convert to base64');
            }
        };

        reader.onerror = (error) => reject(error);
    });
}


export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get('avatar') as File;
    const to = formData.get('mail') as string;
    const name = formData.get('name') as string;

    if (!to || !file) {
        return NextResponse.json({ error: 'Missing email or QR data' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');

    const email = await resend.emails.send({
        from: 'anything@marketing.dxmd.vn',
        to,
        subject: 'Your QR Code',
        html: `
            <p>Chào ${name}, đây là mã QR của bạn:</p>
            <img src="data:image/png;base64,${base64}" alt="QR Code" style="width:200px;" />
          `,
    });

    console.log(email);


    if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'avatars',
                transformation: [
                    { width: 300, height: 500, crop: 'thumb', gravity: 'face' },
                    { fetch_format: 'auto', quality: 'auto' }
                ],
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );

        Readable.from(buffer).pipe(uploadStream);
    });

    await appendRow();

    return NextResponse.json({ success: true, result });
}
