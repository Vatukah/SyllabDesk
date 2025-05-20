import logo from "../assets/syllabDesk_logo_2.svg";
export default function Footer() {
  return (
    <footer>
     
      <div className="w-full accent-light px-4 py-6 flex items-center justify-between">
      <div className=" flex item-center gap-2">
          <img src={logo} alt="syllabDesk logo" className="w-8 aspect-square bg-white rounded-full"/>
          <div className="font-bold text-lg ">SyllabDesk</div>
        </div>
        <span>Copyright ©&nbsp;2025&nbsp;SyllabDesk.</span>
      </div>
    </footer>
  );
}
