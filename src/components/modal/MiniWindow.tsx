import {useState, useRef, useEffect, PointerEvent } from 'react';
import { motion, useAnimationControls, useDragControls, useMotionValue, useTransform } from 'framer-motion';
import { gsap } from 'gsap';

import './MiniStyle.scss'

// icons to use from react-icons
import { FaChevronLeft, FaChevronRight, FaAngleDoubleRight } from "react-icons/fa";

// variants for framerMotion animations
import { box2_Dts1_Variant, box2_Dts2_Variant, buttonVariant, svgParent, svgCircle, svgCheck } from '../App/Variants';




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
    const [showBox2, setShowBox2] = useState<boolean>(false)
    const sliderControl = useAnimationControls()
    const previousImage = useRef<number>(0)
    const currentImage = useRef<number>(0)
    const imageWidth = useRef<number>(1)
    const imgText = {0:"Square (1:1)", 1:"Portrait (3:4)", 2:"Landscape (7:4)"}
    //@ts-ignore
    let curText = imgText[currentImage.current]

    // for the closing of the modal
    const closeY = useMotionValue(0)
    const closeDragControl = useDragControls()
    const closeAnimationControls = useAnimationControls()

    // for confirming of order
    // const buttonDragConstraintRef = useRef<HTMLButtonElement>(null);
    const xBtnOrder = useMotionValue(0)
    const btnBg = useTransform(xBtnOrder, [0, 310], ['#000', '#e8f0d5'])
    const btnColor = useTransform(xBtnOrder, [0, 310], ['#e8f0d5', '#000'])
    const miniWindowBg = useTransform(xBtnOrder, [0, 310], ['#f1f1f0', '#000'])
    const miniWindowColor = useTransform(xBtnOrder, [0, 310], ['#1f1b3d', '#e8f0d5'])
    const svgControlA = useAnimationControls()
    const svgControlB = useAnimationControls()
    const svgControlC = useAnimationControls()

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

        // stops the body element from overScrolling.. doing this mainly because of mobile version
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
        // stores the current image inView so that it becomes the previous image
        previousImage.current = currentImage.current;

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

        // if the below is true, the user is at the end of an image, so there is no need for sliding the images again
        if (previousImage.current === currentImage.current) {
            return false
        }

        // slides the current image to view
        const move1 = currentImage.current * imageWidth.current
        sliderControl.start({
            x: -move1,
            transition: {duration: .5, type: 'spring', stiffness: 500, damping: 20}
        })


        //--start-- shows the text for the current picture frame(Square|Portrait|Landscape)
        //@ts-ignore
        const curText:string = imgText[currentImage.current]
        const grab = document.querySelector('.imgFormatCvr p')!

        gsap.set(grab, {y:35})
        gsap.to(grab, {y:0, duration:.2})
        grab.innerHTML = curText
        //--end--
    }

    // when the dragging of the order button has ended, we check for where should be the final destination
    const orderButtonDragEnded = () => {
        const finalPosition = xBtnOrder.get()
        let completedOrder = false;

        if (finalPosition > 0 && finalPosition <= 270) {
            gsap.fromTo('.bx2Btn p', {x:finalPosition}, { x:0, duration:.2, onComplete: () => { xBtnOrder.set(0) } })
        } else if (finalPosition > 270 && finalPosition < 310) {
            completedOrder = true;
            gsap.fromTo('.bx2Btn p', {x:finalPosition}, { x:310, duration:.2, onComplete: () => { xBtnOrder.set(310) } })
        } else if (finalPosition>=310) {
            completedOrder = true;
        }

        // if the order is completed, 
        if (completedOrder) {
            gsap.set('.bx2Mid, .bx2Btn', {display:'none'})
            gsap.set('.svgCover', {display:'block'})

            // animates the check svg into the scene
            svgControlA.set('initial')
            svgControlA.start('animate')
    
            svgControlB.set('initial')
            svgControlB.start('animate')
    
            svgControlC.set('initial')
            svgControlC.start('animate')
        }
    }

    return (
        <motion.div
            drag="y"
            dragControls={closeDragControl}
            dragListener={false}
            dragMomentum={false}
            dragConstraints={{top:0}}
            dragElastic={0}
            style={{y:closeY}}
            onDragEnd={dragHasEnded}
            animate={closeAnimationControls}
            className="orderWindow"
        >
            <motion.div className="order_mini_window" style={{backgroundColor:miniWindowBg, color:miniWindowColor}}>
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
                            <div className="imgFormatCvr"><p>{curText}</p></div>
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
                        <motion.div className="svgCover" variants={svgParent} animate={svgControlA}>
                            <motion.svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 128 128" enableBackground="new 0 0 128 128" xmlSpace="preserve">
                                <motion.path variants={svgCheck} animate={svgControlB} fill="none" stroke="#e8f0d5" strokeWidth="4.7569" strokeLinecap="round" strokeMiterlimit="10" d="M35.4,69.2l13.4,13.4 c2.1,2.1,5.6,2.1,7.8,0l36.1-36.1"/>
                                <motion.path variants={svgCircle} animate={svgControlC} fill="none" stroke="#e8f0d5" strokeWidth="3.5677" strokeMiterlimit="10" strokeLinecap="round" d="M64,123.6L64,123.6C31.2,123.6,4.4,96.9,4.4,64 C4.4,31.1,31.2,4.4,64,4.4c32.9,0,59.6,26.7,59.6,59.6C123.7,96.9,96.9,123.6,64,123.6z"/>
                            </motion.svg>
                        </motion.div>
                        <div className="bx2Btn">
                            <motion.button style={{backgroundColor:btnBg, color:btnColor}} variants={buttonVariant} initial='initial' animate='animate'>
                                Confirm your order
                                <motion.p
                                    drag="x"
                                    dragConstraints={{left:0, right:310}}
                                    dragMomentum={false}
                                    style={{x:xBtnOrder, backgroundColor:btnColor, color:btnBg}}
                                    onDragEnd={orderButtonDragEnded}
                                >
                                    <FaAngleDoubleRight />
                                </motion.p>
                            </motion.button>
                        </div>
                    </div>
                )}
            </motion.div>
        </motion.div>
    )
}