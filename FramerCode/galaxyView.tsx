import React, { useMemo, useEffect, useState } from "react"
import { addPropertyControls, ControlType } from "framer"

const generateDots = (count, width, height) => {
    const dots = []
    for (let i = 0; i < count; i++) {
        dots.push({
            id: i, // Adding a unique id for each dot
            top: Math.random() * height,
            left: Math.random() * width,
        })
    }
    return dots
}

const Dot = React.memo(({ left, top, color }) => (
    <div
        className="dot"
        style={{
            position: "absolute",
            left: `${left}px`,
            top: `${top}px`,
            width: "3px",
            height: "3px",
            backgroundColor: color,
            borderRadius: "50%",
            filter: "blur(0.5px)",
        }}
    />
))

/**
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */
const GalaxyComponent = ({
    backgroundColor,
    dotColor,
    dotCount,
    perspective,
    glowEnabled,
    glowColor,
    glowIntensity,
}) => {
    const dots = useMemo(() => generateDots(dotCount, 100, 100), [dotCount])

    return (
        <div
            className="galaxy"
            style={{
                position: "absolute",
                overflow: "hidden",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: `linear-gradient(to bottom, #041628, #1D364D)`,
                transformStyle: "preserve-3d",
                perspective: `${perspective}px`,
            }}
        >
            {dots.map((dot) => (
                <Dot key={`dot-${dot.id}`} left={dot.left} top={dot.top} color={dotColor} />
            ))}
            <style>{`
                .dot {
                    animation: twinkle 3s infinite ease-in-out;
                }
                @keyframes twinkle {
                    0%, 100% { opacity: 0.7; }
                    50% { opacity: 1; }
                }
            `}</style>
        </div>
    )
}

GalaxyComponent.defaultProps = {
    backgroundColor: "#1B2735",
    dotColor: "#FFFFFF",
    dotCount: 100,
    perspective: 1000,
    glowEnabled: true,
    glowColor: "#FFFFFF",
    glowIntensity: 10,
}

addPropertyControls(GalaxyComponent, {
    backgroundColor: { type: ControlType.Color, title: "Background Color" },
    dotColor: { type: ControlType.Color, title: "Dot Color" },
    dotCount: {
        type: ControlType.Number,
        title: "Dot Count",
        min: 0,
        max: 1000,
        step: 10,
    },
    perspective: {
        type: ControlType.Number,
        title: "Perspective",
        min: 0,
        max: 2000,
        step: 10,
    },
    glowEnabled: {
        type: ControlType.Boolean,
        title: "Glow Enabled",
        defaultValue: true,
    },
    glowColor: {
        type: ControlType.Color,
        title: "Glow Color",
        defaultValue: "#FFFFFF",
        hidden: (props) => !props.glowEnabled,
    },
    glowIntensity: {
        type: ControlType.Number,
        title: "Glow Intensity",
        min: 0,
        max: 20,
        step: 1,
        defaultValue: 10,
        hidden: (props) => !props.glowEnabled,
    },
})

export default GalaxyComponent
