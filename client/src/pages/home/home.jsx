

import BentoContainer from "../../components/bentoGrid/bentoGridContainer";
import Footer from "../../components/footer";
import TitleBar from "../../components/titleBar";
import University from "../../components/university";
import "./home.css"
// landing Page
const Home = () => {
  const number = ["HNBGU","GEU","SDSU","DU","GEHU","GEHU"]
  return (
    <section className="w-full h-full flex flex-col">
      <TitleBar role={"landing"} />
      <main className="w-[96.4%] mx-auto primary-bg h-full rounded-tl-xxl rounded-tr-xxl overflow-y-auto my-scroll-bar ">
        <section className="w-full relative overflow-hidden" id="heroSection">
          <div className="h-[40vh] w-full flex flex-col justify-end items-center leading-line-height ">
            <h1 className="text-cl font-bold text-accent-dark text-center">
              <span className="text-white">Get Your</span> Study <span className="text-white">Material</span>
            </h1>
            <p className="font-semibold w-[50%] text-center ">
              In one spot by just selecting your institute, course, and semester to get syllabus-based
              study resources.
            </p>
          </div>
    <div className=" w-full flex justify-center mt-lg"><button className="shiny-cta">Get Started</button></div>
          <img
            src="src\assets\hero_image.png"
            className="aspect-sqaure max-w-1/2 mx-auto my-lg"
          />
        </section>
        <section name="Explore University" className="w-full">
          <h2 className="text-xxl font-bold text-accent text-center">
            Explore Universities
          
          </h2>
          <p className="text-center">syllabus based learning from leading universities</p>
        <div className="w-full ">
             {/* {className=" grid  grid-cols-[repeat(4,11.25rem)] auto-rows-auto  gap-8 place-content-center place-items-center my-xl w-fit border"}> */}
 <div id="universityWrapper">
           {number.map((num,index)=> <University key={index} name={num}/>)}
          </div>
        
          </div>
         
        </section>
        <section className="bento-grid ">
        <h2 className="text-xxl font-bold text-accent text-center">
        Learning Resources
        </h2>
        <p className="text-center max-w-[800px] mx-auto">The Smart Learning Kit has everything you need to study smarter — clear video lessons, fun quizzes, quick notes, and all your syllabus-based content in one place. Learn better, test yourself, and revise fast!</p>
          <BentoContainer/>
        </section>
        <Footer/>
      </main>
     
    </section>
  );
};
export default Home;
