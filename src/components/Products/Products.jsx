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
  const [fetchedProducts, setFetchedProducts] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navBarstate = useSelector((state) => state.navbar);
  //const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [catFiltered, setCatFiltered] = useState([]);
  const [subCatFiltered, setSubCatfiltered] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [subcategoriesDisabled, setSubcategoriesDisabled] = useState(false);
  const [title, setTitle] = useState("All products");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/products");
        setFetchedProducts(response.data.products);
        setAllProducts(response.data.products);
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

  const handleCategoryChange = (event) => {
    setCatFiltered([]);
    setFilteredSubcategories([]);
    const selectedCat = categories.filter(
      (item) => item.id === parseInt(event.target.value)
    );
    setSelectedCategory(selectedCat[0]);
    setTitle(selectedCat[0].name);

    const filteredProducts = fetchedProducts.filter(
      (item) => item.category_id === parseInt(selectedCat[0].id)
    );

    setCatFiltered(filteredProducts);
    setAllProducts(filteredProducts);

    const filteredData = subcategories.filter(
      (item) => item.category_id === parseInt(selectedCat[0].id)
    );

    if (filteredData.length === 0) {
      setSubcategoriesDisabled(true);
      setFilteredSubcategories([]);
    } else {
      setFilteredSubcategories(filteredData);
    }
  };

  const handleSubcategoryChange = (event) => {
    setSubCatfiltered([]);
    setSelectedSubcategory(event.target.value);

    const filteredProducts = catFiltered.filter(
      (item) => item.subcategory_id === parseInt(event.target.value)
    );

    setSubCatfiltered(filteredProducts);
    setAllProducts(filteredProducts);
  };

  const handleReset = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setAllProducts(fetchedProducts);
    setCatFiltered([]);
    setSubCatfiltered([]);
    //setSubcategoriesDisabled(true);
    setFilteredSubcategories([]);
    setTitle("All products");
  };

  const sortProducts = (num) => {
    //setFilteredProducts([]);
    console.log(num);
    if (num === 0) {
      const sorted = [...allProducts].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setAllProducts(sorted);
    } else if (num === 1) {
      const sorted = [...allProducts].sort(
        (a, b) => b.avg_rating - a.avg_rating
      );
      setAllProducts(sorted);
    } else if (num === 2) {
      const sorted = [...allProducts].sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
      setAllProducts(sorted);
    } else if (num === 3) {
      const sorted = [...allProducts].sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price)
      );
      setAllProducts(sorted);
    }
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
          <div class="flex mt-20 pt-3 p-24">
            <div class="w-full flex-1">
              <div class="px-10 ">
                <div className="flex justify-between w-full mb-5">
                  <div className=" text-xl font-semibold w-32">
                    <h2 className="text-gray-600">{title}</h2>
                  </div>
                  <div className="flex w-1/2">
                    <select
                      id="categories"
                      class="bg-gray-50 mr-4 w-38 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => handleCategoryChange(e)}
                    >
                      <option selected disabled>
                        Select Category
                      </option>
                      {categories.map((category) => (
                        <option
                          key={category.id}
                          name={category.name}
                          value={category.id}
                        >
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <select
                      id="subcategories"
                      class="bg-gray-50 border w-38 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => handleSubcategoryChange(e)}
                    >
                      <option selected disabled>
                        Select subcategory
                      </option>

                      {filteredSubcategories.map((subcategory) => (
                        <option
                          key={subcategory.id}
                          name={subcategory.name}
                          value={subcategory.id}
                        >
                          {subcategory.name}
                        </option>
                      ))}
                    </select>
                    <span>
                      <button
                        class="text-sm mx-5 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-red-300 rounded "
                        onClick={handleReset}
                      >
                        Reset
                      </button>
                    </span>
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
                          id="menu-item-2"
                          onClick={() => {
                            sortProducts(0);
                            setShowSortDropdown(!showSortDropdown);
                          }}
                        >
                          Newest
                        </a>
                        <a
                          href="#"
                          class="font-medium text-gray-900 block px-4 py-2 text-sm hover:text-orange-400"
                          role="menuitem"
                          tabindex="-1"
                          id="menu-item-1"
                          onClick={() => {
                            sortProducts(1);
                            setShowSortDropdown(!showSortDropdown);
                          }}
                        >
                          Rating: High to Low
                        </a>
                        <a
                          href="#"
                          class="font-medium text-gray-900 block px-4 py-2 text-sm hover:text-orange-400"
                          role="menuitem"
                          tabindex="-1"
                          id="menu-item-3"
                          onClick={() => {
                            sortProducts(2);
                            setShowSortDropdown(!showSortDropdown);
                          }}
                        >
                          Price: Low to High
                        </a>
                        <a
                          href="#"
                          class="font-medium text-gray-900 block px-4 py-2 text-sm hover:text-orange-400"
                          role="menuitem"
                          tabindex="-1"
                          id="menu-item-4"
                          onClick={() => {
                            sortProducts(3);
                            setShowSortDropdown(!showSortDropdown);
                          }}
                        >
                          Price: High to Low
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <hr class="border-gray-300" />
              </div>

              {fetchedProducts !== null ? (
                <section
                  id="Projects"
                  class="w-fit mx-auto ml-5 mr-10 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-7 gap-x-7 mt-10 mb-5"
                >
                  {allProducts.length !== 0 ? (
                    allProducts.map((product) => (
                      <ProductCard2 key={product.id} productData={product} />
                    ))
                  ) : (
                    <div
                      id="Projects"
                      className="w-full slideInFromLeft mx-auto ml-5 mr-10 flex items-center justify-center mt-10 mb-5"
                    >
                      <p className="ml-16 text-gray-500 ">
                        No products available
                      </p>
                    </div>
                  )}
                </section>
              ) : (
                <section
                  id="Projects"
                  class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-5 gap-x-5 mt-10 mb-5"
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
