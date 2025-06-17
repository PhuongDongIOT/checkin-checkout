import QrGenerator from "@/components/atoms/qr-generator";
// import QrScanner from "@/components/atoms/qr-scanner";

export default function HomePage() {
    return (
        <main className="p-4">
            <h1 className="text-xl font-bold mb-4">QR Code Scanner</h1>
            {/* <QrScanner /> */}
            <QrGenerator />
        </main>
    );
}
