import AddBrand from "./components/views/Brand/AddBrand";
import Brand from "./components/views/Brand/Brand";
import EditBrand from "./components/views/Brand/EditBrand";
import ExportProduct from "./components/views/exportProduct/ExportProduct";
import AddImport from "./components/views/importProduct/AddImport";
import ImportProduct from "./components/views/importProduct/ImportProduct";
import AddUser from "./components/views/listUser/AddUser";
import User from "./components/views/listUser/User";
import AddProduct from "./components/views/Product/AddProduct";
import EditProduct from "./components/views/Product/EditProduct";
import Product from "./components/views/Product/Product";

const routes = [
  { path: "/brand", exact: true, name: "brand", component: Brand },
  { path: "/brand/edit", exact: true, name: "editbrand", component: EditBrand },
  { path: "/brand/add", exact: true, name: "addbrand", component: AddBrand },
  { path: "/product", exact: true, name: "product", component: Product },
  { path: "/product/add", exact: true, name: "addproduct", component: AddProduct },
  { path: "/product/edit", exact: true, name: "editproduct", component: EditProduct },
  { path: "/user", exact: true, name: "user", component: User },
  { path: "/user/add", exact: true, name: "adduser", component: AddUser },
  { path: "/export", exact: true, name: "export", component: ExportProduct },
  { path: "/import", exact: true, name: "import", component: ImportProduct },
  { path: "/import/add", exact: true, name: "addimport", component: AddImport },
];
export default routes;
