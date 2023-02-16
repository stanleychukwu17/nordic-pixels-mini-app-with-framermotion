import { useState } from 'react';
import './app.scss';
// import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

type imgType = {
    id:number,
    img:string,
    rating:number,
    watched:number,
}
const images: imgType[] = []


for (let index = 1; index < 13; index++) {
    images.push({
        id: index,
        img: require(`../../assets/images/${index}.jpg`),
        // img: require(`../../assets/images/1.jpg`),
        rating: Math.round(gsap.utils.random(1, 20)),
        watched: Math.round(gsap.utils.random(10, 5000)),
    })
}
console.log(images)

const App = () => {
    const [allImages, setAllImages] = useState<imgType[]>(images)

    return (
        <div className="AppMain">
            <div className="TopCvr">
                <div className="AppTop">
                    <span className="first">Nordic</span><span className="second">Pixels</span>
                </div>
                <div className="navBars">
                    <div>
                        <div className='navClick'><span><FaStar /></span> Most Rated</div>
                    </div>
                    <div>
                        <div className='navClick'><span><FaRegEye /></span> Most viewed</div>
                    </div>
                </div>
            </div>
            <div className="AppImages">
                {allImages.map((ech, index) => {
                    return (
                        <div className="" key={index} data-id={ech.id} data-rating={ech.rating} data-watched={ech.watched}>
                            <img src={ech.img} alt="" />
                        </div>
                    )
                })}
            </div>
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
        </div>
    )
}
export default App;