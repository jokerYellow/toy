import './Toy.css';
import backgroundImage1 from './wp1854626-the-witcher-3-wallpapers.jpg';

function Toy() {
    return <div
    className="back center" 
    style={{backgroundImage:`url(${backgroundImage1})`}}>
        <div>
            <p className="clock">18:47</p>
            <p className="motto">stay foolish,stay hungry</p>
        </div>
    </div>
}

export default Toy;