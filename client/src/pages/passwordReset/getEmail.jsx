import { useState } from "react";
import illustration from "../../assets/reset_password.svg";
import {
  showLoadingToast,
  toastWithServerMessage,
} from "../../services/toastify.js";
export default function GetEmail() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleGetEmail = async (e) => {
    e.preventDefault();

    // const res =  fetch("http://localhost:5008/reset_link", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email:email }),
    // });
    try {
      setLoading(true);
      await toastWithServerMessage(
        fetch("http://localhost:5008/reset_link", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email }),
        })
      );
    } catch (error) {
    } finally {
      setLoading(false);
    }

    // if (res.status !== 200) {
    //   const data = await res.json();
    //   console.log(data);
    //   return;
    // }

    // const data = await res.json();
    // console.log(data);
  };
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className=" w-full max-w-[30rem] h-auto px-4 py-8 rounded-md primary-bg">
        <p className="text-center">
          Enter your email address below, and we’ll send you a link to reset it.
        </p>
        <form
          onSubmit={handleGetEmail}
          className="flex flex-col r w-[80%] mx-auto mt-4 gap-2"
        >
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="userEmail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="primary-bg-dark p-1 rounded-sm outline-none border-none text-accent"
            placeholder="example@gmail.com"
          />
          <input
            type="submit"
            value={!loading ? "Send Link" : "Sending..."}
            className={`${loading?"opacity-50":"opacity-100"} accent rounded-sm text-primary font-bold`}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
}
