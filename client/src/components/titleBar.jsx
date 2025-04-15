import "./component.css";
import Logo from "../assets/syllabDesk_logo_2.svg";
import TopRightBar from "./topRightBar";
import PrivateRoute from "./privateRoute";
import CTA_btn from "./buttons/CTA_btn";
import CTA_btn_light from "./buttons/CTA_btn_ligth";
import { useNavigate } from "react-router";

export default function TitleBar({ role }) {

  const navigate = useNavigate();
  if (role === "landing") {
    return (
      <header>
        <div className="logo ">
          <img src={Logo} alt="logo" />
          <div className="logo-name">SyllabDesk</div>
        </div>
        <div>
          {false ? (
            <CTA_btn text={"Dashboard"} />
          ) : (
            <>
              <CTA_btn_light text={"Sign In"} onclick={()=>navigate('/auth/signin',{ replace: true })}/>
              <CTA_btn text={"Sign Up"}  onclick={()=>navigate('/auth/signup',{ replace: true })} />
            </>
          )}
        </div>{" "}
      </header>
    );
  } else {
    return (
      <header>
        <div className="logo ">
          <img src={Logo} alt="logo" />
          <div className="logo-name">SyllabDesk</div>
        </div>
        <TopRightBar />
      </header>
    );
  }
}
