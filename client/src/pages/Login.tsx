import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

type userInfoType = {
  email: string;
  password: string;
};

interface LoginResponse {
  success: boolean;
  message: string;
}

const Login = () => {
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState<userInfoType>({
    email: '',
    password: '',
  });

  const { email, password } = userInput;

  const handleSuccess = (msg: string) => {
    toast.success(msg, {
      position: 'bottom-left',
    });
  };

  const handleError = (err: string) => {
    toast.success(err, {
      position: 'bottom-left',
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await axios.post<LoginResponse>(
        'http://localhost:8000/login',
        {
          ...userInput,
        },
        { withCredentials: true },
      );

      const { success, message } = data;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }

    setUserInput({ ...userInput, email: '', password: '' });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setUserInput({ ...userInput, [name]: value });
  };

  return (
    <>
      <div className="form_container">
        <h1 className="form_heading">Login</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form_div">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
              name="email"
              value={email}
            />
          </div>
          <div className="form_div">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter your passsword"
              onChange={handleChange}
              name="password"
              value={password}
            />
          </div>
          <button className="form_button" type="submit">
            Submit
          </button>
          <span>
            Already have an account? <Link to={'/signup'}>Signup</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
