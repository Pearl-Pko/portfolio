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
    const [themeTransitionStatus, setThemeTransitionStatus] = useState<
        false | "expanding" | "contracting"
    >(false);

    const [themeTogglePosition, setThemeTogglePosition] = useState<{
        x: number;
        y: number;
    }>();

    const currentAnimationRef = useRef<AnimationPlaybackControlsWithThen>(null);

    const lightModeRef = useRef<HTMLDivElement>(null);
    const darkModeRef = useRef<HTMLDivElement>(null);

    const modeToggleRef = useRef<HTMLDivElement>(null);

    const [scope, animate] = useAnimate();

    const handleThemeToggle = async () => {
        if (!lightModeRef.current || !darkModeRef.current) return;

        const togglePosition = themeTogglePosition || {x: 0, y: 0};
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

            currentAnimationRef.current = animate(
                expandingElement,
                {
                    clipPath:
                        nextThemeTransitionStatus === "expanding"
                            ? `circle(200% at ${togglePosition.x}px ${togglePosition.y}px)`
                            : `circle(0% at ${togglePosition.x}px ${togglePosition.y}px)`,
                },
                {
                    duration:
                        currentAnimationRef.current?.time &&
                        currentAnimationRef.current.time > 0
                            ? currentAnimationRef.current.time
                            : 1,
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
                    clipPath: `circle(0px at ${togglePosition.x}px ${togglePosition.y}px)`,
                },
                {
                    duration: 0,
                }
            );
            setThemeTransitionStatus(false);
        } catch (error) {
            console.error("error o", error);
        }
    };

    useLayoutEffect(() => {
        if (!modeToggleRef.current) return;

        const box = modeToggleRef.current.getBoundingClientRect();
        setThemeTogglePosition({
            x: (box.x + box.x + box.width) / 2,
            y: (box.y + box.y + box.height) / 2,
        });
    }, []);

    //  specify the reference point for scaling animations triggered by theme changes
    useEffect(() => {
        if (
            !lightModeRef.current ||
            !darkModeRef.current ||
            !themeTogglePosition
        )
            return;

        if (prefersDark) {
            animate(
                lightModeRef.current,
                {
                    clipPath: `circle(0% at ${themeTogglePosition.x}px ${themeTogglePosition.y}px)`,
                },
                {
                    duration: 0,
                }
            );
        } else {
            animate(
                darkModeRef.current,
                {
                    clipPath: `circle(200% at ${themeTogglePosition.x}px ${themeTogglePosition.y}px)`,
                },
                {
                    duration: 0,
                }
            );
        }
    }, [
        themeTogglePosition,
        lightModeRef.current,
        darkModeRef.current,
        prefersDark,
    ]);

    console.log("box", themeTogglePosition);

    return (
        <div className="relative">
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
                <LandingPage />
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
                <LandingPage />
            </motion.div>

            <div
                ref={modeToggleRef}
                onClick={() => handleThemeToggle()}
                className={cn(
                    "fixed top-20 left-20 size-10 rounded-full p-1.5  z-[500]",
                    currentTheme === "dark" && "text-black bg-white",
                    currentTheme === "light" && "text-white bg-black"
                )}
            >
                {currentTheme === "dark" ? <Sunny /> : <Moon />}
            </div>
        </div>
    );
}
