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
function EditProduct(props) {
  const [item, setItem] = useState(props.location.state.item);
  const [name, setName] = useState(props.location.state.item.Name)
  const [brand, setBrand] = useState(props.location.state.item.Brand)
  const [color, setColor] = useState(props.location.state.item.Color);
  const [ram, setRam] = useState(props.location.state.item.Ram);
  const [capacity, setCapacity] = useState(props.location.state.item.Capacity);
  const [quantity, setQuantity] = useState(props.location.state.item.Quantity);
  const [visible, setVisible] = useState(false);
  const [Brands, setBrands] = useState([]);
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
      setItem(props.location.state.item)
  },[])

  useEffect(() => {
    setBrand(item.Brand);
  }, []);
  const history = useHistory();
  const editproduct = () => {
    const newproduct = {
      id: item.id,
      Name: name,
      Brand: brand ,
      Capacity: capacity,
      Ram: ram,
      Color: color,
      Quantity:quantity,
    };
    console.log("aaaa");
    axios
      .put(
        `https://60a823f38532520017ae59e7.mockapi.io/API/Product/${newproduct.id}/`,
        newproduct
      )
      .then(
        setVisible(true) 
      )
      .catch((error) => console.log(error));
  };
  const toProduct=()=>{
    setVisible(false)
    history.push("/product")
  }
  return (
    < >
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Notification</CModalTitle>
        </CModalHeader>
        <CModalBody>Item updated</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => toProduct()}>
            Ok
          </CButton>
        </CModalFooter>
      </CModal>
      <CContainer className="text-center ct-content">
      {/* <form onSubmit={editproduct}> */}
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
                value={name}
                onChange={(e)=>setName(e.target.value.trim())}
              />
            </CInputGroup>
          </CTableHeaderCell>
          {/* <CTableHeaderCell className="addbrand" scope="col">
            </CTableHeaderCell> */}
          <CTableHeaderCell className="addbrand" scope="col">
            <CInputGroup className=" ml-3 ct-select">
              <CFormSelect
                size="sm"
                className="mb-3"
                aria-label="Small select example"
                required
                value={brand}
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
                value={capacity}
                onChange={(e)=>{
                  setCapacity(e.target.options[e.target.selectedIndex].text)
                }}
              >
                <option value=""  >Select a Capacity </option>
                <option value="128 GB" >128 GB</option>
                <option value="256 GB">256 GB</option>
                <option value="256 GB">512 GB</option>
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
                value={ram}
                onChange={(e)=>{
                  setRam(e.target.options[e.target.selectedIndex].text)
                }}
              >
                <option value=""  >Select a Ram</option>
                <option value="4 GB">4 GB</option>
                <option value="8 GB">8 GB</option>
                <option value="16 GB"> 16 GB</option>
              </CFormSelect>
            </CInputGroup>
            <CInputGroup className="ct-select">
              <CFormSelect
                 size="sm"
                className="mb-3"
                aria-label="Small select example"
                required
                value={color}
                onChange={(e)=>{
                  setColor(e.target.options[e.target.selectedIndex].text)
                }}
              >
                <option value=""  >Select a color</option>
                <option value="Black">Black</option>
                <option value="While">While</option>
                <option value="Gray">Gray</option>
              </CFormSelect>
            </CInputGroup>
          </CTableHeaderCell>
          <CTableHeaderCell className="addbrand ct-btn" scope="col" >
          <CButton color="success" type='submit' onClick={()=>editproduct()}>Success</CButton>
          </CTableHeaderCell>
        </CTableBody>
      </CTable>
      {/* </form> */}
    </CContainer>
    </>
  );
}

export default EditProduct;
