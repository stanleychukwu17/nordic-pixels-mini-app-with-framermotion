// icons to use from react-icons
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

export default function MiniWindow() {
    return (
        <div className="orderWindow"> 
            <div className="order_mini_window">
                <div className="orderClose"><p className=""></p></div>
                <div className="box1">
                    <div className="orderTitle">Choose your format</div>
                    <div className="orderImgCvr">
                        <div className="navBtn">
                            <div className=""><FaChevronLeft /></div>
                        </div>
                        <div className="imgSlideCvr">
                            <div className="imgInnerCvr"></div>
                        </div>
                        <div className="navBtn">
                            <div className=""><FaChevronRight /></div>
                        </div>
                    </div>
                    <div className="imgFormatB1">
                        <div className="imgFormatCvr"></div>
                    </div>
                    <div className="orderBtn">
                        <button className="">Continue</button>
                    </div>
                </div>
                <div className="box2"></div>
            </div>
        </div>
    )
}