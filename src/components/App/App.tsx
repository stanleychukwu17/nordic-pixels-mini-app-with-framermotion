import {useEffect, useState } from 'react';
import './app.scss';
import { motion, useAnimationControls } from 'framer-motion';
import { gsap } from 'gsap';

// variants for framer motion animations
import {EchImageVariant} from './Variants'

// icons to use from react-icons
import { FaStar } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

// components
import { modalProps1 } from '../modal/MiniWindow';
import MiniWindow from '../modal/MiniWindow';

// importing utility lodash
const _ = require('lodash');







type imgType = {
    id:number,
    img:string,
    rating:number,
    views:number,
}
const images: imgType[] = []
// load the images to be displayed into our array database
for (let index = 1; index < 13; index++) {
    images.push({
        id: index,
        img: require(`../../assets/images/${index}.jpg`),
        rating: Math.round(gsap.utils.random(10, 200)),
        views: Math.round(gsap.utils.random(10, 5000)),
    })
}

const App = () => {
    const [allImages, setAllImages] = useState<imgType[]>(images)
    const [tabActive, setTabActive] = useState<'none'|'views'|'rating'>('none')
    // const [showModal, setShowModal] = useState<modalProps1>({show:true, imgUrl:allImages[3].img}) // if you want to show image quickly, maybe u might want to debug
    const [showModal, setShowModal] = useState<modalProps1>({show:false, imgUrl:''})
    const imageControls = useAnimationControls()

    // animate the grid images into view
    useEffect(() => {
        imageControls.start('intro')
    }, [imageControls])

    // sort the images in accordance to the selected tab
    const show_the_images_for_this_tab = async (wchTab:'views'|'rating') => {
        const newSort = _.sortBy(allImages, [wchTab]).reverse()

        await imageControls.start('takeItAway')
        imageControls.start('BringItBack')

        setAllImages(newSort)
        setTabActive(wchTab)
    }

    const show_this_image_options_for_purchase = (imgUrl:string) => {
        setShowModal({show:true, imgUrl}); // shows the mini-window for buying of images
    }

    // blur the rest of the contents on modal opening
    useEffect(() => {
        const itemsToBlur = ['.TopCvr', '.AppImages']
        if (showModal.show) {
            itemsToBlur.forEach(item => {
                document.querySelector(item)?.classList.add('blurItems')
            })
        } else {
            itemsToBlur.forEach(item => {
                document.querySelector(item)?.classList.remove('blurItems')
            })
        }
    }, [showModal])

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
                        return (
                            <motion.div
                                variants={EchImageVariant}
                                initial='initial'
                                animate={imageControls}
                                custom={index}
                                className="" key={index} data-id={ech.id} data-rating={ech.rating} data-views={ech.views}
                                onClick={() => { show_this_image_options_for_purchase(ech.img) }}
                            >
                                <img src={ech.img} alt="" />
                            </motion.div>
                        )
                    })}
            </div>
            { showModal.show && <MiniWindow setShowModal={setShowModal} {...showModal} /> }
        </div>
    )
}
export default App;