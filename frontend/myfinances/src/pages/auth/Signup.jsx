import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/inputs/Input';
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/helper';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Please enter your name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password.");
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
  }

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (error && value.trim().length > 0) {
      setError(null);
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (error && validateEmail(value)) {
      setError(null);
    }
  };
  
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (error && value.trim().length > 0) {
      setError(null);
    }
  };

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us today by entering your details below.</p>
        <form onSubmit={handleSignUp}>
          <div className='grid grid-cols-1 md: grid-cols-2 gap-4'>
            <Input value={name} 
              onChange={handleNameChange}
              label='Name'
              placeholder='John'
              type='text'/>

              <Input value={email} 
              onChange={handleEmailChange}
              label='Email Address'
              placeholder='john@example.com'
              type='text'/>

            <div className='col-span-2'>  
              <Input value={password} 
                onChange={handlePasswordChange}
                label='Password'
                placeholder='Min 8 characters'
                type='password'/>
            </div>
          </div>

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
          
          <button type='submit' className='btn-primary'>
            Sign Up
          </button>
          
          <p className='tex-[13px] text-slate-800 mt-3'>
            Have an account? {" "}
            <Link className='font-medium text-primary underline' to='/login'>
              Login
            </Link>
          </p>
        </form>      
      </div>
    </AuthLayout>
  )
}

export default Signup