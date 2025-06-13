import { Navigate,useParams } from 'react-router';
import okImg from '../../assets/Ok-pana.svg'
export default function SuccessPage() {
  const param = useParams();
  const reason = param.type;
  

  const messages = {
    successfull_login: {
        head:"Account Created!!!",
        body:"Your account is created successfully.Please check your mail.",
    }
  };

  const message = messages[reason] || Navigate('http://localhost:5173/');

  return (
    <div className="flex items-center justify-center min-h-screen ">
     
      <div className="w-full max-w-3xl px-6 py-12 mx-auto text-center">
        <h1 className="text-3xl font-bold text-accent">{message.head}</h1>
      
        <img src={okImg} alt={reason} className='w-[60%]  mx-auto bg-blend-multiply'/>
        <p className="mt-4 text-gray-600">{message.body}</p>
        
      </div>
    </div>
  );
}
