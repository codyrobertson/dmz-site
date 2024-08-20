import React, { useMemo } from "react"
import { addPropertyControls, ControlType } from "framer"
import AtomsIconCopy from "https://framer.com/m/Atoms-Icon-Copy-6heb.js@sNUCf4KXwOQLJYKPgk8t"

const generateStars = (count, size, seed) => {
    const random = mulberry32(seed)
    return Array.from({ length: count }, () => ({
        left: random() * 100,
        top: random() * 100,
        size,
    }))
}

const mulberry32 = (a) => () => {
    let t = (a += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

const Star = ({ size, left, top, color, glow }) => (
    <div
        style={{
            position: "absolute",
            left: `${left}%`,
            top: `${top}%`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            borderRadius: "50%",
            boxShadow: glow,
            zIndex: 0,
        }}
    />
)

const StarfieldComponent = ({
    count = 100,
    size = 2,
    seed = 12345,
    color = "#FFFFFF",
    glow = "0 0 5px #FFFFFF",
    children,
    style,
}) => {
    const stars = useMemo(
        () => generateStars(count, size, seed),
        [count, size, seed]
    )

    return (
        <div
            style={{
                ...style,
                position: "relative",
                overflow: "hidden",
            }}
        >
            {children}
            {stars.map((star, index) => (
                <Star
                    key={index}
                    size={star.size}
                    left={star.left}
                    top={star.top}
                    color={color}
                    glow={glow}
                />
            ))}
        </div>
    )
}

addPropertyControls(StarfieldComponent, {
    count: { type: ControlType.Number, defaultValue: 100, min: 0, max: 1000, step: 1 },
    size: { type: ControlType.Number, defaultValue: 2, min: 1, max: 10, step: 1 },
    seed: { type: ControlType.Number, defaultValue: 12345, min: 0, max: 100000, step: 1 },
    color: { type: ControlType.Color, defaultValue: "#FFFFFF" },
    glow: { type: ControlType.String, defaultValue: "0 0 5px #FFFFFF" },
})

export default StarfieldComponent
