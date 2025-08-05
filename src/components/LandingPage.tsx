import {useEffect, useLayoutEffect, useRef, useState} from "react";
import github from "../assets/logo-github.svg";
import linkedin from "../assets/logo-linkedin.svg";
import mail from "../assets/mail-outline.svg";
import x from "../assets/logo-x.svg";
import {
    motion,
    useMotionValue,
    useMotionValueEvent,
    useScroll,
    useTransform,
} from "motion/react";
import Typewriter from "./Typewriter";
import LinkUnderlineEffect from "./LinkUnderlineEffect";
import {cn} from "../utils/util";

const text = ["Frontend Developer", "Backend Developer", "Software Developer"];

const skills = ["Docker", "NextJS", "NestJS", "Python", "C++", "React Native"];

const projects = [
    {
        title: "Pinterest Clone",
        description: ` I built a full-featured Pinterest clone using Next.js with server-side rendering, a secure authentication system using JWT access and refresh tokens, and integrated AWS S3 for image
                                        storage. I set up a zero-downtime CI/CD
                                        pipeline using GitHub Actions and Docker
                                        to automate deployments. This project
                                        highlights my ability to deliver
                                        scalable, production-ready applications
                                        with strong backend architecture and
                                        DevOps practices.`,
        techStack: `NextJS, NestJS, AWS S3, Docker, Github Actions, Postgressql, Prisma Tailwind CSS`,
        link: "https://github.com/Pearl-Pko/PinterestClone",
    },
    {
        title: "Droip.com Landing Page Clone",
        description: `I developed a responsive landing page using Next.js and Tailwind CSS, focusing on performance and SEO optimization. The page features a dynamic hero section with smooth animations, a
                                        contact form with email validation, and a
                                        blog section that fetches posts from a
                                        headless CMS. This project showcases my
                                        skills in building modern, user-friendly
                                        web applications with a focus on design and
                                        functionality.`,
        techStack: `NextJS, Tailwind CSS, React Motion`,
        link: "https://github.com/Pearl-Pko/landing-page",
    },
    {
        title: "Vite Plugin Console Pipe",
        description: ` I built a custom Vite plugin that captures
                                    console logs from the browser and forwards
                                    them to the Vite development server. The
                                    goal was to improve debugging, especially
                                    for remote or headless browsers where direct
                                    access to the browser console isn’t
                                    available. The plugin works by injecting a
                                    small client-side script into the app during
                                    development. This script intercepts calls to
                                    console.log, console.error, etc., and sends
                                    them to the dev server over WebSocket, where
                                    they’re printed in the terminal alongside
                                    server logs. This makes it easy to monitor
                                    client-side behavior directly from the
                                    development environment.`,
        techStack: "Vite, Websockets",
        link: "https://github.com/Pearl-Pko/vite-plugin-console-pipe",
    },
];

function LandingPage() {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    const lineThickness = 2;
    const lineGap = 25;

    const ref = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);

    const {scrollYProgress, scrollY} = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const clipPath = useMotionValue("");

    useLayoutEffect(() => {
        if (!stickyRef.current || !ref.current) {
            return;
        }

        stickyRef.current.getBoundingClientRect().bottom -
            ref.current.getBoundingClientRect().top;
    }, [stickyRef, ref]);

    useMotionValueEvent(scrollYProgress, "change", (val) => {
        if (!stickyRef.current || !ref.current) {
            return;
        }
        const overlapPercent = Math.min(
            Math.abs(
                (stickyRef.current.getBoundingClientRect().bottom -
                    ref.current.getBoundingClientRect().top) /
                    ref.current.getBoundingClientRect().height
            ),
            1
        );
        clipPath.set(`inset(${overlapPercent * 100}% 0px 0px 0px)`);
        console.log("scroll progress", val, scrollY);
    });

    return (
        <div
            className={
                "bg-white dark:bg-black relative font-display flex  justify-center"
            }
        >
            <div className="max-w-[960px] relative z-40 flex gap-10 items-start">
                <div className="h-screen sticky top-0 flex-1 text-black dark:text-white flex flex-col justify-center">
                    <p className="text-4xl mb-10 font-bold">Pearl Osamuede</p>

                    <p className="my-5 text-lg">
                        I am a{" "}
                        <Typewriter
                            direction={direction}
                            text={text[currentTextIndex]}
                            repeat={
                                currentTextIndex === text.length - 1
                                    ? Infinity
                                    : 1
                            }
                            delay={0.04}
                            startDelay={
                                currentIndex > 0 && direction === 1 ? 0.1 : 0.04
                            }
                            onAnimationComplete={() => {
                                if (currentTextIndex === text.length - 1)
                                    return;

                                if (direction === 1) {
                                    setDirection(-1);
                                } else {
                                    setCurrentTextIndex((c) => c + 1);
                                    setDirection(1);
                                }
                            }}
                        />
                    </p>
                    <p className="text-black/70 dark:text-white/70">
                        I'm passionate about creating meaningful digital
                        experiences through technology that not only solve
                        real-world problems but also empower individuals and
                        organizations to thrive in an increasingly connected
                        world.
                    </p>
                    <div className="flex gap-2 my-4 w-full flex-wrap">
                        {skills.map((skill) => (
                            <p
                                key={skill}
                                className={
                                    "bg-[#ccc] dark:bg-[#222] px-2 py-0.5"
                                }
                            >
                                {skill}
                            </p>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <a href="https://github.com/Pearl-Pko" target="_blank">
                            <LinkUnderlineEffect>
                                <div className="p-1">
                                    <img
                                        width={22}
                                        height={22}
                                        src={github}
                                        className=""
                                    />
                                </div>
                            </LinkUnderlineEffect>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/pearl-osamuede-50a62229a"
                            target="_blank"
                        >
                            <LinkUnderlineEffect>
                                <div className="p-1">
                                    <img
                                        width={22}
                                        height={22}
                                        src={linkedin}
                                        className=" "
                                    />
                                </div>
                            </LinkUnderlineEffect>
                        </a>
                        <a href="mailto:pearlosa32@gmail.com">
                            <LinkUnderlineEffect>
                                <div className="p-1">
                                    <img
                                        width={22}
                                        height={22}
                                        src={mail}
                                        className="text-white "
                                    />
                                </div>
                            </LinkUnderlineEffect>
                        </a>
                        <a href="https://x.com/POsamuede87691" target="_blank">
                            <LinkUnderlineEffect>
                                <div className="p-1">
                                    <img
                                        width={22}
                                        height={22}
                                        src={x}
                                        className=" "
                                    />
                                </div>
                            </LinkUnderlineEffect>
                        </a>
                    </div>
                </div>
                <div className="flex-1 relative text-black dark:text-white flex flex-col items-center justify-center ">
                    <div
                        ref={stickyRef}
                        className="flex gap-4 sticky top-0  w-full justify-center z-20 pt-20 pb-10"
                    >
                        {/* <div className="absolute inset-0 bg-black"></div> */}
                        <button
                            className={cn(
                                "text-xl relative",
                                currentIndex === 0 && "border-b-2 px-1 z-50"
                            )}
                            onClick={() => setCurrentIndex(0)}
                        >
                            <p>Experience</p>
                        </button>
                        <button
                            className={cn(
                                "text-xl relative",
                                currentIndex === 1 && "border-b-2 px-1"
                            )}
                            onClick={() => setCurrentIndex(1)}
                        >
                            <p>Projects</p>
                        </button>
                    </div>
                    <svg width="0" height="0">
                        <defs>
                            <clipPath
                                id="navClip"
                                clipPathUnits="userSpaceOnUse"
                            >
                                <rect x="0" y="0" width="100vw" height="380" />
                            </clipPath>
                        </defs>
                    </svg>

                    <motion.div
                        ref={ref}
                        className="pb-10 relative z-10 min-h-screen"
                        style={{clipPath}}
                    >
                        {currentIndex === 0 && (
                            <div className="flex  flex-col gap-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <div className="size-2 bg-black dark:bg-white rounded-full"></div>
                                        <div className="flex-1 flex justify-between items-center">
                                            <p className="text-lg">
                                                Hospyta HealthCare
                                            </p>

                                            <p>July 2024 - April 2025</p>
                                        </div>
                                    </div>
                                    <p className="italic">
                                        React Native Developer (Remote)
                                    </p>
                                    <div className="">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex gap-2">
                                                <div className="w-2 bg-black/20 dark:bg-white/50 rounded-full"></div>
                                                <p className="text-sm text-black/70 dark:text-white/70">
                                                    Led the continuous
                                                    development and maintenance
                                                    of the Hospyta Patient App
                                                    and Doctor App to ensure
                                                    smooth and enhanced user
                                                    experiences
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="w-2 bg-black/20 dark:bg-white/50 rounded-full"></div>

                                                <p className="text-sm text-black/70 dark:text-white/70">
                                                    Played a key role in the
                                                    successful launch and
                                                    continuous development of
                                                    multiple high-performing
                                                    mobile applications across
                                                    various sectors of the
                                                    healthcare industry.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full h-[1px] rounded-full bg-black/50 dark:bg-white/50"></div>

                                <div>
                                    <div className="flex items-center gap-2">
                                        <div className="size-2 bg-black dark:bg-white rounded-full"></div>
                                        <div className="flex-1 flex justify-between items-center">
                                            <p className="text-lg">
                                                Princeps Credit System Limited
                                            </p>

                                            <p>July 2025</p>
                                        </div>
                                    </div>
                                    <p className="italic">Backend Intern</p>
                                    <div className="">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex gap-2">
                                                <div className="w-2 bg-black/20 dark:bg-white/50 rounded-full"></div>
                                                <p className="text-sm text-black/70 dark:text-white/70">
                                                    Designed and implemented a
                                                    reusable authentication
                                                    system using NestJS,
                                                    enabling secure, modular,
                                                    and scalable user management
                                                    across multiple
                                                    microservices and
                                                    applications.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {currentIndex === 1 && (
                            <div className="flex flex-col self-start gap-4">
                                {projects.map((project, index) => {
                                    return (
                                        <div className="flex flex-col gap-4">
                                            <div className="flex flex-col">
                                                <p className="text-xl">
                                                    {project.title}
                                                </p>
                                                <p className="text-black dark:text-white mt-2 mb-1">
                                                    Tech Stack:{" "}
                                                    {project.techStack}
                                                </p>
                                                <p className="text-black/70 dark:text-white/70 text-sm">
                                                    {project.description}
                                                </p>
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    className="self-end"
                                                >
                                                    <LinkUnderlineEffect>
                                                        <p className="px-2">
                                                            View Project {"</>"}
                                                        </p>
                                                    </LinkUnderlineEffect>
                                                </a>
                                            </div>
                                            {index !== projects.length - 1 && (
                                                <div className="w-full h-[1px] rounded-full bg-white/50"></div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
            <div
                style={{
                    // 5 px is the thickness of each line, 10px is the gap between lines
                    backgroundImage: `repeating-linear-gradient(
                                                to right,
                                                var(--grid-color) 0px,
                                                var(--grid-color) ${lineThickness}px,
                                                transparent ${lineThickness}px, 
                                                transparent ${
                                                    lineThickness + lineGap
                                                }px
                                            ),
                                    repeating-linear-gradient(
                                        to bottom,
                                        var(--grid-color) 0px,
                                        var(--grid-color) ${lineThickness}px,
                                        transparent ${lineThickness}px, 
                                        transparent ${lineThickness + lineGap}px
                                    )`,
                }}
                className="absolute inset-0 z-30 me opacity-5 dark:opacity-100"
            ></div>
        </div>
    );
}

export default LandingPage;
