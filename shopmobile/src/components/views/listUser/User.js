import {
  CButton,
  CContainer,
  CFormCheck,
  CFormInput,
  CFormSwitch,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CToast,
  CToastBody,
  CToastClose,
  CToaster,
  CToastHeader,
} from "@coreui/react";
import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import Cookies from "js-cookie";
import { useRef } from "react";
function User() {
  const history = useHistory();
  const [users, setUsers] = useState();
  const [id, setID] = useState(Cookies.get("id"));
  const [user, setUser] = useState("");
  const [Disable, setDisable] = useState("enable");
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState();
  const [keySearch, setKeySearch] = useState("");


  // const [keySearch, setKeySearch] = useState("")
  async function getData() {
    await axios
      .get(`https://60a823f38532520017ae59e7.mockapi.io/API/User`)
      .then((res) => {
        const data = res.data;

        setUsers(data);
        // data.forEach((user) => {
        //   if (user.id === id) {
        //     setUser(user);
        //   }
        // })
      })
      .catch((error) => console.log(error));
  }
  async function getUser() {
    axios
      .get(`https://60a823f38532520017ae59e7.mockapi.io/API/User/${id}`)
      .then((res) => {
        const data = res.data;
        setUser(data);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getUser();
  }, []);
  // change active item
  const changeActive = (item) => {
    axios
      .put(`https://60a823f38532520017ae59e7.mockapi.io/API/User/${item.id}/`, {
        active: !item.active,
      })
      .then(
        // toload()
        setVisible(true)
      )
      .catch((error) => console.log(error));
  };

  async function toload() {
    await getData();
    setVisible(false);
  }
  const SeardUser=()=>{
    axios
    .get(`https://60a823f38532520017ae59e7.mockapi.io/API/User/?name=${keySearch}`)
    .then((res) => {
      const data = res.data;
      setUsers(data);
    })
    .catch((error) => console.log(error));
   }
  return (
    <>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalBody>Change acive account</CModalBody>
        <CModalFooter className="modall" >
          <CButton size="sm"  color="success" onClick={() => toload()}>
            Ok
          </CButton>
        </CModalFooter>
      </CModal>
      <CContainer className="text-center ct-content">
        <CTable responsive="sm" borderless className="ct-search">
          <CTableBody>
            <CTableHeaderCell scope="col">
              <CInputGroup className="mb-3 ml-3">
                <CButton
                  className="btn"
                  color="info"
                  disabled={!user.admin}
                  onClick={() => {
                    history.push("/User/Add");
                  }}
                >
                  Add
                </CButton>
                <CFormInput
                  placeholder="Name of user"
                  aria-label="Name of brand"
                  aria-describedby="basic-addon2"
                    value={keySearch}
                    onChange={(e)=>{
                      setKeySearch(e.target.value.trim())
                    }}
                />
                <CInputGroupText
                  id="basic-addon2"
                  className="editbrand"
                  onClick={()=>SeardUser()}
                >
                  Search
                </CInputGroupText>
              </CInputGroup>
            </CTableHeaderCell>
          </CTableBody>
        </CTable>
        <CTable responsive="sm">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">STT</CTableHeaderCell>
              <CTableHeaderCell scope="col">Name </CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              <CTableHeaderCell scope="col">Admin</CTableHeaderCell>
              <CTableHeaderCell scope="col">Active</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {users != undefined &&
              users.map((item, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                    <CTableDataCell>{item.name}</CTableDataCell>
                    <CTableDataCell>{item.email}</CTableDataCell>
                    <CTableDataCell>
                      <CFormSwitch
                        id="formSwitchCheckChecked"
                        disabled
                        defaultChecked={item.admin}
                      />{" "}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormSwitch
                        id="formSwitchCheckChecked"
                        disabled
                        checked={item.active}
                      />
                      {}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="danger"
                        onClick={() => {
                          changeActive(item);
                        }}
                        disabled={!user.admin}
                      > 
                        {item.active === true ? "Disable" : "Enable"}
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                );
              })}
          </CTableBody>
        </CTable>
      </CContainer>
    </>
  );
}

export default User;
