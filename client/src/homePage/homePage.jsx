import { NavBar } from "./navbar.jsx";
import { Footer } from "./footer.jsx";
import { BilboardADS } from "./homePageComponents/billboardADS.jsx";
import { Categories } from "./homePageComponents/categories.jsx";
import { TopRatedProducts } from "./homePageComponents/topRatedProducts.jsx";
import { DiscountedProducts } from "./homePageComponents/discountedProduct.jsx";
import { BrandSection } from "./homePageComponents/brands.jsx";
// import producstData from "./productsJSON.json";
import { useState, useEffect, useRef } from "react";

import homeStyles from "../cssModules/homePage.module.css";

export function HomePage() {
  const [prods, setProds] = useState([]);
  const [TopRatedProds, setTopRatedProds] = useState([]);
  const [DsicountProds, setDsicountedProds] = useState([]);
  const [Brands, setBrands] = useState(new Set());
  const [categoriesSet, setCategoriesSet] = useState(new Set());

  // console.log(producstData);

  useEffect(() => {
    fetch("https://dummyjson.com/products", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        for (let c in data.products) {
          // console.log(data.products[c]);
          setProds((prev) => [...prev, data.products[c]]);
          setBrands((prev) => new Set([...prev, data.products[c].brand]));
          setCategoriesSet(
            (prev) => new Set([...prev, data.products[c].category])
          );
          if (data.products[c].rating > 4.5) {
            setTopRatedProds((prev) => [...prev, data.products[c]]);
          }
          if (data.products[c].discountPercentage > 10) {
            setDsicountedProds((prev) => [...prev, data.products[c]]);
          }
        }
      })
      .catch((error) => console.log(error));
  }, []);
  // console.log(DsicountProds);

  return (
    <div className={`${homeStyles.container}`}>
      <div className={`${homeStyles.homeContainer}`}>
        <div className={homeStyles.firstWrapper}>
          <section id={"billboardADS"} className={`${homeStyles.bbADS} ads`}>
            <BilboardADS ads={TopRatedProds} />
          </section>
          <aside className={homeStyles.categories}>
            <Categories catSet={categoriesSet} />
          </aside>
        </div>

        <section id={"discountedProducts"} className={homeStyles.section}>
          <TopRatedProducts prods={TopRatedProds} />
        </section>
        <section id={"popularProducts"} className={homeStyles.section}>
          <DiscountedProducts prods={DsicountProds} />
        </section>
        <section id={"brands"} className={homeStyles.section}>
          <BrandSection brands={Brands} />
        </section>

        <Footer />
      </div>
    </div>
  );
}
