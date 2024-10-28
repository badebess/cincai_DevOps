import { auth, googleProvider } from "../configs/firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { authService } from "../configs/auth";
import { Button } from "antd";
import 'bootstrap/dist/css/bootstrap.css';
import { GoogleOutlined } from "@ant-design/icons";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const {idToken, refreshToken} = (result._tokenResponse);
      authService.storeCredentialsToCookie({idToken, refreshToken});
      navigate('/');
    } catch (err) {
      alert(`Your email and password is doesn't match !`)
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const {oauthAccessToken, refreshToken} = (result._tokenResponse);
      authService.storeCredentialsToCookie({oauthAccessToken, refreshToken});
      navigate('/');
    } catch (err) {
        alert(`Your email and password is doesn't match !` );
      console.error(err);
    }
  };

  return (
    <div>
      <div className="position-absolute top-50 start-50 translate-middle text-center border p-2" style={{width:"500px"}}>
        <h3>Login</h3>
        <form>
          <input placeholder="Email.." className="form-control" onChange={(e) => setEmail(e.target.value)} />
          <input
            type="password"
            placeholder="Password.."
            className="form-control mt-1"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-primary form-control mt-2" onClick={(e)=>signIn(e)}> SignIn</button>
          <Button className="btn btn-primary form-control mt-2" onClick={signInWithGoogle} icon={<GoogleOutlined />}> SignIn with google</Button>
        </form>

      </div>
    </div>
  );
};
