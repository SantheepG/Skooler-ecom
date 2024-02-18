import "./App.css";
import Home from "./components/Home/Home";
import Home2 from "./components/Home/Home2";
import Products from "./components/Products/Products";
import Events from "./components/Events/Events";
import Cart from "./components/Cart/Cart";
import User from "./components/User/User";
import Login from "./components/Login/Login";
import Login2 from "./components/Login/Login2";
import ProductView from "./components/Products/ProductView";
import EventView from "./components/Events/EventView";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { FetchSchool } from "./api/SchoolAPI";

export const base_URL = "http://127.0.0.1:8000/api"; //URL for school DB
export const base_URL2 = "http://127.0.0.1:8080/api"; //URL for main DB
export const schoolID = "SC-24"; //School ID

function App() {
  const [school, setSchool] = useState("");
  const [ui, setUI] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FetchSchool();
        if (response.status === 200) {
          localStorage.setItem("ui", response.data.school.ui);
          localStorage.setItem("school", JSON.stringify(response.data.school));
          setSchool(response.data.school);
          setUI(JSON.parse(response.data.school.ui));
          console.log(JSON.parse(response.data.school.ui));
        } else {
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <Router>
      {school.is_active && (
        <div className="m-0 p-0">
          <Routes>
            <Route path="/login" element={<Login2 ui={ui} school={school} />} />
            <Route path="/" element={<Home school={school} ui={ui} />} />
            <Route
              path="/products"
              element={<Products ui={ui} school={school} />}
            />
            <Route
              path="/product/:id"
              element={<ProductView ui={ui} school={school} />}
            />
            <Route
              path="/events"
              element={<Events ui={ui} school={school} />}
            />
            <Route
              path="/event/:id"
              element={<EventView ui={ui} school={school} />}
            />
            <Route path="/cart" element={<Cart ui={ui} school={school} />} />
            <Route path="/user" element={<User ui={ui} school={school} />} />
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;
