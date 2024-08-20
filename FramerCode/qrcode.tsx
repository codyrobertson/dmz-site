import React, { useEffect, useRef } from "react"
import { Frame, addPropertyControls, ControlType } from "framer"

// Import QRCode from Skypack
const QRCodeComponent = ({ size, colorDark, colorLight, useCurrentUrl, customUrl }) => {
    const canvasRef = useRef(null)

    useEffect(() => {
        // Dynamically import the QRCode library from Skypack
        import("https://cdn.skypack.dev/qrcode").then((QRCode) => {
            // Determine the URL to use
            const url = useCurrentUrl ? window.location.href : customUrl

            // Generate the QR code on the canvas
            QRCode.toCanvas(
                canvasRef.current,
                url,
                {
                    width: size,
                    color: {
                        dark: colorDark,
                        light: colorLight,
                    },
                },
                (error) => {
                    if (error) console.error(error)
                }
            )
        })
    }, [size, colorDark, colorLight, useCurrentUrl, customUrl])

    return (
        <Frame size={size} background="transparent">
            <canvas ref={canvasRef} width={size} height={size}></canvas>
        </Frame>
    )
}

QRCodeComponent.defaultProps = {
    size: 256,
    colorDark: "#000000",
    colorLight: "#ffffff",
    useCurrentUrl: true,
    customUrl: "https://framer.com",
}

addPropertyControls(QRCodeComponent, {
    size: {
        type: ControlType.Number,
        title: "Size",
        defaultValue: 256,
        min: 100,
        max: 512,
        step: 1,
    },
    colorDark: {
        type: ControlType.Color,
        title: "Dark Color",
        defaultValue: "#000000",
    },
    colorLight: {
        type: ControlType.Color,
        title: "Light Color",
        defaultValue: "#ffffff",
    },
    useCurrentUrl: {
        type: ControlType.Boolean,
        title: "Use Current URL",
        defaultValue: true,
    },
    customUrl: {
        type: ControlType.String,
        title: "Custom URL",
        defaultValue: "https://framer.com",
    },
})

export default QRCodeComponent
