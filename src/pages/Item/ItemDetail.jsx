/*import { useParams } from "react-router-dom";

export default function ItemDetail() {
    const {id} = useParams();
    return (
    <h1>상품 조회하기 페이지 {id}</h1>
  );
}*/

import { useParams, useNavigate } from "react-router-dom";
import { itemData } from "../Main/ItemDummy";

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const item = itemData.find((item) => item.id === Number(id));

  if (!item) return <p>상품을 찾을 수 없어요!</p>;

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate(-1)}>← 뒤로가기</button>
      <img src={item.image} alt={item.name} style={{ width: "300px", display: "block", margin: "20px 0" }} />
      <h2>{item.name}</h2>
      <p>가격: {item.price.toLocaleString()}원</p>
      <p>리뷰: {item.reviews}개</p>
      <p>카테고리: {item.category}</p>
    </div>
  );
}
