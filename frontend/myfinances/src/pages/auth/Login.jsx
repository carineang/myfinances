import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/inputs/Input';
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/helper';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // handle login form submit
  const handleLogin = async (e) => {
    e.preventDefault();
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
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please enter your details to login</p>
        <form onSubmit={handleLogin}>
          <Input value={email} 
            onChange={handleEmailChange}
            label='Email Address'
            placeholder='john@example.com'
            type='text'/>

          <Input value={password} 
            onChange={handlePasswordChange}
            label='Password'
            placeholder='Min 8 characters'
            type='password'/>

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type='submit' className='btn-primary'>
            Login
          </button>

          <p className='tex-[13px] text-slate-800 mt-3'>
            Don't have an account? {" "}
            <Link className='font-medium text-primary underline' to='/signup'>
              SignUp
            </Link>
          </p>
        </form>      
      </div>
    </AuthLayout>
  )
}

export default Login