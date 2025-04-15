import TextGrid from "./textGrid";
import ExamBro from '../../assets/exambro.png';
import Notes from '../../assets/Notes-bro.png';
import ImageGrid from "./imageGrid";

export default function BentoContainer(){
   
    const content =[
        {   
            type:"text",
            text:"Video Lesson",
            goto:"route/"
        },
        {
            type:"image",
            name:"image1",
            text:"Syllabus based Learning",
            img:ExamBro
        },
        {
            type:"image",
            name:"image2",
            text:"Instant Note Taking",
            img:Notes
        },
        
        {    
            type:"text",
            text:"Interactive Quizs",
            goto:"route/"
        }
    ]
    return (
        <div className="bento-container mx-auto my-12 rounded-xxl grid grid-cols lg:grid-cols-3">
   {
    content.map((grid,index)=> grid.type === "text"?<TextGrid key={index} prop={grid}/>: <ImageGrid key={index} prop={grid}/>)
   }
        </div>
    )
}