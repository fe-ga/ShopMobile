import React from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useEffect } from "react";
import Cookies from "js-cookie";
function Login() {
  const history = useHistory();
  const [errorAcc, setErrorAcc] = useState("");
  const [Email, setEmail] = useState("");
  const [Pass, setPass] = useState("");
  const [user, setUser] = useState({});
  function getData() {
    axios
      .post(`https://nodejs-api-thaik.herokuapp.com/api/user/login`)
      .then((res) => {
        const user = res.data;
        setUser(user);
      })
      .catch((error) => console.log(error));
  }
  // useEffect(() => {
  //   getData();
  // }, []);
  const login = (e) => {
    e.preventDefault();
    //   axios.post('https://nodejs-api-thaik.herokuapp.com/api/user/login', {
    //     password: Pass,
    //     email: Email
    //   })
    //   .then((response) => {
    //     if(response.data.token === undefined) setErrorAcc(response.data.message)
    //     else{

    //       Cookies.set('token',response.data.token)
    //       Cookies.set('user',response.data.data)
    //       Cookies.set('userName',response.data.data[0].name)
    //       history.push('/')
    //     }
    //   }, (error) => {
    //     console.log(error);
    //   });
    // };
    axios
      .get(
        `https://60a823f38532520017ae59e7.mockapi.io/API/User?email=${Email}&password=${Pass}`
      )
      .then(
        (res) => {
          if (res.data.length > 0) {
            let data = res.data[0];
            if (data.email === Email && data.password === Pass) {
              if (data.active === true) {
                Cookies.set("user", data);
                Cookies.set("userName", data.name);
                Cookies.set("id", data.id);
                setErrorAcc("");
                history.push("/");
              }
              else  setErrorAcc("Tài khoản đã bị khóa.");
            } else setErrorAcc("Tài khoản hoặc mật khẩu không chính xác.");
          } else setErrorAcc("Tài khoản hoặc mật khẩu không chính xác.");
        },
        (error) => {
          console.log(error);
        }
      );
  };
  return (
    <body className="login text-center">
      <div className="container">
        <form onSubmit={login}>
          <div className="title">Login</div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Enter your Email"
              required
              value={Email}
              autoComplete={true}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <div className="underline"></div>
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Enter your Password"
              required
              value={Pass}
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />
            <p className="error">{errorAcc}</p>
            <div className="underline"></div>
          </div>
          <div className="input-box button">
            <input type="submit" value="Login" />
          </div>
        </form>
        <div className="option">or Connect with Social Media</div>
        <div className="twitter">
          <a href="">
            <i className="fab fa-twitter"></i>Login with Twitter
          </a>
        </div>
        <div className="facebook">
          <a>
            <i className="fab fa-facebook-f"></i>Login with Facebook
          </a>
        </div>
      </div>
    </body>
  );
}
export default Login;
