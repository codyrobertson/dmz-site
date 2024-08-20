import React, { useEffect, useRef } from "react";
import { addPropertyControls, ControlType } from "framer";
import QRCode from "qrcode";

const QRCodeGenerator = ({ customUrl }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const generateQRCode = async () => {
            try {
                const canvas = canvasRef.current;
                const url = customUrl || window.location.href;
                await QRCode.toCanvas(canvas, url, { width: 256 });
                console.log('QR code generated for URL:', url);
            } catch (error) {
                console.error('Error generating QR code', error);
            }
        };

        generateQRCode();
    }, [customUrl]);

    return (
        <canvas ref={canvasRef} width="256" height="256"></canvas>
    );
};

QRCodeGenerator.defaultProps = {
    customUrl: "",
};

addPropertyControls(QRCodeGenerator, {
    customUrl: {
        type: ControlType.String,
        title: "Custom URL",
        defaultValue: "",
    },
});

export default QRCodeGenerator;
