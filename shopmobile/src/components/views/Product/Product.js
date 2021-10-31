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
function Product() {
  const history = useHistory();
  const [products, setProducts] = useState();
  const [keySearch, setKeySearch] = useState("");
  const [Brands, setBrands] = useState([]);

  const getBrands = () => {
    axios
      .get(`https://60a823f38532520017ae59e7.mockapi.io/API/Brand`)
      .then((res) => {
        const data = res.data;
        setBrands(data);
      })
      .catch((error) => console.log(error));
  };

  function getData() {
    axios
      .get(`https://60a823f38532520017ae59e7.mockapi.io/API/Product`)
      .then((res) => {
        const data = res.data;
        setProducts(data);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getData();
    getBrands();
  }, []);

  // delete item
  const deleteProduct = (id) => {
    axios
      .delete(`https://60a823f38532520017ae59e7.mockapi.io/API/Product/${id}`)
      .then(() => {
        getData();
      })
      .catch((error) => console.log(error));
  };

  const editProduct = (item) => {
    history.push({
      pathname: "/product/edit",
      state: {
        item: item,
      },
    });
  };
  const SeardProduct = () => {
    axios
      .get(
        `https://60a823f38532520017ae59e7.mockapi.io/API/Product/?Name=${keySearch}`
      )
      .then((res) => {
        const data = res.data;
        setProducts(data);
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
                  history.push("/Product/add");
                }}
              >
                Add
              </CButton>
              <CFormInput
                placeholder="Name of product"
                aria-label="Name of product"
                aria-describedby="basic-addon2"
                value={keySearch}
                onChange={(e) => {
                  setKeySearch(e.target.value.trim());
                }}
              />
              <CInputGroupText
                id="basic-addon2"
                className="editbrand"
                onClick={() => SeardProduct()}
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
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Brand</CTableHeaderCell>
            <CTableHeaderCell>Capacity</CTableHeaderCell>
            <CTableHeaderCell>Ram</CTableHeaderCell>
            <CTableHeaderCell>Color</CTableHeaderCell>
            <CTableHeaderCell>Quantity</CTableHeaderCell>
            <CTableHeaderCell>Edit</CTableHeaderCell>
            <CTableHeaderCell>Delete</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {products != undefined &&
            products.map((item, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                  <CTableDataCell>{item.Name}</CTableDataCell>
                  <CTableDataCell>
                    {
                      Brands.map((it)=>{
                        if(item.Brand == it.id)
                        return (it.Brand)
                      })
                    }
                    </CTableDataCell>
                  <CTableDataCell>{item.Capacity}</CTableDataCell>
                  <CTableDataCell>{item.Ram}</CTableDataCell>
                  <CTableDataCell>{item.Color}</CTableDataCell>
                  <CTableDataCell>{item.Quantity}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="secondary"
                      onClick={() => editProduct(item)}
                    >
                      Edit
                    </CButton>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="secondary"
                      onClick={() => deleteProduct(item.id)}
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

export default Product;
