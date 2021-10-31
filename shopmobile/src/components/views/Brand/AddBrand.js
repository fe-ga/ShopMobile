import {
  CButton,
  CContainer,
  CFormInput,
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
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
function AddBrand() {
  const [Brand, setName] = useState("");
  const history = useHistory();
  const [visible, setVisible] = useState(false);

  const addBrand = () => {
    const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const id = randLetter + Date.now();
    const newBrand = {
      id: id,
      Brand: Brand,
    };
    console.log(newBrand);
    axios
      .post(`https://60a823f38532520017ae59e7.mockapi.io/API/Brand`, newBrand)
      .then(setVisible(true))
      .catch((error) => console.log(error));
  };
  async function toload() {
    setVisible(false);
    history.push("/brand");
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
        <CTable responsive="sm" borderless>
          <CTableHead>
            <CTableHeaderCell>Add new brand</CTableHeaderCell>
          </CTableHead>
          <CTableBody>
            <CTableHeaderCell className="addbrand" scope="col">
              <CInputGroup className="mb-3 ml-3">
                <CFormInput
                  placeholder="Name of brand"
                  aria-label="Name of brand"
                  aria-describedby="basic-addon2"
                  value={Brand}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <CInputGroupText
                  id="basic-addon2"
                  className="editbrand"
                  onClick={() => addBrand()}
                >
                  Add
                </CInputGroupText>
              </CInputGroup>
            </CTableHeaderCell>
          </CTableBody>
        </CTable>
      </CContainer>
    </>
  );
}

export default AddBrand;
