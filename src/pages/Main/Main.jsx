import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { itemData } from "./ItemDummy";
import styled from "styled-components";

export default function Main() {
  const navigate = useNavigate();

  const [openFilter, setOpenFilter] = useState(null);
  const [selected, setSelected] = useState({});
  const [openSort, setOpenSort] = useState(false);
  const [sortLabel, setSortLabel] = useState("정렬순");

  const FILTER_OPTIONS = {
    성별: ["female", "male", "unisex"],
    색상: ["red", "pink", "blue", "black", "gray", "denim", "rainbow", "multi", "holographic"],
    사이즈: ["S", "M", "L", "XL", "9", "10"],
    가격대: ["0~30$", "31~60$", "61~90$"],
    종류: ["clothes", "shoes"],
  };

  const SORT_OPTIONS = ["정렬순", "가격 낮은순", "가격 높은순", "리뷰 많은순"];

  const handleFilterClick = (name) => {
    setOpenFilter(openFilter === name ? null : name);
    setOpenSort(false);
  };

  const handleOptionClick = (filterName, option) => {
    setSelected((prev) => ({
      ...prev,
      [filterName]: prev[filterName] === option ? null : option,
    }));
  };

  const handleSortSelect = (option) => {
    setSortLabel(option);
    setOpenSort(false);
  };

  return (
    <PageWrap>
      {/* 필터 바 */}
      <FilterBar>
        {Object.keys(FILTER_OPTIONS).map((filterName) => (
          <div key={filterName} style={{ position: "relative" }}>
            <FilterBtn
              className={openFilter === filterName ? "active" : ""}
              onClick={() => handleFilterClick(filterName)}
            >
              {filterName} ∨
            </FilterBtn>

            {openFilter === filterName && (
              <Dropdown>
                {FILTER_OPTIONS[filterName].map((option) => (
                  <OptionBtn
                    key={option}
                    className={selected[filterName] === option ? "selected" : ""}
                    onClick={() => handleOptionClick(filterName, option)}
                  >
                    {option}
                  </OptionBtn>
                ))}
              </Dropdown>
            )}
          </div>
        ))}
      </FilterBar>

      {/* 정렬 */}
      <SortRow>
        <SortBtn onClick={() => { setOpenSort(!openSort); setOpenFilter(null); }}>
          {sortLabel} ↑↓
        </SortBtn>
        {openSort && (
          <SortDropdown>
            {SORT_OPTIONS.map((option) => (
              <SortOption key={option} onClick={() => handleSortSelect(option)}>
                {option}
              </SortOption>




import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);