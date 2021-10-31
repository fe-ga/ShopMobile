import {
  CButton,
  CContainer,
  CFormInput,
  CFormSelect,
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
import Cookies from "js-cookie";
function AddImport() {
  const history = useHistory();
  const [Product, setProduct] = useState("");
  const [Products, setProducts] = useState([]);
  const [Name, setName] = useState([]);
  const [Brand, setBrand] = useState("");
  const [Capacity, setCapacity] = useState("");
  const [Ram, setRam] = useState("");
  const [Color, setColor] = useState("");
  const [Count, setCount] = useState("");
  const [idUser, setIDUser] = useState();

  const [visible, setVisible] = useState(false);
  const getProducts = () => {
    axios
      .get(`https://60a823f38532520017ae59e7.mockapi.io/API/Product`)
      .then((res) => {
        const data = res.data;
        console.log(data);
        setProducts(data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getProducts();
    setIDUser(Cookies.get("id"))
  }, []);
  const addProduct = (e) => {
    e.preventDefault();


    const today = new Date();
    const dateNow = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();

    const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const id = randLetter + Date.now();
    let brand =-1;
    Products.map((pro)=>{
      if(Product == pro.id)
      brand = pro.Brand
    })
    const newImport = {
      id: id,
      date: dateNow,
      idProduct: Product,
      count: Count,
      idUser: idUser,
      idBrand: brand,
      id: id,
    };
    axios
      .post(
        "https://60a823f38532520017ae59e7.mockapi.io/API/ImportProduct",
        newImport
      )
      .then(setVisible(true))
      .catch((error) => console.log(error));
  };
  async function toload() {
    setVisible(false);
    history.push("/import");
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
        <form onSubmit={addProduct}>
          <CTable responsive="sm" borderless>
            <CTableHead>
              <CTableHeaderCell>Add new Product</CTableHeaderCell>
            </CTableHead>
            <CTableBody>
              <CTableHeaderCell className="addbrand" scope="col">
                <CInputGroup className=" ml-3 ">
                  <CFormSelect
                    /*size="sm" */
                    className="mb-3"
                    aria-label="Small select example"
                    required
                    onChange={(e) => {
                      setProduct(e.target.value);
                    }}
                  >
                    <option value=""> Select a Product</option>
                    {Products !== undefined &&
                      Products.map((product, index) => {
                        return (
                          <option value={product.id} key={index}>
                            Name: {product.Name} - Capacity: {product.Capacity} - Ram:
                            {product.Ram} - Color: {product.Color}
                          </option>
                        );
                      })}
                  </CFormSelect>
                </CInputGroup>
              </CTableHeaderCell>
              <CTableHeaderCell className="addbrand" scope="col">
                <CInputGroup className=" ml-3" /*size="sm" */>
                  <CInputGroupText id="basic-addon1">Count</CInputGroupText>
                  <CFormInput
                    placeholder="Count"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    required
                    onChange={(e) => setCount(e.target.value.trim())}
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

export default AddImport;
