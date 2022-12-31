import styles from "../styles/Featured.module.css";
import Image from "next/image";
import { useRef,useEffect} from "react";

const Featured = () => {
const vidRef = useRef();

useEffect(() => {
  vidRef.current.play();
}, []);


const order = ()=>{
   var element = document.getElementById("food");
   element.scrollIntoView();
}
  return (
    <div className="intro">
      <video
        src="https://res.cloudinary.com/destiny1233/video/upload/v1667857216/Video_By_Vimeo_oeomik.mp4"
        className="back-video"
        ref={vidRef}
        muted
        autoPlay
        loop
      />
      <div className="content">
        <h2 className="first-head">Hot and Spicy</h2>
        <h2 className="second-head mt-3">Reserved just for you</h2>
        <button onClick={order}>Order now</button>
      </div>
    </div>
  );
};

export default Featured;
