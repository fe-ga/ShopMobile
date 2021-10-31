import {
  CButton,
  CContainer,
  CFormCheck,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
function Brand() {
  const history = useHistory();
  const [brand, setBrand] = useState();
  const [keySearch, setKeySearch] = useState("");
  function getData() {
    axios
      .get(`https://60a823f38532520017ae59e7.mockapi.io/API/Brand`)
      .then((res) => {
        const data = res.data;
        setBrand(data);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    // setTimeout(function() {
    getData();
    // }, 1000);
  }, []);

  // delete item
  const deleteBrand = (id) => {
    axios
      .delete(`https://60a823f38532520017ae59e7.mockapi.io/API/Brand/${id}`)
      .then(() => {
        getData();
      })
      .catch((error) => console.log(error));
  };

  const editBrand = (item) => {
    history.push({
      pathname: "/brand/edit",
      state: {
        item: item,
      },
    });
  };
  const SeardBrand = () => {
    axios
      .get(
        `https://60a823f38532520017ae59e7.mockapi.io/API/Brand/?Name=${keySearch}`
      )
      .then((res) => {
        const data = res.data;
        setBrand(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <CContainer className="text-center ct-content">
      <CTable responsive="sm" borderless className="ct-search">
        <CTableBody>
          <CTableHeaderCell scope="col">
            <CInputGroup className="mb-3 ml-3">
              <CButton
                className="btn"
                color="info"
                onClick={() => {
                  history.push("/Brand/Add");
                }}
              >
                Add
              </CButton>
              <CFormInput
                placeholder="Name of brand"
                aria-label="Name of brand"
                aria-describedby="basic-addon2"
                value={keySearch}
                onChange={(e) => {
                  setKeySearch(e.target.value.trim());
                }}
              />
              <CInputGroupText
                id="basic-addon2"
                className="editbrand"
                onClick={() => SeardBrand()}
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
            <CTableHeaderCell scope="col">Name Brand</CTableHeaderCell>
            <CTableHeaderCell scope="col"> Edit </CTableHeaderCell>
            <CTableHeaderCell scope="col">Delete</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {brand != undefined &&
            brand.map((item, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                  <CTableDataCell>{item.Brand}</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="secondary" onClick={() => editBrand(item)}>
                      Edit
                    </CButton>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="secondary"
                      onClick={() => deleteBrand(item.id)}
                    >
                      Delete
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              );
            })}
        </CTableBody>
      </CTable>
    </CContainer>
  );
}

export default Brand;
