import { useState } from 'react';
import './app.scss';
// import { motion } from 'framer-motion';
// import { gsap } from 'gsap';

type imgType = {num:number, img:string}
const images: imgType[] = []


for (let index = 1; index < 13; index++) {
    images.push({
        num:index,
        img: require(`../../assets/images/${index}.jpg`)
    })
}
console.log(images)

const App = () => {
    const [allImages, setAllImages] = useState<imgType[]>(images)

    return (
        <div className="AppMain">
            <div className="">
                <span className="first">Nordic</span> <span className="second">Pixels</span>
            </div>
            <div className="">
                {allImages.map((ech, index) => {
                    return (
                        <div className="" key={index}>
                            <img src={ech.img} alt="" />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default App;