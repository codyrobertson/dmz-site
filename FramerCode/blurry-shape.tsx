import { addPropertyControls, ControlType } from "framer";
import { useEffect, useRef } from "react";

export function BlurryShape(props) {
    const { gradientColors, glowIntensity, width, height } = props;
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;

        // Validate and set default gradient colors
        const colors = Array.isArray(gradientColors) && gradientColors.length === 2
            ? gradientColors.map(color => typeof color === 'string' ? color : "#FFFFFF")
            : ["#6633EE", "#FFFFFF"];

        // Create radial gradient
        const gradient = ctx.createRadialGradient(
            width / 2, height / 2, 0,
            width / 2, height / 2, Math.max(width, height) / 2
        );

        gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
        gradient.addColorStop(0.694, colors[0]); // #6633EE
        gradient.addColorStop(1, colors[1]); // #FFFFFF

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = gradient;
        ctx.filter = `blur(${glowIntensity}px)`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, [gradientColors, glowIntensity, width, height]);

    return <canvas ref={canvasRef} style={{ position: "absolute", width: "100%", height: "100%" }} />;
}

BlurryShape.defaultProps = {
    gradientColors: ["#6633EE", "#FFFFFF"],
    glowIntensity: 45,
    width: 1404,
    height: 709,
};

addPropertyControls(BlurryShape, {
    gradientColors: {
        type: ControlType.Array,
        title: "Gradient Colors",
        defaultValue: ["#6633EE", "#FFFFFF"],
        propertyControl: {
            type: ControlType.Color,
        },
    },
    glowIntensity: {
        type: ControlType.Number,
        title: "Glow Intensity",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 45,
    },
    width: {
        type: ControlType.Number,
        title: "Width",
        defaultValue: 1404,
    },
    height: {
        type: ControlType.Number,
        title: "Height",
        defaultValue: 709,
    },
});