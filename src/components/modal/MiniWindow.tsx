import './MiniStyle.scss'

// icons to use from react-icons
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";


type miniProps = {
    show: boolean;
    imgUrl: string
}
// https://learn.headliner.app/hc/en-us/articles/360004101114-What-are-the-sizes-of-the-landscape-portrait-square-templates- - got references for different sizes from here
export default function MiniWindow({imgUrl}:miniProps) {

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
                        <button className="">Continue</button>
                    </div>
                </div>
                <div className="box2"></div>
            </div>
        </div>
    )
}