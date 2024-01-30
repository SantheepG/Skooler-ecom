import "./App.css";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Events from "./components/Events/Events";
import Cart from "./components/Cart/Cart";
import User from "./components/User/User";
import Login from "./components/Login/Login";
import ProductView from "./components/Products/ProductView";
import EventView from "./components/Events/EventView";
import Main from "./Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="m-0 p-0">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductView />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event/:id" element={<EventView />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
