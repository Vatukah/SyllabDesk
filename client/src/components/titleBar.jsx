import "./component.css";
import Logo from "../assets/syllabDesk_logo_2.svg";
import TopRightBar from "./topRightBar";

import CTA_btn from "./buttons/CTA_btn";
import CTA_btn_light from "./buttons/CTA_btn_ligth";
import { useNavigate } from "react-router";
import SearchBar from "./searchBar";
import { useAuth } from "../contexts/providers/authProvider";

export default function TitleBar() {
  const {user} =  useAuth();

  const navigate = useNavigate();
  
    return (
      <header>
        <div className="logo z-90 ">
          <img src={Logo} alt="logo" className="max-w-none w-xxl object-fit" />
          <div className="logo-name hidden md:block">SyllabDesk</div>
        </div>
  <SearchBar/>
        <div>
          {user ? (
              <TopRightBar />
          ) : (
            <>
              <CTA_btn_light text={"Sign In"} onclick={()=>navigate('/auth/signin',{ replace: true })}/>
              <CTA_btn text={"Sign Up"}  onclick={()=>navigate('/auth/signup',{ replace: true })} />
            </>
          )}
        </div>{" "}
      </header>
    );
}
