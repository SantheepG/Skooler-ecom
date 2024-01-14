import React, { useEffect, useState } from "react";
import "./Products.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductCard2 from "./ProductCard2";
import ProductView from "./ProductView";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer";
import { useDispatch, useSelector } from "react-redux";
import { setClicked } from "../../redux/action";
import { PiSortAscendingBold } from "react-icons/pi";
import Loading from "../Loading/Loading";
const Products = () => {
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navBarstate = useSelector((state) => state.navbar);
  //const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [subcategoriesDisabled, setSubcategoriesDisabled] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/products");
        setAllProducts(response.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/categories"
        );
        if (response && response.data) {
          const { category, subcategory } = response.data;
          setCategories(category);
          setSubcategories(subcategory);
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const handleNavigation = () => {
    navBarstate.productsClicked = false;
    navigate("/p");
  };

  const handleCategoryChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
    setSelectedSubcategory("");

    if (selectedValue === "") {
      setSubcategoriesDisabled(true);
      setSubcategories([]);
      return;
    }

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/categories/${selectedValue}`
      );
      const subcategoriesWithData = response.data.map((subcategory) => ({
        value: subcategory.subcategory_id,
        label: subcategory.name,
      }));
      setSubcategories(subcategoriesWithData);
      setSubcategoriesDisabled(false);
    } catch (error) {
      console.log("Error fetching subcategories:", error);
    }
  };

  const handleSubcategoryChange = (event) => {
    setSelectedSubcategory(event.target.value);
  };

  const handleReset = () => {
    setSelectedCategory("");
    setSelectedSubcategory("");
    setSubcategoriesDisabled(true);
    setSubcategories([]);
  };

  const handleItemClick = (item) => {
    if (!navBarstate[item]) {
      dispatch(setClicked(item, true));
    }
  };

  return (
    <React.Fragment>
      <div className="main-screen-container">
        <div className="navbar-header-container">
          <Navbar />
        </div>
        <div className="skooler-main-container">
          <div class="flex mt-20 pt-3">
            <div class="w-1/5 ml-5 pt-5 h-full pb-10 px-10 border border-gray-300">
              <label
                for="categories"
                class="mb-10 block text-xl font-semibold  mb-5 mt-5 text-sm font-medium text-gray-500 dark:text-white"
              >
                Filter options
              </label>
              <select
                id="categories"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option selected>Select category</option>
                {categories.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>

              <select
                id="subcategories"
                class="mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Select subcategory</option>

                {subcategories.map((subcategory) => (
                  <option key={subcategory.value} value={subcategory.value}>
                    {subcategory.label}
                  </option>
                ))}
              </select>

              <select
                id="subcategories"
                class="mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Select price range</option>
                <option value="">0 - $100</option>
                <option value="">$100 - $1000</option>
                <option value="">$1000 - $10000</option>
              </select>

              <div className="mt-10">
                <span>
                  <button
                    class="text-sm mx-5 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-red-300 rounded "
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </span>
                <span>
                  <button class="text-sm mx-5 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-blue-300 rounded">
                    Filter
                  </button>
                </span>
              </div>
            </div>

            <div class="w-4/5 flex-1">
              <div class="px-10 ">
                <div className="flex justify-between w-full mb-5">
                  <div className=" text-xl font-semibold ml-10">
                    <h2 className="text-gray-600">All products</h2>
                  </div>
                  <div className="text-2xl mr-10">
                    <button
                      type="button"
                      data-dropdown-toggle="cart-dropdown"
                      class="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                      onClick={() => setShowSortDropdown(!showSortDropdown)}
                    >
                      <span class="sr-only">View sort</span>
                      <span className="text-2xl">
                        <PiSortAscendingBold />
                      </span>
                    </button>
                    {showSortDropdown && (
                      <div className="Sort-dropdown-content">
                        <a
                          href="#"
                          class="font-medium text-gray-900 block px-4 py-2 text-sm hover:text-orange-400"
                          role="menuitem"
                          tabindex="-1"
                          id="menu-item-1"
                        >
                          Best Rating
                        </a>
                        <a
                          href="#"
                          class="font-medium text-gray-900 block px-4 py-2 text-sm hover:text-orange-400"
                          role="menuitem"
                          tabindex="-1"
                          id="menu-item-2"
                        >
                          Newest
                        </a>
                        <a
                          href="#"
                          class="font-medium text-gray-900 block px-4 py-2 text-sm hover:text-orange-400"
                          role="menuitem"
                          tabindex="-1"
                          id="menu-item-3"
                        >
                          Price: Low to High
                        </a>
                        <a
                          href="#"
                          class="font-medium text-gray-900 block px-4 py-2 text-sm hover:text-orange-400"
                          role="menuitem"
                          tabindex="-1"
                          id="menu-item-4"
                        >
                          Price: High to Low
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <hr class="border-gray-300" />
              </div>

              {allProducts.length !== 0 ? (
                <section
                  id="Projects"
                  class="w-fit mx-auto ml-5 mr-10 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-5 gap-x-5 mt-10 mb-5"
                >
                  {allProducts.map((product) => (
                    <ProductCard2
                      key={product.product_id}
                      productData={product}
                    />
                  ))}
                </section>
              ) : (
                <section
                  id="Projects"
                  class="w-fit mx-auto ml-5 mr-10 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-5 gap-x-5 mt-10 mb-5"
                >
                  <Loading />
                </section>
              )}
            </div>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};
export default Products;
