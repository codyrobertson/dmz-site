import React, { useEffect, useState } from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
import * as d3 from "d3"

export function CandlestickChart(props) {
    const {
        width,
        height,
        currentPrice,
        overallTrend,
        volatility,
        numberOfCandles,
        numberOfLevels,
        font,
        positiveColor,
        negativeColor,
        levelColor,
        levelDashArray,
        animate,
        animationDuration,
    } = props

    const [data, setData] = useState([])
    const [levels, setLevels] = useState([])

    useEffect(() => {
        generateChartPattern()
    }, [currentPrice, overallTrend, numberOfCandles, volatility])

    useEffect(() => {
        calculateLevels()
    }, [data])

    useEffect(() => {
        if (animate) {
            animateChart()
        }
    }, [data])

    const generateChartPattern = () => {
        const randomData = []
        let basePrice = currentPrice
        const trendFactor =
            overallTrend === "up" ? 1 : overallTrend === "down" ? -1 : 0

        for (let i = 0; i < numberOfCandles; i++) {
            const open = basePrice
            const close =
                open +
                trendFactor * (Math.random() * volatility) +
                (Math.random() - 0.5) * volatility
            const high = Math.max(open, close) + Math.random() * volatility
            const low = Math.min(open, close) - Math.random() * volatility

            randomData.push({ open, close, high, low })

            basePrice = close
        }

        setData(randomData)
    }

    const calculateLevels = () => {
        const min = Math.min(...data.map((d) => d.low))
        const max = Math.max(...data.map((d) => d.high))
        const step = (max - min) / (numberOfLevels - 1)
        const newLevels = Array.from(
            { length: numberOfLevels },
            (_, i) => min + i * step
        )
        setLevels(newLevels)
    }

    const yScale = d3
        .scaleLinear()
        .domain([
            Math.min(...data.map((d) => d.low)),
            Math.max(...data.map((d) => d.high)),
        ])
        .range([height, 0])

    const xScale = d3
        .scaleBand()
        .domain(data.map((d, i) => i))
        .range([0, width])
        .padding(0.1)

    const animateChart = () => {
        d3.selectAll("rect, line")
            .transition()
            .duration(animationDuration)
            .style("opacity", 1)
    }

    return (
        <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
        >
            {data.map((d, i) => {
                const color = d.close > d.open ? positiveColor : negativeColor
                return (
                    <g
                        key={i}
                        transform={`translate(${xScale(i)}, 0)`}
                        style={{ opacity: animate ? 0 : 1 }}
                    >
                        <line
                            x1={xScale.bandwidth() / 2}
                            x2={xScale.bandwidth() / 2}
                            y1={yScale(d.high)}
                            y2={yScale(d.low)}
                            stroke={color}
                        />
                        <rect
                            x="0"
                            y={yScale(Math.max(d.open, d.close))}
                            width={xScale.bandwidth()}
                            height={Math.max(
                                2,
                                Math.abs(yScale(d.open) - yScale(d.close))
                            )}
                            fill={color}
                        />
                    </g>
                )
            })}
            {levels.map((level, i) => (
                <g key={`level-${i}`}>
                    <line
                        x1={0}
                        x2={width}
                        y1={yScale(level)}
                        y2={yScale(level)}
                        stroke={levelColor}
                        strokeDasharray={levelDashArray}
                    />
                    <text
                        x={width - 20} // Padding to ensure labels are not too close to the chart
                        y={yScale(level) - 5}
                        fill={font.color}
                        textAnchor="end"
                        fontSize={font.size}
                        fontWeight={font.weight}
                        fontFamily={font.family}
                    >
                        ${level.toFixed(2)}
                    </text>
                </g>
            ))}
        </svg>
    )
}

addPropertyControls(CandlestickChart, {
    width: { type: ControlType.Number, defaultValue: 400 },
    height: { type: ControlType.Number, defaultValue: 600 },
    currentPrice: {
        type: ControlType.Number,
        defaultValue: 10000,
        step: 1000,
        min: 0,
    },
    overallTrend: {
        type: ControlType.Enum,
        options: ["up", "down", "sideways"],
        defaultValue: "sideways",
    },
    numberOfCandles: {
        type: ControlType.Number,
        defaultValue: 50,
        step: 5,
        min: 10,
        max: 100,
        description: "Number of candles to display",
    },
    numberOfLevels: {
        type: ControlType.Number,
        defaultValue: 5,
        step: 1,
        min: 3,
        max: 10,
        description: "Number of price levels to display",
    },
    volatility: {
        type: ControlType.Number,
        defaultValue: 100,
        step: 10,
        min: 0,
        description: "Controls the price action variability",
    },
    font: {
        type: ControlType.Object,
        controls: {
            size: { type: ControlType.Number, defaultValue: 12 },
            color: { type: ControlType.Color, defaultValue: "#FFFFFF" },
            family: { type: ControlType.String, defaultValue: "Arial" },
            weight: {
                type: ControlType.Enum,
                options: ["normal", "bold"],
                defaultValue: "normal",
            },
        },
    },
    positiveColor: { type: ControlType.Color, defaultValue: "green" },
    negativeColor: { type: ControlType.Color, defaultValue: "red" },
    levelColor: { type: ControlType.Color, defaultValue: "gray" },
    levelDashArray: { type: ControlType.String, defaultValue: "5,5" },
    animate: { type: ControlType.Boolean, defaultValue: false },
    animationDuration: { type: ControlType.Number, defaultValue: 1000 },
    d3: { type: ControlType.Object, defaultValue: {} } // Add d3 as a property control
})
