import { Variant } from "framer-motion";
import { gsap } from 'gsap';

type generalOne = {
    initial?: Variant;
    animate?: Variant;
}
type imgType = generalOne & {
    intro: Variant;
    takeItAway: Variant;
    BringItBack: Variant;
}

export const EchImageVariant: imgType = {
    initial: (custom) => ({
        y: -100, opacity:0,
        x: (custom % 2 === 0) ? 150 : -150
    }),
    intro: (custom) => ({
        y:0, x:0, opacity:1,
        transition: {
            duration: .3,
            delay: custom * 0.14,
            ease: "easeOut",
            opacity: {
                duration: .15
            }
        }
    }),
    takeItAway: (custom) => ({
        x:Math.round(gsap.utils.random(-200, 200)),
        y:Math.round(gsap.utils.random(-200, 200)),
        // x:-10,
        // y:10,
        scale:.7,
        transition: {
            duration:.2,
            // delay: custom * 0.04,
        }
    }),
    BringItBack: (custom) => ({
        x: 0, y:0, scale:1,
        transition: {
            delay: -(custom * 0.14),
        }
    }),
};