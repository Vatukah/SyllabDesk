import { useLocation,useParams } from 'react-router';
import errorImg from '../../assets/errorImg.png'
export default function ErrorPage() {
  const param = useParams();
  const reason = param.type;
  

  const messages = {
    no_token: 'Token was missing from the request.',
    unauthorized: 'Session expired or token is invalid. Please sign in again.',
    default: 'Something went wrong. Please try again.',
  };

  const message = messages[reason] || messages.default;

  return (
    <div className="flex items-center justify-center min-h-screen ">
     
      <div className="w-full max-w-3xl px-6 py-12 mx-auto text-center">
        <h1 className="text-3xl font-bold text-accent">{reason}</h1>
      
        <img src={errorImg} alt={message} className='w-[60%]  mx-auto bg-blend-multiply'/>
        <p className="mt-4 text-gray-600">{message}</p>
        <a
          href="/auth/signin"
          className="inline-block mt-6 accent hover:accent-light text-white py-2 px-4 rounded-full"
        >
          Sign In
        </a>
      </div>
    </div>
  );
}
