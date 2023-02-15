import { useState } from 'react';
import './app.scss';
// import { motion } from 'framer-motion';
// import { gsap } from 'gsap';

type imgType = {num:number, img:string}
const images: imgType[] = []


for (let index = 1; index < 13; index++) {
    images.push({
        num:index,
        // img: require(`../../assets/images/${index}.jpg`)
        img: require(`../../assets/images/1.jpg`)
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
                        <div>Most Rated</div>
                    </div>
                    <div>
                        <div>Most viewed</div>
                    </div>
                </div>
            </div>
            <div className="AppImages">
                {allImages.map((ech, index) => {
                    return (
                        <div className="" key={index}>
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
                        <div className="orderImgCvr"></div>
                        <div className="orderBtn"></div>
                    </div>
                    <div className="box2"></div>
                </div>
            </div>
        </div>
    )
}
export default App;