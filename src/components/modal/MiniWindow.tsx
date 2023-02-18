import {useState } from 'react';
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

    return (
        <div className="orderWindow">
            <div className="order_mini_window">
                <div className="orderClose"><p className=""></p></div>
                {!showBox2 && (
                    <div className="box1">
                        <div className="orderTitle">Choose your format</div>
                        <div className="orderImgCvr">
                            <div className="navBtn">
                                <div className=""><FaChevronLeft /></div>
                            </div>
                            <div className="imgSlideCvr">
                                <div className="imgInnerCvr">
                                    <div className="img1"><img src={imgUrl} alt="" /></div>
                                    <div className="img1"><img src={imgUrl} alt="" /></div>
                                    <div className="img1"><img src={imgUrl} alt="" /></div>
                                </div>
                            </div>
                            <div className="navBtn">
                                <div className=""><FaChevronRight /></div>
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