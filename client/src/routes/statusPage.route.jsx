import { Route } from "react-router";
import ErrorPage from "../pages/statusPage/error";
import SuccessPage from "../pages/statusPage/success";
import NotFound from "../pages/statusPage/notFound";
import NotAuthorized from "../pages/statusPage/notAuthorized";
const statusPageRoute = (
  <>
    <Route path="/Error/:type" element={<ErrorPage />} />
    <Route path="/success/:type" element={<SuccessPage />} />
    <Route path="/notAuthorized" element={<NotAuthorized />} />
    <Route path="*" element={<NotFound message={"The page you are trying to access does not exist or has been moved."}/>} />
  </>
);

export default statusPageRoute;
