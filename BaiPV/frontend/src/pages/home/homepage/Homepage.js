import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MediaCard from "../../../components/cards/MediaCard";
import { Search } from "../../../components/search/Search";
import { getProduct } from "../../../redux/actions/product.action";
import "./style.css";

export const Homepage = () => {
  const dispatch = useDispatch();
  const listProduct = useSelector((state) => state.defaultReducer.listProduct);
  const search = useSelector((state) => state.defaultReducer.search);
  const isLoading = useSelector((state) => state.defaultReducer.isLoading);

  console.log(search, "search");

  useEffect(() => {
    dispatch(getProduct());
  }, []);

  console.log(listProduct);

  return (
    <div className="main-page">
      <div className="container">
        <h1 className="title-store">Cửa Hàng</h1>
        <div>
          <Search />
        </div>
        <>
          {search.length > 0 ? (
            <>
              {isLoading ? (
                <>
                  <div className="spinner-border" roll="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <span
                    style={{
                      color: "red",
                      marginLeft: "1rem",
                      fontSize: "1.5rem",
                      fontWeight: "700",
                    }}
                  >
                    Loading...
                  </span>
                </>
              ) : (
                <div className="row">
                  {search?.map((item, index) => (
                    <div className="col-3" key={index}>
                      <MediaCard
                        id={item._id}
                        image={item.image}
                        title={item.title}
                        description={item.description}
                        itemprd={item}
                        oldPrice={item.oldPrice}
                        newPrice={item.newPrice}
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              {isLoading ? (
                <>
                  <div className="spinner-border" roll="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <span
                    style={{
                      color: "red",
                      marginLeft: "1rem",
                      fontSize: "1.5rem",
                      fontWeight: "700",
                    }}
                  >
                    Loading...
                  </span>
                </>
              ) : (
                <div className="row">
                  {listProduct?.map((item, index) => (
                    <div className="col-3" key={index}>
                      <MediaCard
                        id={item._id}
                        image={item.image}
                        title={item.title}
                        description={item.description}
                        oldPrice={item.oldPrice}
                        newPrice={item.newPrice}
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </>
      </div>
    </div>
  );
};
