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
function ImportProduct() {
  const history = useHistory();
  const [products, setProducts] = useState();
  const [ImportProducts, setImportProducts] = useState();
  const [brands, setBrands] = useState();
  const [keySearch, setKeySearch] = useState("");
  const [idBrand, setID] = useState();
  const [users, setUsers] = useState()
  function getProducts() {
    axios
      .get(`https://60a823f38532520017ae59e7.mockapi.io/API/Product`)
      .then((res) => {
        const data = res.data;
        setProducts(data);
      })
      .catch((error) => console.log(error));
  }

  const getBrands = () => {
    axios
      .get(`https://60a823f38532520017ae59e7.mockapi.io/API/Brand`)
      .then((res) => {
        const data = res.data;
        setBrands(data);
      })
      .catch((error) => console.log(error));
  };
  const getUsers = () => {
    axios
      .get(`https://60a823f38532520017ae59e7.mockapi.io/API/User`)
      .then((res) => {
        const data = res.data;
        setUsers(data);
      })
      .catch((error) => console.log(error));
  };
  function getImportProducts() {
    axios
      .get(`https://60a823f38532520017ae59e7.mockapi.io/API/ImportProduct`)
      .then((res) => {
        const data = res.data;
        setImportProducts(data);
      })
      .catch((error) => console.log(error));
  }
  function getData() {
    getProducts();
    getImportProducts();
    getBrands();
    getUsers();
  }
  useEffect(() => {
    getData();
  }, []);

  const SeardProduct = () => {
    axios
      .get(
        `https://60a823f38532520017ae59e7.mockapi.io/API/Product/?Name=${keySearch}`
      )
      .then((res) => {
        const data = res.data;
        console.log(res);
        setProducts(data);
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <CContainer className="text-center ct-content">
        <CTable responsive="sm" borderless className="ct-search">
          <CTableBody>
            <CTableHeaderCell scope="col">
              <CInputGroup className="mb-3 ml-3">
                <CButton
                  className="btn"
                  color="info"
                  onClick={() => {
                    history.push("/import/add");
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
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Color</CTableHeaderCell>
              <CTableHeaderCell scope="col">Ram</CTableHeaderCell>
              <CTableHeaderCell scope="col">Capacity</CTableHeaderCell>
              <CTableHeaderCell scope="col">Brand</CTableHeaderCell>

              <CTableHeaderCell scope="col">Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">User Add</CTableHeaderCell>
              <CTableHeaderCell scope="col">Count</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {ImportProducts != undefined &&
              ImportProducts.map((item, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                    {
                    products !== undefined &&
                      products.map((product) => {
                       
                        if (product.id == item.idProduct)
                          return (
                            <>
                              <CTableDataCell>{product.Name}</CTableDataCell>
                              <CTableDataCell>{product.Color}</CTableDataCell>
                              <CTableDataCell>{product.Ram}</CTableDataCell>
                              <CTableDataCell>
                                {product.Capacity}
                              </CTableDataCell>
                              {/* <CTableDataCell>{product.Brand}</CTableDataCell> */}
                            </>
                          );
                      })}
                    <CTableDataCell>
                      {brands !== undefined &&
                        brands.map((it) => {
                          if (item.idBrand == it.id) return it.Brand;
                        })}
                    </CTableDataCell>
                    <CTableDataCell>{item.date}</CTableDataCell>
                    <CTableDataCell>
                      {users !== undefined &&
                        users.map((user) => {
                          if (item.idUser == user.id) return user.name;
                        })}
                    </CTableDataCell>
                   

                    <CTableDataCell>{item.count}</CTableDataCell>
                  </CTableRow>
                );
              })}
          </CTableBody>
        </CTable>
      </CContainer>
    </>
  );
}
export default ImportProduct;
