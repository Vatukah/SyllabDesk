import lottie from 'lottie-web/build/player/lottie_light';
import animationData from "../../assets/lottie/pageFlip.json";
import { useRef ,useEffect} from 'react';
export default function Loader({ text }) {
   const containerRef = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData,
    });

    return () => anim.destroy(); // Cleanup on unmount
  }, []);

  return (
    <div className="pointer-events-none flex flex-col justify-center items-center relative w-full h-full">
      <div ref={containerRef} className='w-26 h-26'></div>
      <p className="text-gray-400 font-bold ">{text}…</p>
    </div>
  );
}
