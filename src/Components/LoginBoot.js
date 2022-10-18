import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import app from "../Firebase/Firebase.init";
const auth = getAuth(app);
const LoginBoot = () => {
    const [success, setSuccess] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const handleLogIn = event => {
        event.preventDefault();
        setSuccess(false);
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)
        signInWithEmailAndPassword(auth, email, password)
        .then (result => {
            const user = result.user;
            setSuccess(true);
            form.reset();
            console.log(user);
        })
        .catch(error => {
            console.log('error', error);
        })
    }
    const handleForgetPassword = () => {
        if(!userEmail) {
            alert('Please enter your email');
            return;
            
        }
        sendPasswordResetEmail(auth, userEmail)
  .then(() => {
    alert('Password reset email sent!')
    // ..
  })
  .catch((error) => {
   console.error('error', error);
    // ..
  });
    }
    const handleEmailBlur = event => {
        const email = event.target.value;
        setUserEmail(email);
        console.log(email);
    }
  return (
    <div className="w-50 mx-auto">
    <form onSubmit={handleLogIn}>
        
      <h3 className="text-success">Please Login</h3>
      <div className="col">
        <div className="col p-2">
          <input
          onBlur={handleEmailBlur}
          name="email"
            type="email"
            className="form-control"
            placeholder="Email Address"
            required
          />
        </div>
        <div className="col p-2">
          <input
          name="password"
            type="password"
            className="form-control"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="btn btn-success p-2">Login</button>

      </div>
      </form>
      {success && <p>Succesfully Login</p>}
      <p><small>New to this website?</small> <Link to='/register'>Register</Link></p>
      <p><small>Forget Password<button onClick={handleForgetPassword} type="button" className="btn btn-link">Reset</button>
</small></p>
    </div>
    
  );
};

export default LoginBoot;
