import React from "react";
import Content from "./Content";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { useHistory } from "react-router";
import { useEffect } from "react";
import Cookies from "js-cookie";
function Main() {
  const [userName, setUserName] = useState(Cookies.get('userName'))
  const history = useHistory();
  function check() {
    if (userName === undefined) history.push("/login");
  }
  useEffect(() => {
    check();
  }, []);
  return (
    <>
      <Header />
      <div>
        <Sidebar />
        <Content />
      </div>
    </>
  );
}

export default Main;
