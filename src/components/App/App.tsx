import { useCallback, useState } from 'react';
import './app.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

// motion variant
import { cardVariant } from './Variants';

// importing react-icons to use for this project
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";



const _ = require('lodash');

type imgType = {
    id:number,
    img:string,
    rating:number,
    views:number,
}
const images: imgType[] = []


for (let index = 1; index < 13; index++) {
    images.push({
        id: index,
        img: require(`../../assets/images/${index}.jpg`),
        rating: Math.round(gsap.utils.random(1, 20)),
        views: Math.round(gsap.utils.random(10, 5000)),
    })
}








type imgProps = {
    obj: imgType,
    index: number
}
const ImgComp = ({obj, index}: imgProps) => {
    return (
        <motion.div
            layout key={index} custom={index}
            data-id={obj.id} data-rating={obj.rating} data-views={obj.views}
            variants={cardVariant} initial="initial" animate="animate"
        >
            <img src={obj.img} alt="" />
        </motion.div>
    )
}

const App = () => {
    const [allImages, setAllImages] = useState<imgType[]>(images)
    const [tabActive, setTabActive] = useState<'none'|'views'|'rating'>('none')

    // sort the images in accordance to the selected tab
    const show_the_images_for_this_tab = useCallback((wchTab:'views'|'rating') => {
        const newSort = _.sortBy(allImages, [wchTab]).reverse()
        setAllImages(newSort)
        setTabActive(wchTab)
    }, [])

    return (
        <div className="AppMain">
            <div className="TopCvr">
                <div className="AppTop">
                    <span className="first">Nordic</span><span className="second">Pixels</span>
                </div>
                <div className="navBars">
                    <div>
                        {
                            tabActive === 'rating' ? (<div className='navClick active' onClick={()=> show_the_images_for_this_tab('rating')}><span><FaStar /></span> Most Rated</div>)
                                                    : (<div className='navClick' onClick={()=> show_the_images_for_this_tab('rating')}><span><FaStar /></span> Most Rated</div>)
                        }
                    </div>
                    <div>
                        {
                            tabActive === 'views' ? (<div className='navClick active' onClick={()=> show_the_images_for_this_tab('views')}><span><FaRegEye /></span> Most viewed</div>)
                                                    : (<div className='navClick' onClick={()=> show_the_images_for_this_tab('views')}><span><FaRegEye /></span> Most viewed</div>)
                        }
                    </div>
                </div>
            </div>
            <div className="AppImages">
                    {allImages.map((ech, index) => {
                        return <ImgComp obj={ech} index={index} />
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