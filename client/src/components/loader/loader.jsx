import Lottie from "react-lottie";
import animationData from "../../assets/lottie/pageFlip.json";
export default function Loader({ text }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="pointer-events-none flex flex-col justify-center items-center relative w-full h-full">
      <Lottie options={defaultOptions} height={67.5} width={120} />
      <p className="text-gray-400 font-bold ">{text}…</p>
    </div>
  );
}
