import "./App.css";
import React, {
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import LandingPage from "./components/LandingPage";
import {cn} from "./utils/util";
import {
    motion,
    useAnimate,
    useAnimation,
    type AnimationPlaybackControlsWithThen,
    AnimatePresence,
} from "motion/react";
import Moon from "./assets/moon-outline.svg?react";
import Sunny from "./assets/sunny-outline.svg?react";

export default function App() {
    const prefersDark = useMemo(
        () => window.matchMedia("(prefers-color-scheme: dark)").matches,
        []
    );
    const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(
        prefersDark ? "dark" : "light"
    );
    const rootRef = useRef<HTMLDivElement>(null);
    const [themeTransitionStatus, setThemeTransitionStatus] = useState<
        false | "expanding" | "contracting"
    >(false);
    const [tab, setCurrentTab] = useState(0);

    const themeTogglePosition = useRef<{
        x: number;
        y: number;
    }>(null);
    const lightModeRef = useRef<HTMLDivElement>(null);
    const darkModeRef = useRef<HTMLDivElement>(null);

    const clipPathRadius = useRef<number>(null);

    const currentAnimationRef = useRef<AnimationPlaybackControlsWithThen>(null);

    const modeToggleRef = useRef<HTMLDivElement>(null);

    const [scope, animate] = useAnimate();

    const handleThemeToggle = async () => {
        if (
            !lightModeRef.current ||
            !darkModeRef.current ||
            !themeTogglePosition.current ||
            !clipPathRadius.current
        )
            return;

        const isLightMode = currentTheme === "light";

        const expandingElement = isLightMode
            ? darkModeRef.current
            : lightModeRef.current;
        const contractingElement = isLightMode
            ? lightModeRef.current
            : darkModeRef.current;
        const newTheme = isLightMode ? "dark" : "light";

        try {
            let nextThemeTransitionStatus = themeTransitionStatus;

            if (
                themeTransitionStatus === false ||
                themeTransitionStatus === "contracting"
            ) {
                nextThemeTransitionStatus = "expanding";
            }
            if (themeTransitionStatus === "expanding") {
                nextThemeTransitionStatus = "contracting";
            }

            setThemeTransitionStatus(nextThemeTransitionStatus);

            console.log("timeee", currentAnimationRef.current?.time);
            currentAnimationRef.current = animate(
                expandingElement,
                {
                    clipPath:
                        nextThemeTransitionStatus === "expanding"
                            ? `circle(${clipPathRadius.current}px at ${themeTogglePosition.current.x}px ${themeTogglePosition.current.y}px)`
                            : `circle(0px at ${themeTogglePosition.current.x}px ${themeTogglePosition.current.y}px)`,
                },
                {
                    duration:
                        currentAnimationRef.current?.time &&
                        currentAnimationRef.current.time > 0
                            ? currentAnimationRef.current.time
                            : 0.9,
                    ease: "easeInOut",
                }
            );

            await currentAnimationRef.current;

            if (nextThemeTransitionStatus === "contracting") {
                setThemeTransitionStatus(false);
                return;
            }
            setCurrentTheme(newTheme);

            animate(
                contractingElement,
                {
                    clipPath: `circle(0px at ${themeTogglePosition.current.x}px ${themeTogglePosition.current.y}px)`,
                },
                {
                    duration: 0,
                }
            );
            // contractingElement.style.clipPath = `circle(0px at ${themeTogglePosition.current.x}px ${themeTogglePosition.current.y}px)`
            setThemeTransitionStatus(false);
        } catch (error) {
            console.error("error o", error);
        }
    };

    useLayoutEffect(() => {
        const updateTogglePosition = () => {
            if (!modeToggleRef.current) return;
            const box = modeToggleRef.current.getBoundingClientRect();
            themeTogglePosition.current = {
                x: (box.x + box.x + box.width) / 2,
                y: (box.y + box.y + box.height) / 2 + window.pageYOffset,
            };
        };

        updateTogglePosition();

        window.addEventListener("resize", updateTogglePosition);
        window.addEventListener("scroll", updateTogglePosition);

        return () => {
            window.removeEventListener("resize", updateTogglePosition);
            window.removeEventListener("scroll", updateTogglePosition);
        };
    }, [modeToggleRef.current]);

    useLayoutEffect(() => {
        const updateClipPathRadius = () => {
            if (!themeTogglePosition.current) return;
            const togglePosition = themeTogglePosition.current;

            const viewportWidth = Math.max(
                document.documentElement.clientWidth || 0,
                window.innerWidth || 0
            );
            const viewportHeight = Math.max(
                document.documentElement.clientHeight || 0,
                window.innerHeight || 0,
                document.documentElement.scrollHeight
            );

            // Calculate distance to farthest corner
            const radius = Math.sqrt(
                Math.max(
                    Math.pow(togglePosition.x, 2) +
                        Math.pow(togglePosition.y, 2),
                    Math.pow(viewportWidth - togglePosition.x, 2) +
                        Math.pow(togglePosition.y, 2),
                    Math.pow(togglePosition.x, 2) +
                        Math.pow(viewportHeight - togglePosition.y, 2),
                    Math.pow(viewportWidth - togglePosition.x, 2) +
                        Math.pow(viewportHeight - togglePosition.y, 2)
                )
            );
            clipPathRadius.current = radius;
        };

        updateClipPathRadius();

        window.addEventListener("resize", updateClipPathRadius);
        window.addEventListener("scroll", updateClipPathRadius);

        return () => {
            window.removeEventListener("resize", updateClipPathRadius);
            window.removeEventListener("scroll", updateClipPathRadius);
        };
    }, [themeTogglePosition.current, document, window]);

    //  specify the reference point for scaling animations triggered by theme changes
    useEffect(() => {
        const updateInitialPosition = () => {
            if (themeTransitionStatus) return;

            if (
                !lightModeRef.current ||
                !darkModeRef.current ||
                !themeTogglePosition.current ||
                !clipPathRadius.current
            )
                return;

            const hiddenElement =
                currentTheme === "dark"
                    ? lightModeRef.current
                    : darkModeRef.current;
            const visibleElement =
                currentTheme === "dark"
                    ? darkModeRef.current
                    : lightModeRef.current;

            // console.log("theme toggle position", themeTogglePosition);
            animate(
                hiddenElement,
                {
                    clipPath: `circle(0px at ${themeTogglePosition.current.x}px ${themeTogglePosition.current.y}px)`,
                },
                {
                    duration: 0,
                }
            );
            animate(
                visibleElement,
                {
                    clipPath: `circle(${clipPathRadius.current}px at ${themeTogglePosition.current.x}px ${themeTogglePosition.current.y}px)`,
                },
                {
                    duration: 0,
                }
            );
        };

        updateInitialPosition();

        window.addEventListener("resize", updateInitialPosition);
        window.addEventListener("scroll", updateInitialPosition);

        return () => {
            window.removeEventListener("resize", updateInitialPosition);
            window.removeEventListener("scroll", updateInitialPosition);
        };
    }, [
        themeTogglePosition.current,
        lightModeRef.current,
        darkModeRef.current,
        prefersDark,
        themeTransitionStatus,
    ]);

    // console.log("box", themeTogglePosition);

    return (
        <div className="relative" ref={rootRef}>
            <motion.div
                ref={lightModeRef}
                className={cn(
                    "absolute inset-0 ",
                    themeTransitionStatus &&
                        currentTheme === "dark" &&
                        "z-[200]",
                    !themeTransitionStatus &&
                        currentTheme === "light" &&
                        "z-[200]"
                )}
            >
                <LandingPage
                    tab={tab}
                    setCurrentTab={(index) => {
                        setCurrentTab(index);
                    }}
                />
            </motion.div>
            <motion.div
                ref={darkModeRef}
                className={cn(
                    "absolute inset-0 dark",
                    themeTransitionStatus &&
                        currentTheme === "light" &&
                        "z-[200]",
                    !themeTransitionStatus &&
                        currentTheme === "dark" &&
                        "z-[200]"
                )}
            >
                <LandingPage
                    tab={tab}
                    setCurrentTab={(index) => {
                        setCurrentTab(index);
                    }}
                />
            </motion.div>

            <div
                ref={modeToggleRef}
                onClick={() => handleThemeToggle()}
                className={cn(
                    "fixed top-5 lg:top-20 right-5 lg:left-20 size-10 rounded-full p-1.5  z-[500]",
                    ((themeTransitionStatus && currentTheme === "light") ||
                        (currentTheme === "dark" && !themeTransitionStatus)) &&
                        "text-black bg-white",
                    ((themeTransitionStatus && currentTheme === "dark") ||
                        (currentTheme === "light" && !themeTransitionStatus)) &&
                        "text-white bg-black"
                )}
            >
                <motion.div
                    key={
                        (currentTheme === "dark" && themeTransitionStatus) ||
                        (currentTheme === "light" && !themeTransitionStatus)
                            ? "dark"
                            : "light"
                    }
                    initial={{rotate: -180}}
                    animate={{rotate: 0}}
                    exit={{rotate: 180}}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                    }}
                >
                    {(currentTheme === "dark" && themeTransitionStatus) ||
                    (currentTheme === "light" && !themeTransitionStatus) ? (
                        <Moon />
                    ) : (
                        <Sunny />
                    )}
                </motion.div>
            </div>
        </div>
    );
}
