import {useState, useRef, useEffect, PointerEvent } from 'react';
import { motion, useAnimationControls, useDragControls, useMotionValue } from 'framer-motion';
// useTransform

import './MiniStyle.scss'

// icons to use from react-icons
import { FaChevronLeft, FaChevronRight, FaAngleDoubleRight } from "react-icons/fa";

// variants for framerMotion animations
import { box2_Dts1_Variant, box2_Dts2_Variant, buttonVariant } from '../App/Variants';



// checks to see if a user is on a mobile device
function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
    
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}




export type modalProps1 = {
    show: boolean;
    imgUrl: string
}
type miniProps = modalProps1 & {
    setShowModal: React.Dispatch<React.SetStateAction<{
        show: boolean;
        imgUrl: string;
    }>>;
}
// https://learn.headliner.app/hc/en-us/articles/360004101114-What-are-the-sizes-of-the-landscape-portrait-square-templates- - got references for different sizes from here
export default function MiniWindow({imgUrl, setShowModal}:miniProps) {
    const [showBox2, setShowBox2] = useState<boolean>(true)
    const sliderControl = useAnimationControls()
    const currentImage = useRef<number>(0)
    const imageWidth = useRef<number>(1)

    // for the closing of the modal
    const closeY = useMotionValue(0)
    const closeDragControl = useDragControls()
    const closeAnimationControls = useAnimationControls()


    // update the slider image width
    useEffect(() => {
        try {
            const imgElement = document.querySelector('.img1') as Element
            const cssObj = window.getComputedStyle(imgElement, null);
            const imgW = Number(cssObj.getPropertyValue("width").replace(/[^0-9]/g, ""));
            imageWidth.current = imgW
        } catch (error) {
            console.log(error)
        }

        // animates the modal into view
        closeAnimationControls.set({opacity:0, y: 300})
        closeAnimationControls.start({opacity:1, y:0, transition:{ease:'easeOut'}})

        // i want the closing button to be bigger on mobile devices
        if(detectMob()) {
            const button = document.querySelector('.orderClose p')
            button?.classList.add('mobileSize')
        }

        // stops the body element from overScrolling
        document.querySelector('body')?.classList.add('noScroll')
        return () => {
            document.querySelector('body')?.classList.remove('noScroll')
        }
    }, [closeAnimationControls])

    //--start-- for modal mini-window closing
    function startDrag(e: PointerEvent<HTMLParagraphElement>) {
        closeDragControl.start(e)
    }

    async function dragHasEnded(e:DragEvent) {
        const currentCloseY = closeY.get()
        if (currentCloseY < 150) {
            closeAnimationControls.start({y:0})
        } else {
            await closeAnimationControls.start({y:500, opacity:0, transition:{ease:'linear', duration:.2}})

            // update the state so that the parent component knows that the modal is no-longer showing anymore, also delays the update until the animation above is completed
            setShowModal({show:false, imgUrl:imgUrl})
        }
    }
    //--end--

    // the function for sliding of the images
    const showTheNextImage = async (whichSide: 'left'|'right') => {
        // moving to the left or to the right
        if (whichSide === 'left'){
            currentImage.current--;

            if (currentImage.current <= 0) {
                currentImage.current = 0
            }
        } else if (whichSide === 'right') {
            currentImage.current++;

            if (currentImage.current >= 2) {
                currentImage.current = 2
            }
        }

        // slides the current image to view
        const move1 = currentImage.current * imageWidth.current
        sliderControl.start({
            x: -move1,
            transition: {duration: .5, type: 'spring', stiffness: 500, damping: 20}
        })
    }

    return (
        <motion.div
            drag="y"
            dragControls={closeDragControl}
            dragListener={false}
            dragMomentum={false}
            dragConstraints={{top:0}}
            dragElastic={0}
            className="orderWindow"
            style={{y:closeY}}
            onDragEnd={dragHasEnded}
            animate={closeAnimationControls}
        >
            <div className="order_mini_window">
                <div className="orderClose">
                    <motion.p
                        onPointerDown={startDrag}
                        style={{touchAction: "none"}}
                    ></motion.p>
                </div>

                {!showBox2 && (
                    <div className="box1">
                        <div className="orderTitle">Choose your format</div>
                        <div className="orderImgCvr">
                            <div className="navBtn">
                                <div onClick={() => showTheNextImage('left')}><FaChevronLeft /></div>
                            </div>
                            <div className="imgSlideCvr">
                                <motion.div className="imgInnerCvr" animate={sliderControl}>
                                    <div className="img1">
                                        <div><img src={imgUrl} alt="" /></div>
                                    </div>
                                    <div className="img1 i2">
                                        <div><img src={imgUrl} alt="" /></div>
                                    </div>
                                    <div className="img1 i3">
                                        <div><img src={imgUrl} alt="" /></div>
                                    </div>
                                </motion.div>
                            </div>
                            <div className="navBtn">
                                <div onClick={() => showTheNextImage('right')}><FaChevronRight /></div>
                            </div>
                        </div>
                        <div className="imgFormatB1">
                            <div className="imgFormatCvr"></div>
                        </div>
                        <div className="orderBtn">
                            <button onClick={() => setShowBox2(true)}>Continue</button>
                        </div>
                    </div>
                )}
                {showBox2 && (
                    <div className="box2">
                        <div className="orderTitle">Review your order</div>
                        <motion.div variants={box2_Dts1_Variant} initial='initial' animate='animate' className="bx2Mid">
                            <motion.div variants={box2_Dts2_Variant}><p>SKU:</p><p>Printed photo</p></motion.div>
                            <motion.div variants={box2_Dts2_Variant}><p>Delivery:</p><p>Expedited</p></motion.div>
                            <motion.div variants={box2_Dts2_Variant}><p>Price:</p><p>$59.99</p></motion.div>
                        </motion.div>

                        <div className="bx2Btn">
                            <motion.button variants={buttonVariant} initial='initial' animate='animate'>
                                <p><FaAngleDoubleRight /></p> Confirm your order
                            </motion.button>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    )
}