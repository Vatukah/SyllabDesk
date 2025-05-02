
import Footer from "../footer"
export default function  MainContent({children}){

    return(
        <main className=" h-full primary-bg rounded-tl-xxl rounded-tr-xxl overflow-y-auto my-scroll-bar">
    {children}
    <Footer/>
        </main>
    )
}