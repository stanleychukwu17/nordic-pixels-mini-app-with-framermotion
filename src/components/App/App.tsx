import './app.scss';
// import { motion } from 'framer-motion';
// import { gsap } from 'gsap';

const images = [
]
for (let index = 0; index < 20; index++) {
    images.push({
        img: require(`../../assets/img${index}.jpg`)
    })
}
console.log(images)

const App = () => {
    return (
        <div className="AppMain">
            <div className="">
                <span className="first">Nordic</span> <span className="second">Pixels</span>
            </div>
            <div className="">

            </div>
        </div>
    )
}
export default App;