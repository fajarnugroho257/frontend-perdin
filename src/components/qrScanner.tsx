import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QRScanner = () => {
    const [scanResult, setScanResult] = useState<string | null>(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "reader",
            {
                fps: 10,
                qrbox: { width: 250, height: 250 }
            },
            false // Parameter 'verbose' harus ada
        );

        scanner.render(
            (decodedText) => {
                setScanResult(decodedText);
                scanner.clear();
            },
            (error) => console.warn(error)
        );

        // return () => scanner.clear();
        return () => { scanner.clear().catch(() => {}); }
    }, []);

    return (
        <div>
            <h2>Scan QR Code</h2>
            <div id="reader"></div>
            {scanResult && <p>Hasil: {scanResult}</p>}
        </div>
    );
};

export default QRScanner;
