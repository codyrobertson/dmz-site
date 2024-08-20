import * as React from "react"
import { useEffect, useState } from "react"
import { addPropertyControls, ControlType } from "framer"

// Pure function to determine the device type based on user agent
const getDeviceType = () => {
    if (typeof navigator !== "undefined") {
        const userAgent = navigator.userAgent.toLowerCase()
        if (userAgent.includes("iphone") || userAgent.includes("ipad")) {
            return "iOS"
        } else if (userAgent.includes("android")) {
            return "Android"
        }
    }
    return null
}

// DeviceText component to display text based on device type
export function DeviceText(props) {
    const { font, color, iosText, androidText, defaultText, osFont, osColor } = props
    const [device, setDevice] = useState(getDeviceType())

    useEffect(() => {
        const handleResize = () => {
            setDevice(getDeviceType())
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const getText = () => {
        switch (device) {
            case "iOS":
                return iosText
            case "Android":
                return androidText
            default:
                return defaultText
        }
    }

    return (
        <div style={{ ...font, color, textRendering: "optimizeLegibility", WebkitFontSmoothing: "antialiased", display: "flex", alignItems: "center" }}>
            <span style={{ ...osFont, color: osColor }}>{device}</span> {getText()}
        </div>
    )
}

DeviceText.defaultProps = {
    font: {
        fontSize: "16px",
        fontFamily: "Arial, sans-serif",
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: "normal",
        letterSpacing: "normal",
    },
    color: "#000",
    iosText: "Available on iOS",
    androidText: "Available on Android",
    defaultText: "Device not recognized",
    osFont: {
        fontSize: "16px",
        fontFamily: "Arial, sans-serif",
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: "normal",
        letterSpacing: "normal",
    },
    osColor: "#000",
}

addPropertyControls(DeviceText, {
    font: {
        type: "font",
        controls: "extended",
    },
    color: {
        type: ControlType.Color,
        title: "Color",
        defaultValue: "#000",
    },
    iosText: {
        type: ControlType.String,
        title: "iOS Text",
        defaultValue: "Available on iOS",
    },
    androidText: {
        type: ControlType.String,
        title: "Android Text",
        defaultValue: "Available on Android",
    },
    defaultText: {
        type: ControlType.String,
        title: "Default Text",
        defaultValue: "Device not recognized",
    },
    osFont: {
        type: "font",
        controls: "extended",
    },
    osColor: {
        type: ControlType.Color,
        title: "OS Color",
        defaultValue: "#000",
    },
})
