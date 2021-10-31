import {
  CButton,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
} from "@coreui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
function EditBrand(props) {
  const history= useHistory()
  const [item] = useState(props.location.state.item);
  const [brand, setBrand] = useState("");
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setBrand(item.Brand);
  }, []);
  const editBrand = () => {
    const Item = {
      id: item.id,
      Brand: brand,
    };
    axios
      .put(
        `https://60a823f38532520017ae59e7.mockapi.io/API/Brand/${Item.id}/`,
        Item
      )
      .then(
        setVisible(true),
        
      )
      .catch((error) => console.log(error));
     
  };
  const toBrand=()=>{
    setVisible(false)
    history.push("/brand")
  }
  return (
    < >
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Notification</CModalTitle>
        </CModalHeader>
        <CModalBody>Item updated</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => toBrand()}>
            Ok
          </CButton>
        </CModalFooter>
      </CModal>
      <CContainer className="text-center ct-content">
        <CTable responsive="sm" borderless>
          <CTableHead>
            <CTableHeaderCell>Edit name of brand</CTableHeaderCell>
          </CTableHead>
          <CTableBody>
            <CTableHeaderCell scope="col">
              <CInputGroup className="mb-3 ml-3">
                <CFormInput
                  placeholder="Name of brand"
                  aria-label="Name of brand"
                  aria-describedby="basic-addon2"
                  value={brand}
                  onChange={(e) => {
                    setBrand(e.target.value);
                  }}
                />
                <CInputGroupText
                  id="basic-addon2"
                  className="editbrand"
                  onClick={() => editBrand()}
                >
                  Save
                </CInputGroupText>
              </CInputGroup>
            </CTableHeaderCell>
          </CTableBody>
        </CTable>
      </CContainer>
    </>
  );
}

export default EditBrand;
