import * as React from "react"

interface BeamerProps {
    glow?: number;
    intensity?: number;
    blur?: number;
    color1?: string;
    color2?: string;
    zIndex?: number;
    positionType?: "relative" | "absolute";
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    width?: string;
    height?: string;
    opacity?: number; // Added opacity prop
}

const Beamer: React.FC<BeamerProps> = ({
    glow = 50,
    intensity = 50,
    blur = 50,
    color1 = "#AEB1F5",
    color2 = "#7DE5E8",
    zIndex = 10,
    positionType = "relative",
    top = "auto",
    left = "auto",
    right = "auto",
    bottom = "auto",
    width = "753px",
    height = "670px",
    opacity = 1, // Default value for opacity
}) => {
    const containerStyle = React.useMemo<React.CSSProperties>(
        () => ({
            position: positionType,
            width,
            height,
            overflow: "hidden",
            pointerEvents: "none",
            zIndex,
            opacity, // Apply opacity to container style
            ...(positionType === "absolute"
                ? { top, left, right, bottom }
                : {}),
        }),
        [positionType, width, height, zIndex, top, left, right, bottom, opacity]
    )

    const svgStyle: React.CSSProperties = {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        pointerEvents: "none",
    }

    const calculateOpacity = (intensity: number) => intensity / 100
    const calculateBlur = (blur: number) => blur / 2
    const calculateGlow = (glow: number) => 1 + glow / 100

    const blurFilter = (
        <filter id="blurFilter">
            <feGaussianBlur
                in="SourceGraphic"
                stdDeviation={calculateBlur(blur)}
            />
        </filter>
    )

    const glowFilter = (
        <filter id="glowFilter">
            <feComponentTransfer>
                <feFuncR
                    type="linear"
                    slope={calculateGlow(glow)}
                    intercept="0"
                />
                <feFuncG
                    type="linear"
                    slope={calculateGlow(glow)}
                    intercept="0"
                />
                <feFuncB
                    type="linear"
                    slope={calculateGlow(glow)}
                    intercept="0"
                />
            </feComponentTransfer>
        </filter>
    )

    return (
        <div style={containerStyle}>
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 753 670"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={svgStyle}
            >
                <defs>
                    {blurFilter}
                    {glowFilter}
                    <linearGradient
                        id="paint0_linear_530_74292"
                        x1="376.126"
                        y1="0"
                        x2="376.126"
                        y2="669.955"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="black" />
                    </linearGradient>
                    {[1, 2, 3].map((i) => (
                        <linearGradient
                            key={`paint${i}_linear_530_74292`}
                            id={`paint${i}_linear_530_74292`}
                            x1={
                                i === 1
                                    ? "169.372"
                                    : i === 2
                                      ? "242.098"
                                      : "17.2354"
                            }
                            y1="169.761"
                            x2={
                                i === 1
                                    ? "169.372"
                                    : i === 2
                                      ? "242.098"
                                      : "17.2354"
                            }
                            y2="634.293"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor={color1} />
                            <stop offset="1" stopColor={color2} />
                        </linearGradient>
                    ))}
                </defs>

                <mask
                    id="mask0_530_74292"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="753"
                    height="670"
                >
                    <rect
                        width="753"
                        height="670"
                        fill="url(#paint0_linear_530_74292)"
                    />
                </mask>
                <g mask="url(#mask0_530_74292)">
                    <g
                        style={{ mixBlendMode: "overlay" }}
                        filter="url(#glowFilter)"
                    >
                        {[1, 2, 3].map((i) => (
                            <g
                                key={i}
                                style={{
                                    mixBlendMode: "plus-lighter",
                                    opacity:
                                        i === 3
                                            ? calculateOpacity(intensity)
                                            : undefined,
                                }}
                                filter="url(#blurFilter)"
                            >
                                <path
                                    d={`M${321 + (i - 1) * 10} 0H${
                                        430 + (i - 1) * 10
                                    }L${582 + (i - 1) * 10} 669.973H${
                                        169 + (i - 1) * 10
                                    }L321.506 0Z`}
                                    fill={`url(#paint${i}_linear_530_74292)`}
                                />
                            </g>
                        ))}
                    </g>
                </g>
            </svg>
        </div>
    )
}

export default Beamer

