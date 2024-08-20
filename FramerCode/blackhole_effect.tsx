import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    add(v) {
        return new Vector(this.x + v.x, this.y + v.y)
    }
    sub(v) {
        return new Vector(this.x - v.x, this.y - v.y)
    }
    mul(n) {
        return new Vector(this.x * n, this.y * n)
    }
    div(n) {
        return new Vector(this.x / n, this.y / n)
    }
    getLength() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
    setLength(length) {
        let angle = this.getAngle()
        this.x = Math.cos(angle) * length
        this.y = Math.sin(angle) * length
    }
    getAngle() {
        return Math.atan2(this.y, this.x)
    }
    setAngle(angle) {
        let length = this.getLength()
        this.x = Math.cos(angle) * length
        this.y = Math.sin(angle) * length
    }
}

class BlackHole {
    constructor(x, y) {
        this.pos = new Vector(x, y)
    }

    applyGravityOn(thing) {
        let dist = thing.pos.sub(this.pos)
        let length = dist.getLength()
        let g = 2000 / (length * length)
        dist.setLength(g)
        thing.vel = thing.vel.sub(dist)
    }
}

class TokenParticle {
    constructor(x, y, image, key, minSize, maxSize) {
        this.pos = new Vector(x, y)
        this.vel = new Vector(0, 0)
        this.image = image
        this.key = key
        this.size = Math.random() * (maxSize - minSize) + minSize
    }

    move(speed, ease) {
        if (this.vel.getLength() > speed) {
            this.vel.setLength(speed)
        }
        this.vel = this.vel.mul(ease)
        this.pos = this.pos.add(this.vel)
    }

    draw(ctx) {
        if (!this.image || !this.image.complete) {
            console.log(`Image not loaded for particle ${this.key}`)
            return
        }

        let r = this.size
        ctx.save()
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, r, 0, Math.PI * 2, true)
        ctx.closePath()
        ctx.clip()
        ctx.drawImage(this.image, this.pos.x - r, this.pos.y - r, r * 2, r * 2)
        ctx.restore()
    }
}

export function SolanaBlackHole(props) {
    const {
        width,
        height,
        particleCount,
        imageUrls,
        backgroundColor,
        animateParticles,
        minParticleSize,
        maxParticleSize,
        particleSpeed,
        easingCurve,
    } = props

    const canvasRef = React.useRef(null)
    const particlesRef = React.useRef([])
    const blackHoleRef = React.useRef(null)
    const [tokenImages, setTokenImages] = React.useState([])
    const animationFrameIdRef = React.useRef(null)

    const loadImage = React.useCallback((src) => {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = () => resolve(img)
            img.onerror = reject
            img.src = src
        })
    }, [])

    React.useEffect(() => {
        if (imageUrls && imageUrls.length > 0) {
            const loadImages = async () => {
                try {
                    const images = await Promise.all(
                        imageUrls.map((url) => loadImage(url))
                    )
                    setTokenImages(images)
                } catch (error) {
                    console.error("Error loading images:", error)
                }
            }
            loadImages()
        }
        return () => {
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current)
            }
        }
    }, [imageUrls, loadImage])

    const setupParticles = React.useCallback(() => {
        particlesRef.current = []
        if (tokenImages.length > 0) {
            for (let i = 0; i < particleCount; i++) {
                const randomImage =
                    tokenImages[Math.floor(Math.random() * tokenImages.length)]
                if (randomImage) {
                    const p = new TokenParticle(
                        Math.random() * width,
                        Math.random() * height,
                        randomImage,
                        `particle-${i}-${Date.now()}`, // Ensure unique key by adding timestamp
                        minParticleSize,
                        maxParticleSize
                    )
                    particlesRef.current.push(p)
                }
            }
        }
    }, [
        width,
        height,
        particleCount,
        tokenImages,
        minParticleSize,
        maxParticleSize,
    ])

    React.useEffect(() => {
        if (tokenImages.length > 0) {
            blackHoleRef.current = new BlackHole(width / 2, height / 2)
            setupParticles()
        }
    }, [tokenImages, width, height, setupParticles])

    const easingCurves = {
        linear: (t) => t,
        easeInQuad: (t) => t * t,
        easeOutQuad: (t) => t * (2 - t),
        easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
        easeInCubic: (t) => t * t * t,
        easeOutCubic: (t) => --t * t * t + 1,
        easeInOutCubic: (t) =>
            t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    }

    const animate = React.useCallback(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")

        ctx.clearRect(0, 0, width, height)
        ctx.fillStyle = backgroundColor || "transparent"
        ctx.fillRect(0, 0, width, height)

        const ease = easingCurves[easingCurve] || easingCurves["linear"]

        particlesRef.current.forEach((p) => {
            blackHoleRef.current.applyGravityOn(p)
            p.move(particleSpeed, ease(1))
            p.draw(ctx)
        })

        particlesRef.current = particlesRef.current.filter(
            (p) => blackHoleRef.current.pos.sub(p.pos).getLength() > 2
        )

        while (particlesRef.current.length < particleCount) {
            const randomImage =
                tokenImages[Math.floor(Math.random() * tokenImages.length)]
            if (randomImage) {
                const newParticle = new TokenParticle(
                    Math.random() * (width + 100) - 50,
                    Math.random() * (height + 100) - 50,
                    randomImage,
                    `particle-${Date.now()}-${Math.random()}`, // Unique key
                    minParticleSize,
                    maxParticleSize
                )
                particlesRef.current.push(newParticle)
            }
        }

        animationFrameIdRef.current = requestAnimationFrame(animate)
    }, [
        width,
        height,
        particleCount,
        tokenImages,
        backgroundColor,
        particleSpeed,
        minParticleSize,
        maxParticleSize,
        easingCurve,
    ])

    React.useEffect(() => {
        if (animateParticles && blackHoleRef.current) {
            animate()
        }
        return () => {
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current)
            }
        }
    }, [animateParticles, animate])

    React.useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current
            canvas.width = canvas.parentElement.clientWidth
            canvas.height = canvas.parentElement.clientHeight
        }

        window.addEventListener("resize", handleResize)
        handleResize()

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                backgroundColor: backgroundColor || "transparent",
            }}
        >
            <canvas ref={canvasRef} />
        </div>
    )
}

SolanaBlackHole.defaultProps = {
    width: 500,
    height: 500,
    particleCount: 50,
    imageUrls: [],
    backgroundColor: "transparent",
    animateParticles: true,
    minParticleSize: 5,
    maxParticleSize: 20,
    particleSpeed: 4,
    easingCurve: "linear",
}

addPropertyControls(SolanaBlackHole, {
    width: {
        type: ControlType.Number,
        title: "Width",
        defaultValue: 500,
        min: 100,
        max: 2000,
        step: 10,
    },
    height: {
        type: ControlType.Number,
        title: "Height",
        defaultValue: 500,
        min: 100,
        max: 2000,
        step: 10,
    },
    particleCount: {
        type: ControlType.Number,
        title: "Particle Count",
        defaultValue: 50,
        min: 10,
        max: 500,
        step: 10,
    },
    imageUrls: {
        type: ControlType.Array,
        title: "Images",
        propertyControl: {
            type: ControlType.Image,
        },
    },
    backgroundColor: {
        type: ControlType.Color,
        title: "Background Color",
        defaultValue: "transparent",
    },
    animateParticles: {
        type: ControlType.Boolean,
        title: "Animate",
        defaultValue: true,
    },
    minParticleSize: {
        type: ControlType.Number,
        title: "Min Particle Size",
        defaultValue: 5,
        min: 1,
        max: 100,
    },
    maxParticleSize: {
        type: ControlType.Number,
        title: "Max Particle Size",
        defaultValue: 20,
        min: 1,
        max: 100,
    },
    particleSpeed: {
        type: ControlType.Number,
        title: "Particle Speed",
        defaultValue: 4,
        min: 1,
        max: 20,
    },
    easingCurve: {
        type: ControlType.Enum,
        title: "Easing Curve",
        options: [
            "linear",
            "easeInQuad",
            "easeOutQuad",
            "easeInOutQuad",
            "easeInCubic",
            "easeOutCubic",
            "easeInOutCubic",
        ],
        optionTitles: [
            "Linear",
            "Ease In Quad",
            "Ease Out Quad",
            "Ease In-Out Quad",
            "Ease In Cubic",
            "Ease Out Cubic",
            "Ease In-Out Cubic",
        ],
    },
})

export default SolanaBlackHole