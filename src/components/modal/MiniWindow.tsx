import {useState, useRef, useEffect} from 'react';
import { motion, useAnimationControls } from 'framer-motion';

import './MiniStyle.scss'

// icons to use from react-icons
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";



type miniProps = {
    show: boolean;
    imgUrl: string
}
// https://learn.headliner.app/hc/en-us/articles/360004101114-What-are-the-sizes-of-the-landscape-portrait-square-templates- - got references for different sizes from here
export default function MiniWindow({imgUrl}:miniProps) {
    const [showBox2, setShowBox2] = useState<boolean>(false)
    const sliderControl = useAnimationControls()
    const currentImage = useRef<number>(0)
    const imageWidth = useRef<number>(1)

    // update the image width
    useEffect(() => {
        const imgElement = document.querySelector('.img1') as Element
        const cssObj = window.getComputedStyle(imgElement, null);
        const imgW = Number(cssObj.getPropertyValue("width").replace(/[^0-9]/g, ""));
        imageWidth.current = imgW
    }, [])
    

    // the function for sliding of the images
    const showTheNextImage = async (whichSide: 'left'|'right') => {
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


        const move1 = currentImage.current * imageWidth.current
        console.log(move1)


        sliderControl.start({
            x: -move1,
            transition: {
                duration: .5,
                type: 'spring',
                stiffness: 500,
                damping: 20,
            }
        })
    }

    return (
        <div className="orderWindow">
            <div className="order_mini_window">
                <div className="orderClose"><p className=""></p></div>
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
                        <div className="bx2Mid">
                            <div className=""><p>SKU:</p><p>Printed photo</p></div>
                            <div className=""><p>Delivery:</p><p>Expedited</p></div>
                            <div className=""><p>Price:</p><p>$59.99</p></div>
                        </div>

                        <div className="bx2Btn">
                            <button>
                                <p><FaAngleDoubleRight /></p>
                                Confirm your order
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}