import { auth } from "../configs/firebase";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  console.log(auth?.currentUser?.email);
  
  const createAccount = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div className="position-absolute top-50 start-50 translate-middle text-center border p-2" style={{width:"500px"}}>
      <h3>Sign Up</h3>
      <input placeholder="Email.." className="form-control" onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Password.."
        className="form-control mt-2"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-primary form-control mt-2" onClick={createAccount}> SignUp</button>
      <button className="btn btn-light form-control mt-2" onClick={()=>{navigate('/login')}}> Back</button>
      
    </div>
    
  );
};
