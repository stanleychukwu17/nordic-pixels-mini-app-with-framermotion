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



// this variants are for MiniWindow.tsx components
export const box2_Dts1_Variant: generalOne = {
    initial: {},
    animate: {
        transition:{
            staggerChildren: .1
        }
    }
}

export const box2_Dts2_Variant: generalOne = {
    initial: {x: 50, opacity: 0},
    animate: { x: 0, opacity: 1}
}

export const buttonVariant: generalOne = {
    initial: {scale: .8},
    animate: {
        scale: 1,
        transition: {
            duration: .1,
            type: 'spring',
            stiffness: 700,
            damping: 8,
        }
    }
}

export const svgParent: generalOne = {
    initial: {rotate: 0, scale: .7},
    animate: {
        rotate: 360,
        scale: 1,
        originX: 'center',
        originY: 'center',
        transition: {
            duration: 2,
            ease: 'easeInOut',
        }
    }
}

export const svgCircle: generalOne = {
    initial: {pathLength: 0, pathOffset: 0},
    animate: {
        pathLength: 1,
        pathOffset: [0,1.5,2],
        transition: {
            duration: 1, ease: 'linear'
        }
    }
}

export const svgCheck: generalOne = {
    initial: {pathLength: 0},
    animate: {
        pathLength: 1,
        transition: {duration: .4, delay:1.5, ease: 'easeInOut'}
    }
}