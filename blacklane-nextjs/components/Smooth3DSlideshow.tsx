"use client"

import {
    useState,
    useEffect,
    useCallback,
    useRef,
    type CSSProperties,
} from "react"

const useIsStaticRenderer = () => false

export interface Slide {
    image?: { src?: string; srcSet?: string; alt?: string }
    title?: string
    subtitle?: string
}

type AutoplayDir = "leftToRight" | "rightToLeft"
type TitleCorner = "topLeft" | "topRight" | "bottomLeft" | "bottomRight"

export interface Smooth3DSlideshowProps {
    slides?: Slide[]
    cardWidth?: number
    cardHeight?: number
    radius?: number
    tilt?: number
    sideTilt?: number
    gap?: number
    opacity?: number
    transition?: any
    autoplay?: boolean
    autoplayDirection?: AutoplayDir
    showTitle?: boolean
    titleFont?: CSSProperties
    titleColor?: string
    titlePosition?: {
        position?: TitleCorner
        paddingLeft?: number
        paddingRight?: number
        paddingTop?: number
        paddingBottom?: number
    }
    style?: CSSProperties
}

const DEFAULT_SLIDES: Slide[] = [
    {
        image: {
            src: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
        },
        title: "Executive Airport Transfer\nMelbourne Tullamarine\nVIP Welcome",
    },
    {
        image: {
            src: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80",
        },
        title: "First-Class Chauffeur\nAudi A7 Luxury Sedan\nQuiet Luxury",
    },
    {
        image: {
            src: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&auto=format&fit=crop&q=80",
        },
        title: "By-The-Hour Charters\nCorporate Summit\nSeamless Travel",
    },
    {
        image: {
            src: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&auto=format&fit=crop&q=80",
        },
        title: "Private City-to-City\nSydney & Brisbane\nAll-Inclusive",
    },
    {
        image: {
            src: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80",
        },
        title: "Electric Luxury Fleet\nTesla Model S\nZero Emissions",
    },
]

// Fixed internals
const PERSPECTIVE = 1600
const SCALE_STEP = 0.16
const MAX_VISIBLE = 2
const DEPTH = 240

// Derive a CSS transition (duration + easing) from a Framer Transition value.
function cssTransition(t: any): { dur: number; ease: string } {
    const dur = t && typeof t.duration === "number" ? t.duration : 0.6
    let ease = "cubic-bezier(0.22, 1, 0.36, 1)"
    const e = t?.ease
    if (Array.isArray(e) && e.length === 4) {
        ease = `cubic-bezier(${e[0]}, ${e[1]}, ${e[2]}, ${e[3]})`
    } else if (typeof e === "string") {
        const map: Record<string, string> = {
            linear: "linear",
            easeIn: "ease-in",
            easeOut: "ease-out",
            easeInOut: "ease-in-out",
        }
        ease = map[e] || "ease"
    }
    return { dur, ease }
}

const COMPONENT_DEFAULTS = {
    slides: DEFAULT_SLIDES,
    cardWidth: 380,
    cardHeight: 280,
    radius: 4,
    tilt: 14,
    sideTilt: 8,
    gap: 8,
    opacity: 55,
    autoplay: true,
    autoplayDirection: "rightToLeft" as AutoplayDir,
    transition: {
        type: "tween",
        duration: 0.7,
        delay: 3.2,
        ease: [0.22, 1, 0.36, 1],
    },
    showTitle: true,
    titleFont: {
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "18px",
        letterSpacing: "0.5px",
        lineHeight: "1.3em",
    } as any,
    titleColor: "#ffffff",
    titlePosition: {
        position: "bottomLeft" as TitleCorner,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
    },
}

export function Smooth3DSlideshow(props: Smooth3DSlideshowProps) {
    const mergedProps = { ...COMPONENT_DEFAULTS, ...props }
    const {
        slides = DEFAULT_SLIDES,
        cardWidth = 380,
        cardHeight = 280,
        radius = 4,
        tilt = 14,
        sideTilt = 8,
        gap = 8,
        opacity = 55,
        transition,
        autoplay = true,
        autoplayDirection = "rightToLeft",
        showTitle = true,
        titleFont,
        titleColor = "#ffffff",
        titlePosition,
        style,
    } = mergedProps

    const tp = titlePosition || {}
    const corner: TitleCorner = tp.position || "bottomLeft"
    const isTop = corner === "topLeft" || corner === "topRight"
    const isRight = corner === "topRight" || corner === "bottomRight"
    const padLeft = tp.paddingLeft ?? 20
    const padRight = tp.paddingRight ?? 20
    const padTop = tp.paddingTop ?? 20
    const padBottom = tp.paddingBottom ?? 20

    const isStatic = useIsStaticRenderer()
    const list = slides && slides.length ? slides : DEFAULT_SLIDES
    const n = list.length

    const loop = true
    const [active, setActive] = useState(0)

    useEffect(() => {
        setActive((a) => Math.max(0, Math.min(n - 1, a)))
    }, [n])

    const moveDur =
        transition && typeof transition.duration === "number"
            ? transition.duration
            : 0.6
    const lockRef = useRef(false)
    const lock = useCallback(() => {
        lockRef.current = true
        window.setTimeout(
            () => {
                lockRef.current = false
            },
            Math.max(50, moveDur * 1000)
        )
    }, [moveDur])

    const step = useCallback(
        (dir: number) => {
            if (lockRef.current) return
            lock()
            setActive((a) => (((a + dir) % n) + n) % n)
        },
        [n, lock]
    )

    const handleCardClick = useCallback(
        (i: number) => {
            if (isStatic || lockRef.current) return
            lock()
            setActive((a) => (i === a ? (a + 1) % n : i))
        },
        [isStatic, n, lock]
    )

    const delay =
        transition && typeof transition.delay === "number"
            ? transition.delay
            : 3.2
    useEffect(() => {
        if (isStatic || !autoplay || n < 2) return
        const ms = Math.max(0.3, delay) * 1000
        const dir = autoplayDirection === "leftToRight" ? -1 : 1
        const id = window.setInterval(() => step(dir), ms)
        return () => window.clearInterval(id)
    }, [isStatic, autoplay, autoplayDirection, delay, n, step])

    const onKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "ArrowRight") {
                e.preventDefault()
                step(1)
            } else if (e.key === "ArrowLeft") {
                e.preventDefault()
                step(-1)
            }
        },
        [step]
    )

    const { dur, ease } = cssTransition(transition)
    const transitionCss = `transform ${dur}s ${ease}, opacity ${dur}s ${ease}`

    const effectiveRadius =
        (Math.max(0, Math.min(20, radius)) / 20) *
        (Math.min(cardWidth, cardHeight) / 2)
    const dim = 1 - Math.max(0, Math.min(100, opacity)) / 100

    const rootStyle: CSSProperties = {
        ...(style || {}),
        position: "relative",
        width: "100%",
        height: "380px",
        minWidth: 320,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: `${PERSPECTIVE}px`,
        overflow: "hidden",
        outline: "none",
    }

    return (
        <div
            style={rootStyle}
            tabIndex={0}
            role="group"
            aria-roledescription="carousel"
            onKeyDown={isStatic ? undefined : onKeyDown}
        >
            <div
                style={{
                    position: "relative",
                    width: cardWidth,
                    height: cardHeight,
                    transformStyle: "preserve-3d",
                }}
            >
                {list.map((slide, i) => {
                    let rel = i - active
                    if (loop) {
                        if (rel > n / 2) rel -= n
                        if (rel < -n / 2) rel += n
                    }
                    const ax = Math.abs(rel)
                    const visible = ax <= MAX_VISIBLE
                    const isActive = rel === 0
                    const sc = Math.max(0.4, 1 - ax * SCALE_STEP)
                    const tx = rel * (gap * 30)
                    const tz = -ax * DEPTH
                    const ry = -rel * tilt
                    const rz = rel * sideTilt
                    const src = slide.image?.src || ""

                    const cardStyle: CSSProperties = {
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        width: cardWidth,
                        height: cardHeight,
                        borderRadius: effectiveRadius,
                        overflow: "hidden",
                        transformStyle: "preserve-3d",
                        transformOrigin: "center center",
                        transform: `translate(-50%, -50%) translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${sc})`,
                        transition: transitionCss,
                        opacity: visible ? 1 : 0,
                        cursor: "pointer",
                        pointerEvents: visible && !isStatic ? "auto" : "none",
                        backgroundColor: "#0e131f",
                        border: isActive ? "1px solid rgba(212,163,89,0.7)" : "1px solid rgba(255,255,255,0.1)",
                        boxShadow: isActive ? "0 20px 50px rgba(0,0,0,0.8), 0 0 25px rgba(212,163,89,0.25)" : "0 10px 30px rgba(0,0,0,0.5)",
                    }

                    return (
                        <div
                            key={i}
                            style={cardStyle}
                            onClick={isStatic ? undefined : () => handleCardClick(i)}
                            aria-label={slide.title}
                            aria-hidden={!visible}
                        >
                            {src ? (
                                <img
                                    src={src}
                                    alt={slide.image?.alt || slide.title || ""}
                                    draggable={false}
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        display: "block",
                                        userSelect: "none",
                                    }}
                                />
                            ) : null}

                            {showTitle && (
                                <>
                                    <div
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            background: isTop
                                                ? "linear-gradient(0deg, rgba(0,0,0,0) 35%, rgba(11,14,20,0.85) 100%)"
                                                : "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(11,14,20,0.92) 100%)",
                                            pointerEvents: "none",
                                        }}
                                    />

                                    <div
                                        style={{
                                            position: "absolute",
                                            left: padLeft,
                                            right: padRight,
                                            [isTop ? "top" : "bottom"]: isTop ? padTop : padBottom,
                                            textAlign: isRight ? "right" : "left",
                                            pointerEvents: "none",
                                        }}
                                    >
                                        <span
                                            style={{
                                                color: titleColor,
                                                fontSize: "16px",
                                                fontWeight: 600,
                                                lineHeight: "1.3em",
                                                letterSpacing: "0.5px",
                                                whiteSpace: "pre-line",
                                                textShadow: "0 2px 10px rgba(0,0,0,0.6)",
                                                ...(titleFont || {}),
                                            }}
                                        >
                                            {slide.title}
                                        </span>
                                    </div>
                                </>
                            )}

                            {/* Dim overlay for inactive cards */}
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: "#080c14",
                                    opacity: isActive ? 0 : dim,
                                    transition: `opacity ${dur}s ${ease}`,
                                    pointerEvents: "none",
                                }}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Smooth3DSlideshow
