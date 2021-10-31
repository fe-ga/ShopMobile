import CIcon from "@coreui/icons-react";
import { CAvatar, CContainer, CHeader, CHeaderBrand, CHeaderDivider, CHeaderNav, CHeaderToggler, CNavItem, CNavLink } from "@coreui/react";
import React from "react";
import Cookies from 'js-cookie';
import { useState } from "react";
import avt from '../../assets/logo192.png'
function Header() {
  const [userName, setToken] = useState(Cookies.get('userName'))
  return (
    <CHeader position="sticky" className="mb-4 header" >
      <CContainer fluid>
        <CHeaderNav className="d-none d-md-flex me-auto">
        </CHeaderNav>
        <CHeaderNav className="ms-3" className='hd-avt' onClick={()=>{
          alert("test link account");
        }}>
        <CAvatar src={avt} />
        <p>{userName}</p>
        </CHeaderNav>
      </CContainer>
    </CHeader>
  );
}
export default Header;
