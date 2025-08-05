import React from "react";
import {motion} from "motion/react";

export default function LinkUnderlineEffect({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <motion.div
            className="relative"
            whileHover={"hover"}
            whileFocus={"hover"}
            initial={"blur"}
            transition={{ease: "linear"}}
        >
            {children}
            <motion.div
                variants={{hover: {scaleX: 1}, blur: {scaleX: 0}}}
                transition={{ease: "linear", duration: 0.2}}
                className="bg-black dark:bg-white origin-left w-full absolute h-[1.5px] "
            ></motion.div>
        </motion.div>
    );
}
