import {
  CButton,
  CContainer,
  CFormInput,
  CFormSelect,
  CFormSwitch,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
} from "@coreui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
function AddUser() {
  const history = useHistory();
  const [Users, setUsers] = useState();
  const [Name, setName] = useState([]);
  const [Email, setEmail] = useState("");
  const [Pass, setPass] = useState("");
  const [Admin, setAdmin] = useState(true);
  const [Active, setActive] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const [visible, setVisible] = useState(false);
  const getUsers = () => {
    axios
      .get(`https://60a823f38532520017ae59e7.mockapi.io/API/User`)
      .then((res) => {
        const data = res.data;
        setUsers(data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getUsers();
  }, []);
  // useEffect(() => {
  //   setErrorEmail(errorEmail)
  //   console.log("a");
  // });
  // function validateEmail(email) {
  //   const re =
  //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return re.test(String(email).toLowerCase());
  // }
  function validatePass(pass) {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return re.test(String(pass));
  }

  async function toload() {
    history.push("/User");
    setVisible(false);
  }
  function addUser(e) {
    e.preventDefault();
    const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const id = randLetter + Date.now();

    setErrorPass("");
    if (validatePass(Pass)) {
      setErrorPass("");
      const newAccount = {
        email: Email,
        password: Pass,
        name: Name,
        admin: Admin,
        active: Active,
        id: id,
      };
      axios
        .post(
          "https://60a823f38532520017ae59e7.mockapi.io/API/User",
          newAccount
        )
        .then(setVisible(true))
        .catch((error) => console.log(error));
    } else {
      setErrorPass("Incorrect password format");
    }
  }
  return (
    <>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalBody>Add new a account</CModalBody>
        <CModalFooter className="modall">
          <CButton size="sm" color="success" onClick={() => toload()}>
            Ok
          </CButton>
        </CModalFooter>
      </CModal>
      <CContainer className="text-center ct-content">
        <form onSubmit={addUser}>
          <CTable responsive="sm" borderless>
            <CTableHead>
              <CTableHeaderCell>Add new Account</CTableHeaderCell>
            </CTableHead>
            <CTableBody>
              <CTableHeaderCell className="addbrand" scope="col">
                <CInputGroup className=" ml-3">
                  <CInputGroupText id="basic-addon1">Name</CInputGroupText>
                  <CFormInput
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    required
                    onChange={(e) => setName(e.target.value.trim())}
                  />
                </CInputGroup>
              </CTableHeaderCell>
              <CTableHeaderCell className="addbrand" scope="col">
                <CInputGroup className=" ml-3">
                  <CInputGroupText id="basic-addon1">Email</CInputGroupText>
                  <CFormInput
                    placeholder="Email"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    required
                    type="email"
                    onChange={(e) => setEmail(e.target.value.trim())}
                  />
                </CInputGroup>
              </CTableHeaderCell>
              <CTableHeaderCell className="addbrand" scope="col">
                <CInputGroup className=" ml-3">
                  <CInputGroupText id="basic-addon1">Password</CInputGroupText>
                  <CFormInput
                    placeholder="Password"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    required
                    type="password"
                    onChange={(e) => setPass(e.target.value.trim())}
                  />
                </CInputGroup>
              </CTableHeaderCell>
              <p className="errorPass">{errorPass}</p>
              <CTableHeaderCell className="addbrand" scope="col">
                <CInputGroup className=" ml-3 ct-select">
                  <CFormSwitch
                    label="Admin"
                    id="formSwitchCheckChecked"
                    checked={Admin}
                    onChange={(e) => {
                      setAdmin(e.target.checked);
                    }}
                  />
                </CInputGroup>
                <CInputGroup className="ct-select">
                  <CFormSwitch
                    label="Active"
                    id="formSwitchCheckChecked"
                    checked={Active}
                    onChange={(e) => {
                      setActive(e.target.checked);
                    }}
                  />
                </CInputGroup>
              </CTableHeaderCell>

              <CTableHeaderCell className="addbrand ct-btn" scope="col">
                <CButton color="success" type="submit">
                  Success
                </CButton>
              </CTableHeaderCell>
            </CTableBody>
          </CTable>
        </form>
      </CContainer>
    </>
  );
}

export default AddUser;
