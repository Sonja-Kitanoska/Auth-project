import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

type userInfoType = {
  email: string;
  username: string;
  password: string;
};
const Signup = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<userInfoType>({
    email: '',
    username: '',
    password: '',
  });
  const { email, password, username } = userInfo;

  const handleError = (err: string) =>
    toast.error(err, {
      position: 'bottom-left',
    });

  const handleSuccess = (msg: string) =>
    toast.success(msg, {
      position: 'bottom-right',
    });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:8000/signup',
        {
          ...userInfo,
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
    setUserInfo({
      ...userInfo,
      email: '',
      password: '',
      username: '',
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };
  return (
    <div className="form_container">
      <h1 className="form_heading">Sign up</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form_div">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleChange}
          />
        </div>
        <div className="form_div">
          <label htmlFor="email">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={handleChange}
          />
        </div>
        <div className="form_div">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to={'/login'}>Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
