/*export default function Main(){
    return (
        <div>
            <div>메인페이지</div>
        </div>
    )
}*/


import { useState } from "react";
import styled from "styled-components";

// 임시 상품 데이터
const PRODUCTS = [
  { id: 1, name: "아이앱 스튜디오 25 후드 라이트 그레이", price: 145000, reviews: 1561, image: "https://placehold.co/200x200?text=상품1" },
  { id: 2, name: "아이앱 스튜디오 25 후드 라이트 블루", price: 145000, reviews: 1732, image: "https://placehold.co/200x200?text=상품2" },
  { id: 3, name: "아디다스 블랙 재지 2016", price: 255000, reviews: 781, image: "https://placehold.co/200x200?text=상품3" },
  { id: 4, name: "슈프림 후드집업 30 딥블루", price: 458000, reviews: 2567, image: "https://placehold.co/200x200?text=상품4" },
  { id: 5, name: "나이키 에어 그레이 하운드 25", price: 235000, reviews: 231, image: "https://placehold.co/200x200?text=상품5" },
  { id: 6, name: "아이앱 스튜디오 25 후드 라이트 그레이", price: 145000, reviews: 1561, image: "https://placehold.co/200x200?text=상품6" },
  { id: 7, name: "아이앱 스튜디오 25 후드 라이트 블루", price: 145000, reviews: 1732, image: "https://placehold.co/200x200?text=상품7" },
  { id: 8, name: "아디다스 블랙 재지 2016", price: 255000, reviews: 781, image: "https://placehold.co/200x200?text=상품8" },
  { id: 9, name: "슈프림 후드집업 30 딥블루", price: 458000, reviews: 2587, image: "https://placehold.co/200x200?text=상품9" },
  { id: 10, name: "나이키 에어 그레이 하운드 25", price: 235000, reviews: 231, image: "https://placehold.co/200x200?text=상품10" },
];

const FILTER_OPTIONS = {
  성별: ["female", "male", "unisex"],
  색상: ["red", "pink", "blue", "black", "gray", "denim", "rainbow", "multi", "holographic"],
  사이즈: ["S", "M", "L", "XL", "9", "10"],
  가격대: ["0~30$", "31~60$", "61~90$"],
  종류: ["clothes", "shoes"],
};

const SORT_OPTIONS = ["정렬순", "가격 낮은순", "가격 높은순", "리뷰 많은순"];

// 스타일
const PageWrap = styled.div`
  padding: 0 160px;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 8px;
  padding: 24px 0 16px;
  position: relative;
`;

const FilterBtn = styled.button`
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background: #fff;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;

  &.active {
    border-color: #222;
    font-weight: bold;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 56px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  z-index: 100;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  min-width: 200px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

const OptionBtn = styled.button`
  padding: 6px 14px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background: #fff;
  font-size: 13px;
  cursor: pointer;

  &.selected {
    background: #222;
    color: #fff;
    border-color: #222;
  }
`;

const SortRow = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px 0;
  position: relative;
`;

const SortBtn = styled.button`
  background: none;
  border: none;
  font-size: 13px;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const SortDropdown = styled.div`
  position: absolute;
  top: 36px;
  right: 0;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  z-index: 100;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

const SortOption = styled.div`
  padding: 10px 20px;
  font-size: 13px;
  cursor: pointer;
  &:hover { background: #f5f5f5; }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 24px;
  padding: 16px 0 40px;
`;

const ProductCard = styled.div`
  cursor: pointer;
`;

const ProductImg = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 8px;
  background: #f5f5f5;
`;

const ProductName = styled.p`
  font-size: 13px;
  color: #222;
  margin-top: 10px;
`;

const ProductPrice = styled.p`
  font-size: 13px;
  font-weight: bold;
  color: #222;
  margin-top: 4px;
`;

const ProductReview = styled.p`
  font-size: 12px;
  color: #999;
  margin-top: 2px;
`;

export default function Main() {
  const [openFilter, setOpenFilter] = useState(null); // 현재 열린 필터
  const [selected, setSelected] = useState({});       // 선택된 필터값
  const [openSort, setOpenSort] = useState(false);    // 정렬 드롭다운
  const [sortLabel, setSortLabel] = useState("정렬순");

  // 필터 버튼 클릭
  const handleFilterClick = (name) => {
    setOpenFilter(openFilter === name ? null : name);
    setOpenSort(false);
  };

  // 옵션 선택/해제
  const handleOptionClick = (filterName, option) => {
    setSelected((prev) => ({
      ...prev,
      [filterName]: prev[filterName] === option ? null : option,
    }));
  };

  // 정렬 선택
  const handleSortSelect = (option) => {
    setSortLabel(option);
    setOpenSort(false);
  };

  return (
    <PageWrap>
      {/* 필터 바 */}
      <FilterBar>
        {Object.keys(FILTER_OPTIONS).map((filterName, idx) => (
          <div key={filterName} style={{ position: "relative" }}>
            <FilterBtn
              className={openFilter === filterName ? "active" : ""}
              onClick={() => handleFilterClick(filterName)}
            >
              {filterName} ∨
            </FilterBtn>

            {/* 드롭다운 */}
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
            ))}
          </SortDropdown>
        )}
      </SortRow>

      {/* 상품 목록 */}
      <ProductGrid>
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id}>
            <ProductImg src={product.image} alt={product.name} />
            <ProductName>{product.name}</ProductName>
            <ProductPrice>{product.price.toLocaleString()}원</ProductPrice>
            <ProductReview>리뷰 {product.reviews.toLocaleString()}</ProductReview>
          </ProductCard>
        ))}
      </ProductGrid>
    </PageWrap>
  );
}