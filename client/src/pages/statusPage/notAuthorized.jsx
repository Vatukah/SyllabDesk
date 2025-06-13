import notAuthorized from "../../assets/401_Error_Unauthorized.svg";
export default function NotAuthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <img src={notAuthorized} alt="not found image" className="w-1/4" />
      <h2 className="font-bold text-lg"> Unauthorized Access</h2>
      <p>You don’t have permission to view this page.</p>
      <p>
        Please log in with the correct credentials or return to the{" "}
        <a href="/" className="text-blue-400 ">homepage</a>.
      </p>
    </div>
  );
}
