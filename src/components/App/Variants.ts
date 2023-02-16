import { Variant } from "framer-motion";

export const cardVariant: {initial?: Variant, animate?: Variant} = {
    initial: (custom) => ({
        x: -1000, opacity:0,
    }),
    animate: (custom) => ({
        x:0, opacity:1,
        transition: {
            duration: 1,
            delay: custom * 0.2,
            // ease: "easeOut",
            when: "beforeChildren"
        }
    })
};