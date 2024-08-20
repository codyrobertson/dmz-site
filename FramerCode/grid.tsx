import * as React from "react"
import { Frame, addPropertyControls, ControlType, motion } from "framer"

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
        mobileImageSrc,
    } = props

    const containerRef = React.useRef(null)
    const gridRef = React.useRef(null)
    const [scrollPosition, setScrollPosition] = React.useState(0)
    const [isInView, setIsInView] = React.useState(true)
    const [isMobile, setIsMobile] = React.useState(false)

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768)
        }

        window.addEventListener("resize", handleResize)
        handleResize()

        return () => window.removeEventListener("resize", handleResize)
    }, [])

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
            {isMobile ? (
                <img
                    src={mobileImageSrc}
                    alt="Responsive Tilted Grid"
                    style={{ width: "100%", height: "100%" }}
                />
            ) : (
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
            )}
        </Frame>
    )
}

ResponsiveTiltedGrid3D.defaultProps = {
    density: 10,
    gridColorType: "solid",
    gridSolidColor: "#000",
    gridGradientColor: "to right, #000000, #ffffff",
    angleX: 45,
    angleY: 45,
    angleZ: 0,
    border: "yes",
    infiniteScroll: false,
    scrollSpeed: 1,
    glowEnabled: false,
    glowColor: "#ffffff",
    glowSpread: 5,
    glowIntensity: 2,
    glowBlendMode: "normal",
    responsiveScale: 1,
    mobileImageSrc: "",
}

addPropertyControls(ResponsiveTiltedGrid3D, {
    density: {
        type: ControlType.Number,
        title: "Density",
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
    angleX: {
        type: ControlType.Number,
        title: "Angle X",
        defaultValue: 45,
        min: -180,
        max: 180,
        step: 1,
    },
    angleY: {
        type: ControlType.Number,
        title: "Angle Y",
        defaultValue: 45,
        min: -180,
        max: 180,
        step: 1,
    },
    angleZ: {
        type: ControlType.Number,
        title: "Angle Z",
        defaultValue: 0,
        min: -180,
        max: 180,
        step: 1,
    },
    border: {
        type: ControlType.Enum,
        title: "Border",
        options: ["yes", "no"],
        optionTitles: ["Yes", "No"],
        defaultValue: "yes",
    },
    infiniteScroll: {
        type: ControlType.Boolean,
        title: "Infinite Scroll",
        defaultValue: false,
    },
    scrollSpeed: {
        type: ControlType.Number,
        title: "Scroll Speed",
        defaultValue: 1,
        min: 0.1,
        max: 10,
        step: 0.1,
        hidden: (props) => !props.infiniteScroll,
    },
    glowEnabled: {
        type: ControlType.Boolean,
        title: "Glow Effect",
        defaultValue: false,
    },
    glowColor: {
        type: ControlType.Color,
        title: "Glow Color",
        defaultValue: "#ffffff",
        hidden: (props) => !props.glowEnabled,
    },
    glowSpread: {
        type: ControlType.Number,
        title: "Glow Spread",
        defaultValue: 5,
        min: 0,
        max: 20,
        step: 1,
        hidden: (props) => !props.glowEnabled,
    },
    glowIntensity: {
        type: ControlType.Number,
        title: "Glow Intensity",
        defaultValue: 2,
        min: 0,
        max: 10,
        step: 0.1,
        hidden: (props) => !props.glowEnabled,
    },
    glowBlendMode: {
        type: ControlType.Enum,
        title: "Glow Blend Mode",
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
        hidden: (props) => !props.glowEnabled,
    },
    responsiveScale: {
        type: ControlType.Number,
        title: "Responsive Scale",
        defaultValue: 1,
        min: 0.1,
        max: 2,
        step: 0.1,
    },
    mobileImageSrc: {
        type: ControlType.String,
        title: "Mobile Image Source",
        defaultValue: "",
    },
})

export default ResponsiveTiltedGrid3D
