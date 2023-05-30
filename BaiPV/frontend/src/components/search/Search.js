import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchProduct } from "../../redux/actions/product.action";
import "./style.css";

export const Search = () => {
  const dispatch = useDispatch();
  const [key, setkey] = useState("");
  const handleChange = (e) => {
    const key = e.target.value;
    setkey(key);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchProduct(key));
  };
  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <input
          style={{ width: "50%", margin: "0 auto", position: "relative" }}
          onChange={handleChange}
          className="form-control"
          type="text"
          name="search"
          placeholder="Tìm kiếm"
          aria-label="Tìm kiếm"
        />
        <button
          className="btn btn-outline-dark my-2 my-sm-0"
          type="submit"
          style={{ position: "absolute", right: "324px" }}
        >
          Tìm Kiếm
        </button>
      </form>
    </div>
  );
};
