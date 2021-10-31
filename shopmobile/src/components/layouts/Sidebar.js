import React from "react";
import {
  CBadge,
  CNavGroup,
  CNavItem,
  CNavTitle,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom";
import * as icon from "@coreui/icons";
import Cookies from "js-cookie";
import { useHistory } from "react-router";

function Sidebar() {
  const history = useHistory();
  const Logout = () => {
    Cookies.remove("user");
    Cookies.remove('token')
    Cookies.remove('user')
    Cookies.remove('userName')
    history.push("/login");
  };
  return (
    <CSidebar position="fixed" className="sidebar">
      <CSidebarBrand className='logo' onClick={()=>{ history.push("/")}}>
        <img src="./logo192.png" height={48} alt="" />
        Shop Mobile{" "}
      </CSidebarBrand>
      <CSidebarNav>
        <CNavItem className="ct-item-nav">
          <Link to="/brand">Brand</Link>
        </CNavItem>
        <CNavItem className="ct-item-nav">
          <Link to="/product">Product</Link>
        </CNavItem>
        <CNavItem className="ct-item-nav">
          <Link to="/export">Export Product</Link>
        </CNavItem>
        <CNavItem className="ct-item-nav">
          <Link to="/import">Import Product</Link>
        </CNavItem>
        <CNavItem className="ct-item-nav">
          <Link to="/User">List User</Link>
        </CNavItem>
        {/* <CNavItem className='ct-item-nav'  onClick={() => Logout()}  className="text-center"> 
          <CIcon icon={icon.cilAccountLogout} size="xxl" /> Logout
          <Link > Logout</Link>
        </CNavItem> */}

        <CNavItem className="ct-item-nav" onClick={() => Logout()}>
         <Link onClick={() => Logout()}  to="/login">  LogOut</Link>
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  );
}

export default Sidebar;
