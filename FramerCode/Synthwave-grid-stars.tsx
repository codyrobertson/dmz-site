import * as React from "react"
import { addPropertyControls, ControlType, Frame, motion } from "framer"

// Beamer Component
export function Beamer(props) {
    const {
        glow,
        intensity,
        blur,
        color1,
        color2,
        zIndex,
        positionType,
        top,
        left,
        right,
        bottom,
        width,
        height,
    } = props

    const containerStyle = React.useMemo(() => ({
        position: positionType,
        width,
        height,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex,
        ...(positionType === "absolute" ? { top, left, right, bottom } : {}),
    }), [positionType, width, height, zIndex, top, left, right, bottom])

    const svgStyle = {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        pointerEvents: "none",
    }

    const calculateOpacity = (intensity) => intensity / 100
    const calculateBlur = (blur) => blur / 2
    const calculateGlow = (glow) => 1 + glow / 100

    const blurFilter = (
        <filter id="blurFilter">
            <feGaussianBlur in="SourceGraphic" stdDeviation={calculateBlur(blur)} />
        </filter>
    );

    const glowFilter = (
        <filter id="glowFilter">
            <feComponentTransfer>
                <feFuncR type="linear" slope={calculateGlow(glow)} intercept="0" />
                <feFuncG type="linear" slope={calculateGlow(glow)} intercept="0" />
                <feFuncB type="linear" slope={calculateGlow(glow)} intercept="0" />
            </feComponentTransfer>
        </filter>
    );

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
                    <linearGradient id="paint0_linear_530_74292" x1="376.126" y1="0" x2="376.126" y2="669.955" gradientUnits="userSpaceOnUse">
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="black" />
                    </linearGradient>
                    {[1, 2, 3].map((i) => (
                        <linearGradient
                            key={`paint${i}_linear_530_74292`}
                            id={`paint${i}_linear_530_74292`}
                            x1={i === 1 ? "169.372" : i === 2 ? "242.098" : "17.2354"}
                            y1="169.761"
                            x2={i === 1 ? "169.372" : i === 2 ? "242.098" : "17.2354"}
                            y2="634.293"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor={color1} />
                            <stop offset="1" stopColor={color2} />
                        </linearGradient>
                    ))}
                </defs>

                <mask id="mask0_530_74292" maskUnits="userSpaceOnUse" x="0" y="0" width="753" height="670">
                    <rect width="753" height="670" fill="url(#paint0_linear_530_74292)" />
                </mask>
                <g mask="url(#mask0_530_74292)">
                    <g style={{ mixBlendMode: "overlay" }} filter="url(#glowFilter)">
                        {[1, 2, 3].map((i) => (
                            <g
                                key={`path-group-${i}`}
                                style={{
                                    mixBlendMode: "plus-lighter",
                                    opacity: i === 3 ? calculateOpacity(intensity) : undefined,
                                }}
                                filter="url(#blurFilter)"
                            >
                                <path
                                    d={`M${321 + (i - 1) * 10} 0H${430 + (i - 1) * 10}L${582 + (i - 1) * 10} 669.973H${169 + (i - 1) * 10}L321.506 0Z`}
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

// ResponsiveTiltedGrid3D Component
export function ResponsiveTiltedGrid3D(props) {
    const {
        density,
        gridColorType,
        gridSolidColor,
        gridGradientColor,
        angleX,
        angleY,
        angleZ,
        border,
        infiniteScroll,
        scrollSpeed,
        glowEnabled,
        glowColor,
        glowSpread,
        glowBlendMode,
        responsiveScale,
    } = props

    const containerRef = React.useRef(null)
    const gridRef = React.useRef(null)
    const [scrollPosition, setScrollPosition] = React.useState(0)
    const [isInView, setIsInView] = React.useState(true)

    const gridStyle = React.useMemo(() => {
        const colorStyle =
            gridColorType === "solid"
                ? gridSolidColor
                : `linear-gradient(${gridGradientColor})`

        const gridLineGlow = glowEnabled
            ? `drop-shadow(0 0 ${glowSpread}px ${glowColor})`
            : "none"

        return {
            backgroundImage: `
                linear-gradient(to right, ${colorStyle} 1px, transparent 1px),
                linear-gradient(to bottom, ${colorStyle} 1px, transparent 1px)
            `,
            backgroundSize: `${100 / density}% ${100 / density}%`,
            filter: gridLineGlow,
            mixBlendMode: glowBlendMode,
        }
    }, [
        density,
        gridColorType,
        gridSolidColor,
        gridGradientColor,
        glowEnabled,
        glowSpread,
        glowColor,
        glowBlendMode,
    ])

    React.useEffect(() => {
        if (!infiniteScroll || !isInView) return;

        let animationFrameId;
        let lastTime = 0;

        const animate = (time) => {
            const delta = time - lastTime;
            lastTime = time;
            setScrollPosition((prev) => (prev + scrollSpeed * delta * 0.01) % 100);
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [infiniteScroll, isInView, scrollSpeed])

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            { threshold: 0.1 }
        )
        if (containerRef.current) observer.observe(containerRef.current)
        return () => observer.disconnect()
    }, [])

    const transformStyle = React.useMemo(() => `
        scale3d(${responsiveScale}, ${responsiveScale}, ${responsiveScale})
        rotateX(${angleX}deg)
        rotateY(${angleY}deg)
        rotateZ(${angleZ}deg)
    `, [responsiveScale, angleX, angleY, angleZ])

    return (
        <Frame
            ref={containerRef}
            key="responsive-tilted-grid-container"
            style={{
                width: "100%",
                height: "100%",
                background: "transparent",
                perspective: "1000px",
                overflow: "hidden",
            }}
        >
            <motion.div
                ref={gridRef}
                key="responsive-tilted-grid"
                style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: border === "yes" ? 0 : `-${100 / density / 2}%`,
                    left: border === "yes" ? 0 : `-${100 / density / 2}%`,
                    right: border === "yes" ? 0 : `-${100 / density / 2}%`,
                    bottom: border === "yes" ? 0 : `-${100 / density / 2}%`,
                    transform: transformStyle,
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    ...gridStyle,
                    backgroundPosition: `0 ${scrollPosition}%`,
                    willChange: "transform, background-position", // Hint to the browser for optimization
                }}
            />
        </Frame>
    )
}

// StarfieldComponent
const generateStars = (count, size, seed) => {
    const stars = []
    const random = mulberry32(seed)
    for (let i = 0; i < count; i++) {
        stars.push({
            left: random() * 100,
            top: random() * 100,
            size,
            twinkleDelay: random() * 5,
        })
    }
    return stars
}

const mulberry32 = (a) => () => {
    let t = (a += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

const Star = React.memo(({ size, left, top, color, twinkleDelay, glow }) => (
    <div
        className="star"
        style={{
            position: "absolute",
            left: `${left}%`,
            top: `${top}%`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            borderRadius: "50%",
            animationDelay: `${twinkleDelay}s`,
            boxShadow: glow,
            willChange: "transform, opacity",
        }}
    />
))

const ShootingStar = React.memo(({ left, top, color, glow }) => (
    <div
        className="shooting-star"
        style={{
            position: "absolute",
            left: `${left}%`,
            top: `${top}%`,
            width: "2px",
            height: "2px",
            backgroundColor: color,
            boxShadow: glow,
            borderRadius: "50%",
            animation: "shoot 1s linear forwards",
            willChange: "transform",
        }}
    />
))

export function StarfieldComponent({
    backgroundColor,
    starColor,
    smallStarDensity,
    mediumStarDensity,
    largeStarDensity,
    randomSeed,
    glowEnabled,
    glowColor,
    glowIntensity,
    shootingStarRate,
}) {
    const [shootingStars, setShootingStars] = React.useState([])

    const allStars = React.useMemo(
        () => [
            ...generateStars(smallStarDensity, 1, randomSeed),
            ...generateStars(mediumStarDensity, 2, randomSeed + 1),
            ...generateStars(largeStarDensity, 3, randomSeed + 2),
        ],
        [smallStarDensity, mediumStarDensity, largeStarDensity, randomSeed]
    )

    React.useEffect(() => {
        const createShootingStar = () => ({
            id: Math.random(),
            left: Math.random() * 100,
            top: Math.random() * 50,
        })

        const shootingStarIntervalId = setInterval(() => {
            if (Math.random() < shootingStarRate) {
                setShootingStars((prev) => [
                    ...prev.slice(-4),
                    createShootingStar(),
                ])
            }
        }, 2000)

        return () => clearInterval(shootingStarIntervalId)
    }, [shootingStarRate])

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                background: `radial-gradient(ellipse at bottom, ${backgroundColor} 0%, #090A0F 100%)`,
                overflow: "hidden",
                position: "relative",
            }}
        >
            {allStars.map((star, index) => (
                <Star
                    key={`star-${index}`}
                    size={star.size}
                    left={star.left}
                    top={star.top}
                    color={starColor}
                    twinkleDelay={star.twinkleDelay}
                    glow={
                        glowEnabled
                            ? `0 0 ${glowIntensity}px ${glowColor}`
                            : "none"
                    }
                />
            ))}
            {shootingStars.map((star) => (
                <ShootingStar
                    key={star.id}
                    left={star.left}
                    top={star.top}
                    color={starColor}
                    glow={`0 0 ${glowIntensity}px ${glowColor}`}
                />
            ))}
            <style>{`
                .star {
                    animation: twinkle 3s infinite ease-in-out;
                }
                @keyframes twinkle {
                    0%, 100% { opacity: 0.7; }
                    50% { opacity: 1; }
                }
                @keyframes shoot {
                    to { transform: translate(100vw, 100vh); }
                }
            `}</style>
        </div>
    )
}

// Combined Component
export function SynthwaveGridStars(props) {
    const {
        backgroundColor,
        starColor,
        smallStarDensity,
        mediumStarDensity,
        largeStarDensity,
        randomSeed,
        starGlowEnabled,
        starGlowColor,
        starGlowIntensity,
        shootingStarRate,
        gridDensity,
        gridColorType,
        gridSolidColor,
        gridGradientColor,
        gridAngleX,
        gridAngleY,
        gridAngleZ,
        gridBorder,
        gridInfiniteScroll,
        gridScrollSpeed,
        gridGlowEnabled,
        gridGlowColor,
        gridGlowSpread,
        gridGlowBlendMode,
        gridResponsiveScale,
        beamerGlow,
        beamerIntensity,
        beamerBlur,
        beamerColor1,
        beamerColor2,
        beamerZIndex,
        beamerPositionType,
        beamerTop,
        beamerLeft,
        beamerRight,
        beamerBottom,
        beamerWidth,
        beamerHeight,
    } = props

    return (
        <div style={{ width: "100%", height: "100%", position: "relative", backgroundColor }}>
            <StarfieldComponent
                backgroundColor={backgroundColor}
                starColor={starColor}
                smallStarDensity={smallStarDensity}
                mediumStarDensity={mediumStarDensity}
                largeStarDensity={largeStarDensity}
                randomSeed={randomSeed}
                glowEnabled={starGlowEnabled}
                glowColor={starGlowColor}
                glowIntensity={starGlowIntensity}
                shootingStarRate={shootingStarRate}
            />
            <ResponsiveTiltedGrid3D
                density={gridDensity}
                gridColorType={gridColorType}
                gridSolidColor={gridSolidColor}
                gridGradientColor={gridGradientColor}
                angleX={gridAngleX}
                angleY={gridAngleY}
                angleZ={gridAngleZ}
                border={gridBorder}
                infiniteScroll={gridInfiniteScroll}
                scrollSpeed={gridScrollSpeed}
                glowEnabled={gridGlowEnabled}
                glowColor={gridGlowColor}
                glowSpread={gridGlowSpread}
                glowBlendMode={gridGlowBlendMode}
                responsiveScale={gridResponsiveScale}
            />
            <Beamer
                glow={beamerGlow}
                intensity={beamerIntensity}
                blur={beamerBlur}
                color1={beamerColor1}
                color2={beamerColor2}
                zIndex={beamerZIndex}
                positionType={beamerPositionType}
                top={beamerTop}
                left={beamerLeft}
                right={beamerRight}
                bottom={beamerBottom}
                width={beamerWidth}
                height={beamerHeight}
            />
        </div>
    )
}

SynthwaveGridStars.defaultProps = {
    backgroundColor: "#1B2735",
    starColor: "#FFFFFF",
    smallStarDensity: 700,
    mediumStarDensity: 200,
    largeStarDensity: 100,
    randomSeed: 12345,
    starGlowEnabled: true,
    starGlowColor: "#FFFFFF",
    starGlowIntensity: 10,
    shootingStarRate: 0.1,
    gridDensity: 10,
    gridColorType: "solid",
    gridSolidColor: "#000",
    gridGradientColor: "to right, #000000, #ffffff",
    gridAngleX: 45,
    gridAngleY: 45,
    gridAngleZ: 0,
    gridBorder: "yes",
    gridInfiniteScroll: false,
    gridScrollSpeed: 1,
    gridGlowEnabled: false,
    gridGlowColor: "#ffffff",
    gridGlowSpread: 5,
    gridGlowBlendMode: "normal",
    gridResponsiveScale: 1,
    beamerGlow: 50,
    beamerIntensity: 50,
    beamerBlur: 50,
    beamerColor1: "#AEB1F5",
    beamerColor2: "#7DE5E8",
    beamerZIndex: 10,
    beamerPositionType: "absolute",
    beamerTop: "0",
    beamerLeft: "50%",
    beamerRight: "auto",
    beamerBottom: "auto",
    beamerWidth: "753px",
    beamerHeight: "670px",
}

addPropertyControls(SynthwaveGridStars, {
    backgroundColor: { type: ControlType.Color, title: "Background Color" },
    starColor: { type: ControlType.Color, title: "Star Color" },
    smallStarDensity: {
        type: ControlType.Number,
        title: "Small Star Density",
        min: 0,
        max: 2000,
        step: 10,
    },
    mediumStarDensity: {
        type: ControlType.Number,
        title: "Medium Star Density",
        min: 0,
        max: 1000,
        step: 10,
    },
    largeStarDensity: {
        type: ControlType.Number,
        title: "Large Star Density",
        min: 0,
        max: 500,
        step: 10,
    },
    randomSeed: {
        type: ControlType.Number,
        title: "Random Seed",
        min: 0,
        max: 100000,
        step: 1,
    },
    starGlowEnabled: {
        type: ControlType.Boolean,
        title: "Star Glow Enabled",
        defaultValue: true,
    },
    starGlowColor: {
        type: ControlType.Color,
        title: "Star Glow Color",
        defaultValue: "#FFFFFF",
        hidden: (props) => !props.starGlowEnabled,
    },
    starGlowIntensity: {
        type: ControlType.Number,
        title: "Star Glow Intensity",
        min: 0,
        max: 20,
        step: 1,
        defaultValue: 10,
        hidden: (props) => !props.starGlowEnabled,
    },
    shootingStarRate: {
        type: ControlType.Number,
        title: "Shooting Star Rate",
        min: 0,
        max: 1,
        step: 0.01,
        defaultValue: 0.1,
    },
    gridDensity: {
        type: ControlType.Number,
        title: "Grid Density",
        defaultValue: 10,
        min: 1,
        max: 50,
        step: 1,
    },
    gridColorType: {
        type: ControlType.Enum,
        title: "Grid Color Type",
        options: ["solid", "gradient"],
        optionTitles: ["Solid", "Gradient"],
        defaultValue: "solid",
    },
    gridSolidColor: {
        type: ControlType.Color,
        title: "Grid Solid Color",
        defaultValue: "#000000",
        hidden: (props) => props.gridColorType !== "solid",
    },
    gridGradientColor: {
        type: ControlType.String,
        title: "Grid Gradient Color",
        defaultValue: "to right, #000000, #ffffff",
        hidden: (props) => props.gridColorType !== "gradient",
    },
    gridAngleX: {
        type: ControlType.Number,
        title: "Grid Angle X",
        defaultValue: 45,
        min: -180,
        max: 180,
        step: 1,
    },
    gridAngleY: {
        type: ControlType.Number,
        title: "Grid Angle Y",
        defaultValue: 45,
        min: -180,
        max: 180,
        step: 1,
    },
    gridAngleZ: {
        type: ControlType.Number,
        title: "Grid Angle Z",
        defaultValue: 0,
        min: -180,
        max: 180,
        step: 1,
    },
    gridBorder: {
        type: ControlType.Enum,
        title: "Grid Border",
        options: ["yes", "no"],
        optionTitles: ["Yes", "No"],
        defaultValue: "yes",
    },
    gridInfiniteScroll: {
        type: ControlType.Boolean,
        title: "Grid Infinite Scroll",
        defaultValue: false,
    },
    gridScrollSpeed: {
        type: ControlType.Number,
        title: "Grid Scroll Speed",
        defaultValue: 1,
        min: 0.1,
        max: 10,
        step: 0.1,
        hidden: (props) => !props.gridInfiniteScroll,
    },
    gridGlowEnabled: {
        type: ControlType.Boolean,
        title: "Grid Glow Enabled",
        defaultValue: false,
    },
    gridGlowColor: {
        type: ControlType.Color,
        title: "Grid Glow Color",
        defaultValue: "#ffffff",
        hidden: (props) => !props.gridGlowEnabled,
    },
    gridGlowSpread: {
        type: ControlType.Number,
        title: "Grid Glow Spread",
        defaultValue: 5,
        min: 0,
        max: 20,
        step: 1,
        hidden: (props) => !props.gridGlowEnabled,
    },
    gridGlowBlendMode: {
        type: ControlType.Enum,
        title: "Grid Glow Blend Mode",
        options: [
            "normal",
            "multiply",
            "screen",
            "overlay",
            "darken",
            "lighten",
            "color-dodge",
            "color-burn",
            "hard-light",
            "soft-light",
            "difference",
            "exclusion",
        ],
        defaultValue: "normal",
        hidden: (props) => !props.gridGlowEnabled,
    },
    gridResponsiveScale: {
        type: ControlType.Number,
        title: "Grid Responsive Scale",
        defaultValue: 1,
        min: 0.1,
        max: 2,
        step: 0.1,
    },
    beamerGlow: {
        type: ControlType.Number,
        title: "Beamer Glow",
        defaultValue: 50,
        min: 0,
        max: 100,
        step: 1,
    },
    beamerIntensity: {
        type: ControlType.Number,
        title: "Beamer Intensity",
        defaultValue: 50,
        min: 0,
        max: 100,
        step: 1,
    },
    beamerBlur: {
        type: ControlType.Number,
        title: "Beamer Blur",
        defaultValue: 50,
        min: 0,
        max: 100,
        step: 1,
    },
    beamerColor1: {
        type: ControlType.Color,
        title: "Beamer Color 1",
        defaultValue: "#AEB1F5",
    },
    beamerColor2: {
        type: ControlType.Color,
        title: "Beamer Color 2",
        defaultValue: "#7DE5E8",
    },
    beamerZIndex: {
        type: ControlType.Number,
        title: "Beamer Z-Index",
        defaultValue: 10,
        min: 0,
        max: 100,
        step: 1,
    },
    beamerPositionType: {
        type: ControlType.Enum,
        title: "Beamer Position Type",
        options: ["relative", "absolute"],
        defaultValue: "absolute",
    },
    beamerTop: {
        type: ControlType.String,
        title: "Beamer Top",
        defaultValue: "0",
        hidden: (props) => props.beamerPositionType !== "absolute",
    },
    beamerLeft: {
        type: ControlType.String,
        title: "Beamer Left",
        defaultValue: "50%",
        hidden: (props) => props.beamerPositionType !== "absolute",
    },
    beamerRight: {
        type: ControlType.String,
        title: "Beamer Right",
        defaultValue: "auto",
        hidden: (props) => props.beamerPositionType !== "absolute",
    },
    beamerBottom: {
        type: ControlType.String,
        title: "Beamer Bottom",
        defaultValue: "auto",
        hidden: (props) => props.beamerPositionType !== "absolute",
    },
    beamerWidth: { type: ControlType.String, title: "Beamer Width", defaultValue: "753px" },
    beamerHeight: { type: ControlType.String, title: "Beamer Height", defaultValue: "670px" },
})

export default SynthwaveGridStars
