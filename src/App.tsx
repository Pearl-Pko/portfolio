import {useState} from "react";
import "./App.css";
import github from "./assets/logo-github.svg";
import linkedin from "./assets/logo-linkedin.svg";
import mail from "./assets/mail-outline.svg";
import x from "./assets/logo-x.svg";
import {motion} from "motion/react";
import LinkUnderlineEffect from "./components/LinkUnderlineEffect";
import Typewriter from "./components/Typewriter";

const text = ["Frontend Developer", "Backend Developer", "Software Developer"];
function App() {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    return (
        <div className="bg-black h-screen font-display flex  justify-center">
            <div className="max-w-[960px] flex gap-10 items-center ">
                <div className="h-full flex-1 text-white flex flex-col justify-center">
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
                    <p className="text-white/70">
                        I'm passionate about creating meaningful digital
                        experiences through technology that not only solve
                        real-world problems but also empower individuals and
                        organizations to thrive in an increasingly connected
                        world.
                    </p>
                    <div className="flex gap-2 my-4 w-full flex-wrap">
                        <p className="bg-[#222] px-2 py-0.5">Docker</p>
                        <p className="bg-[#222] px-2 py-0.5">NextJS</p>
                        <p className="bg-[#222] px-2 py-0.5">NestJS</p>
                        <p className="bg-[#222] px-2 py-0.5">Python</p>
                        <p className="bg-[#222] px-2 py-0.5">C++</p>
                        <p className="bg-[#222] px-2 py-0.5">React Native</p>
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
                                        className=" "
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
                <div className="flex-1 text-white flex flex-col gap-10 items-center justify-center ">
                    <div className="flex gap-2 ">
                        <button onClick={() => setCurrentIndex(0)}>
                            <p>Experience</p>
                        </button>
                        <button onClick={() => setCurrentIndex(1)}>
                            <p>Projects</p>
                        </button>
                    </div>
                    {currentIndex === 0 && (
                        <div className="flex  flex-col gap-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <div className="size-2 bg-white rounded-full"></div>
                                    <div className="flex-1 flex justify-between items-center">
                                        <p className="text-xl">
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
                                            <div className="w-1 bg-white/50 rounded-full"></div>
                                            <p className="text-sm text-white/70">
                                                Led the continuous development
                                                and maintenance of the Hospyta
                                                Patient App and Doctor App to
                                                ensure smooth and enhanced user
                                                experiences
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="w-1 bg-white/50 rounded-full"></div>

                                            <p className="text-sm text-white/70">
                                                Played a key role in the
                                                successful launch and continuous
                                                development of multiple
                                                high-performing mobile
                                                applications across various
                                                sectors of the healthcare
                                                industry.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-0.5 rounded-full bg-white"></div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <div className="size-2 bg-white rounded-full"></div>
                                    <div className="flex-1 flex justify-between items-center">
                                        <p className="text-xl">
                                            Princeps Credit System Limited
                                        </p>

                                        <p>July 2025</p>
                                    </div>
                                </div>
                                <p className="italic">Backend Intern</p>
                                <div className="">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex gap-2">
                                            <div className="w-1 bg-white/50 rounded-full"></div>
                                            <p className="text-sm text-white/70">
                                                Designed and implemented a
                                                reusable authentication system
                                                using NestJS, enabling secure,
                                                modular, and scalable user
                                                management across multiple
                                                microservices and applications.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {currentIndex === 1 && (
                        <div className="flex flex-col self-start gap-4">
                            <div className="flex flex-col">
                                <p className="text-xl">Pinterest Clone</p>
                                <p className="text-white mt-2 mb-1">
                                    Tech Stack: NextJS, NestJS, AWS S3, Docker,
                                    Github Actions, PostgresSql, Prisma Tailwind
                                    CSS
                                </p>
                                <p className="text-white/70">
                                    I built a full-featured Pinterest clone
                                    using Next.js with server-side rendering, a
                                    secure authentication system using JWT
                                    access and refresh tokens, and integrated
                                    AWS S3 for image storage. I set up a
                                    zero-downtime CI/CD pipeline using GitHub
                                    Actions and Docker to automate deployments.
                                    This project highlights my ability to
                                    deliver scalable, production-ready
                                    applications with strong backend
                                    architecture and DevOps practices.
                                </p>
                                <a
                                    href="https://github.com/Pearl-Pko/PinterestClone"
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
                            <div className="w-full h-0.5 rounded-full bg-white"></div>

                            <div className="flex flex-col">
                                <p className="text-xl">
                                    Droip.com Landing Page Clone
                                </p>
                                <p className="text-white">
                                    Tech Stack: NextJS, Tailwind CSS, React
                                    Motion
                                </p>
                                <p className="text-white/70">
                                    I recreated the Droip.com landing page,
                                    focusing on high-fidelity design and smooth,
                                    modern animations using Framer Motion. This
                                    project was an exploration of current
                                    frontend animation trends, including
                                    scroll-driven effects, parallax transitions,
                                    staggered motion sequences, and
                                    micro-interactions to enhance user
                                    engagement. I carefully studied Droip’s
                                    design language to replicate its sleek,
                                    modern aesthetic, while also adding my own
                                    touches to improve responsiveness and
                                    performance. The animations were implemented
                                    with performance in mind, ensuring a fluid
                                    experience across devices.
                                </p>
                                <a
                                    href="https://github.com/Pearl-Pko/landing-page"
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
                            <div className="flex flex-col">
                                <p className="text-xl">
                                    Vite Plugin Console Pipe
                                </p>
                                <p className="text-white">
                                    Tech Stack: Vite, Websockets
                                </p>
                                <p className="text-white/70">
                                    I built a custom Vite plugin that captures
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
                                    development environment.
                                </p>
                                <a
                                    href="https://github.com/Pearl-Pko/landing-page"
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
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
