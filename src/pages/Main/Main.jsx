import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  getItems,
  createItem,
  updateItem,
  patchItem,
  deleteItem,
} from "../../api/shop";

import styled from "styled-components";

export default function Main() {
  const navigate = useNavigate();

  const [openFilter, setOpenFilter] = useState(null);
  const [selected, setSelected] = useState({});
  const [openSort, setOpenSort] = useState(false);

  const [items, setItems] = useState([]);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await getItems("clothes");

        if (!cancelled) {
          const data = Array.isArray(res)
            ? res
            : [];

          setItems(data);
          setSortedData(data);
        }
      } catch (error) {
        console.log(error);

        if (!cancelled) {
          setItems([]);
          setSortedData([]);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const [sortLabel, setSortLabel] =
    useState("정렬순");

  const FILTER_OPTIONS = {
    성별: ["female", "male", "unisex"],
    색상: [
      "red",
      "pink",
      "blue",
      "black",
      "gray",
      "denim",
      "rainbow",
      "multi",
      "holographic",
    ],
    사이즈: ["S", "M", "L", "XL", "9", "10"],
    가격대: ["0~30$", "31~60$", "61~90$"],
    종류: ["clothes", "shoes"],
  };

  const SORT_OPTIONS = [
    "정렬순",
    "가격 낮은순",
    "가격 높은순",
    "리뷰 많은순",
  ];

  const handleFilterClick = (name) => {
    setOpenFilter(
      openFilter === name ? null : name
    );

    setOpenSort(false);
  };

  const handleOptionClick = (
    filterName,
    option
  ) => {
    setSelected((prev) => ({
      ...prev,
      [filterName]:
        prev[filterName] === option
          ? null
          : option,
    }));
  };

  const handleSortSelect = (option) => {
    setSortLabel(option);
    setOpenSort(false);

    let sorted = [...items];

    if (option === "가격 낮은순") {
      sorted.sort((a, b) => a.price - b.price);
    }

    if (option === "가격 높은순") {
      sorted.sort((a, b) => b.price - a.price);
    }

    if (option === "리뷰 많은순") {
      sorted.sort(
        (a, b) => b.reviews - a.reviews
      );
    }

    setSortedData(sorted);
  };

  // POST
  const handleCreate = async () => {
    const newItem = {
      name: "아디다스 검정 후드",
      price: 89000,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      reviews: 120,
    };

    try {
      await createItem("clothes", newItem);

      alert("상품 추가 완료!");
    } catch (error) {
      console.log(error);
    }
  };

  // PUT
  const handleUpdate = async () => {
    const updatedItem = {
      name: "수정된 후드",
      price: 50000,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      reviews: 999,
    };

    try {
      await updateItem(
        "clothes",
        1,
        updatedItem
      );

      alert("상품 수정 완료!");
    } catch (error) {
      console.log(error);
    }
  };

  // PATCH
  const handlePatch = async () => {
    try {
      await patchItem("clothes", 1, {
        price: 123456,
      });

      alert("가격 수정 완료!");
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE
  const handleDelete = async () => {
    try {
      await deleteItem("clothes", 1);

      alert("상품 삭제 완료!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageWrap>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <button onClick={handleCreate}>
          상품 추가
        </button>

        <button onClick={handleUpdate}>
          상품 수정
        </button>

        <button onClick={handlePatch}>
          부분 수정
        </button>

        <button onClick={handleDelete}>
          상품 삭제
        </button>
      </div>

      <FilterBar>
        {Object.keys(FILTER_OPTIONS).map(
          (filterName) => (
            <div
              key={filterName}
              style={{
                position: "relative",
              }}
            >
              <FilterBtn
                className={
                  openFilter === filterName
                    ? "active"
                    : ""
                }
                onClick={() =>
                  handleFilterClick(filterName)
                }
              >
                {filterName} ∨
              </FilterBtn>

              {openFilter === filterName && (
                <Dropdown>
                  {FILTER_OPTIONS[
                    filterName
                  ].map((option) => (
                    <OptionBtn
                      key={option}
                      className={
                        selected[
                          filterName
                        ] === option
                          ? "selected"
                          : ""
                      }
                      onClick={() =>
                        handleOptionClick(
                          filterName,
                          option
                        )
                      }
                    >
                      {option}
                    </OptionBtn>
                  ))}
                </Dropdown>
              )}
            </div>
          )
        )}
      </FilterBar>

      <SortRow>
        <SortBtn
          onClick={() => {
            setOpenSort(!openSort);
            setOpenFilter(null);
          }}
        >
          {sortLabel} ↑↓
        </SortBtn>

        {openSort && (
          <SortDropdown>
            {SORT_OPTIONS.map((option) => (
              <SortOption
                key={option}
                onClick={() =>
                  handleSortSelect(option)
                }
              >
                {option}
              </SortOption>
            ))}
          </SortDropdown>
        )}
      </SortRow>

      <ItemGrid>
        {sortedData.map((item) => (
          <ItemCard
            key={item.id}
            onClick={() =>
              navigate(`/item/${item.id}`)
            }
          >
            <img
              src={item.image}
              alt={item.name}
            />

            <p>{item.name}</p>

            <p>
              {Number(
                item.price
              ).toLocaleString()}
              원
            </p>

            <p>리뷰 {item.reviews}</p>
          </ItemCard>
        ))}
      </ItemGrid>
    </PageWrap>
  );
}

const PageWrap = styled.div`
  padding: 20px;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
`;

const FilterBtn = styled.button`
  padding: 6px 14px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: white;
  cursor: pointer;

  &.active {
    background: #222;
    color: white;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 36px;
  left: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px;
  z-index: 10;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  width: 200px;
`;

const OptionBtn = styled.button`
  padding: 4px 10px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: white;
  cursor: pointer;

  &.selected {
    background: #222;
    color: white;
  }
`;

const SortRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
  position: relative;
`;

const SortBtn = styled.button`
  padding: 6px 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
`;

const SortDropdown = styled.div`
  position: absolute;
  top: 36px;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px;
  z-index: 10;
`;

const SortOption = styled.div`
  padding: 6px 12px;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
`;

const ItemCard = styled.div`
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  img {
    width: 100%;
    border-radius: 8px;
  }
`;