import React, { useState, useEffect, useRef } from "react";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getAllProducts } from "./helper/coreapicalls";

const Home = ({ location }) => {
  const isMounted = useRef(false);

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        isMounted.current && setError(data.error);
      } else {
        if (isMounted.current) {
          setError(false);
          setProducts(data);
        }
      }
    });
  };

  useEffect(() => {
    isMounted.current = true;
    loadAllProducts();
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  return (
    <Base title="Home Page" description="Welcome to the Tshirt store">
      <div className="row text-center">
        <h1 className="text-white">All of Tshirts</h1>
        <div className="row">
          {products &&
            products.map((product, index) => {
              return (
                <div key={index} className="col-4 mb-4">
                  <Card product={product} location={location} />
                </div>
              );
            })}
        </div>
      </div>
    </Base>
  );
};

export default Home;
