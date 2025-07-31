import {motion} from "motion/react";

const Typewriter = ({
    text,
    delay = 0.05,
    blinkRate = 0.7,
    direction = 1,
}: {
    text: string;
    delay?: number;
    blinkRate?: number;
    direction?: number;
}) => {
    const letters = text.split("");

    const container = {
        // hidden: {opacity: 0},
        visible: {
            // opacity: 1,
            transition: {
                staggerChildren: delay,
                delayChildren: delay,
                staggerDirection: direction,
            },
        },
    };

    return (
        <motion.span
            variants={container}
            initial="hidden"
            animate="visible"
            className="inline-block relative"
        >
            {letters.map((char, index) => (
                <motion.span
                    variants={{
                        hidden: {opacity: direction === 1 ? 0 : 1},
                        visible: {
                            opacity: direction === 1 ? 1 : 0,
                            transition: {
                                ease: "linear",
                                duration: 0,
                                delayChildren: direction * delay,
                            },
                        },
                    }}
                    key={index}
                    className="inline-block"
                >
                    {char === " " ? "\u00A0" : char}
                    <motion.span
                        variants={{
                            hidden: () => ({opacity: direction === 1 ? 1 : 0}),
                            visible: () =>
                                direction === 1 && index === letters.length - 1
                                    ? {
                                          opacity: [1, 0, 1],
                                          transition: {
                                              duration: blinkRate,
                                              repeat: Infinity,
                                              ease: "linear",
                                          },
                                      }
                                    : {
                                          opacity: direction === 1 ? 0 : 1,
                                          transition: {
                                              duration: 0,
                                          },
                                      },

                            // visible: {opacity: 1},
                        }}
                        transition={{duration: 0}}
                        // transition={{delay: delay}}
                        className="absolute inline-block pl-0.5"
                    >
                        █
                    </motion.span>
                </motion.span>
            ))}
        </motion.span>
    );
};

export default Typewriter;
