import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import app from './../Firebase/Firebase.init';
import { Link } from 'react-router-dom';
const auth = getAuth(app);

const RegisterReactBootstrap = () => {
    
    //password error handleRegister error handle//

    const [passwordError, setPasswordError]= useState('');
    const [success,setSuccess] = useState(false);
    const handleRegister = event => {
        setSuccess(false)
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;  
        const password = form.password.value;
        console.log(email, password);
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setPasswordError('Password must contain at least one letter.');
            return;
        }
        if(password.length<6){
            setPasswordError('Password must six be creater.');
            return;
        }
       
        setPasswordError('')
        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess(true);
                form.reset();
                verifyEmail();
                updateUserName(name);
        })
        .catch (error => {
            console.log('error:', error);
            setPasswordError(error.message)
        })
    }
    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
        .then ( () => {
            alert('verifyEmail successfully sent');
        })
    }

    const updateUserName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        })
        .then ( () => { 
            alert('displayName updated successfully');
        })
    }

    //endpoint//
    return (
        <div>
            <Form className='w-50 m-auto' onSubmit={handleRegister}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Your Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" name='name' required/>
        <Form.Text className="text-muted">
          We'll never share your name with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' required/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <p className='text-danger'>{passwordError}</p>
      {success && <p className='text-primary'>Successful</p>}
      <Button variant="primary" type="submit">
        Register
      </Button>
      <p><small>Already have an account?</small> <Link to='/login'>Login</Link></p>
    </Form>
    
   
        </div>
    );
};

export default RegisterReactBootstrap;