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
function AddProduct() {
  const history =useHistory()
  const [Product, setProduct] = useState("");
  const [Brands, setBrands] = useState([]);
  const [Name, setName] = useState([]);
  const [Brand, setBrand] = useState("");
  const [Capacity, setCapacity] = useState("");
  const [Ram, setRam] = useState("");
  const [Color, setColor] = useState("");
  const [visible, setVisible] = useState(false);
  const getBrands=()=>{
    axios
    .get(`https://60a823f38532520017ae59e7.mockapi.io/API/Brand`)
    .then((res) => {
      const data = res.data;
      setBrands(data);
    })
    .catch((error) => console.log(error));
  };
  useEffect(()=>{
      getBrands()
  },[])
  const addProduct = (e) => {
    e.preventDefault();
    const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const id = randLetter + Date.now();
    const newProduct = {
      id: id,
      Name: Name,
      Brand: Brand ,
      Capacity: Capacity,
      Ram: Ram,
      Color: Color,
      Quantity:0,
    };
       axios.post(
        'https://60a823f38532520017ae59e7.mockapi.io/API/Product',
        newProduct
      )
      .then(
        setVisible(true)
      )
      .catch((error) => console.log(error));
  };
  async function toload() {
    setVisible(false)
    history.push("/product")

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
            <CInputGroup className=" ml-3">
              <CInputGroupText id="basic-addon1">Name</CInputGroupText>
              <CFormInput
                placeholder="Product name"
                aria-label="Username"
                aria-describedby="basic-addon1"
                required
                onChange={(e)=>setName(e.target.value.trim())}
              />
            </CInputGroup>
          </CTableHeaderCell>
          <CTableHeaderCell className="addbrand" scope="col">
            <CInputGroup className=" ml-3 ct-select">
              <CFormSelect
                size="sm"
                className="mb-3"
                aria-label="Small select example"
                required
                onChange={(e)=>{setBrand(e.target.value)}}
              >
                <option  value=""  > Select a Brand</option>
                {
                  Brands !== undefined && Brands.map((brand, index)=>{
                    return(
                      <option value={brand.id} key={index}>{brand.Brand}</option>
                    )
                  })
                }
              </CFormSelect>
            </CInputGroup>
            <CInputGroup className="ct-select" title="aaa">
              <CFormSelect
                 size="sm"
                className="mb-3"
                aria-label="Small select example"
                required
                onChange={(e)=>{
                  setCapacity(e.target.options[e.target.selectedIndex].text)
                }}
              >
                <option value=""  >Select a Capacity </option>
                <option value="1" >128 GB</option>
                <option value="2">256 GB</option>
                <option value="3">512 GB</option>
              </CFormSelect>
            </CInputGroup>
          </CTableHeaderCell>

          <CTableHeaderCell className="addbrand" scope="col">
            <CInputGroup className=" ml-3 ct-select">
              <CFormSelect
                 size="sm"
                className="mb-3"
                aria-label="Small select example"
                required
                onChange={(e)=>{
                  setRam(e.target.options[e.target.selectedIndex].text)
                }}
              >
                <option value=""  >Select a Ram</option>
                <option value="1">4 GB</option>
                <option value="2">8 GB</option>
                <option value="3"> 16 GB</option>
              </CFormSelect>
            </CInputGroup>
            <CInputGroup className="ct-select">
              <CFormSelect
                 size="sm"
                className="mb-3"
                aria-label="Small select example"
                required
                onChange={(e)=>{
                  setColor(e.target.options[e.target.selectedIndex].text)
                }}
              >
                <option value=""  >Select a color</option>
                <option value="1">Black</option>
                <option value="2">While</option>
                <option value="3">Gray</option>
              </CFormSelect>
            </CInputGroup>
          </CTableHeaderCell>
          <CTableHeaderCell className="addbrand ct-btn" scope="col" >
          <CButton color="success" type='submit'>Success</CButton>
          </CTableHeaderCell>
        </CTableBody>
      </CTable>
      </form>
    </CContainer>
    </>
  );
}

export default AddProduct;
