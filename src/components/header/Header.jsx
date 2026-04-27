/*import styled from "styled-components";
import logoUrl from "../../assets/images/kream_image.png"
import { useNavigate } from "react-router-dom";
const LogoImage = styled.img`
width: 166px;
height: 141px;
`;
const HeaderContainer = styled.div`
    padding-right: 160px;
    padding-left: 160px;
    display: flex;
    align-content: center;
    justify-content: space-between;

`;

export default function Header(){

    return(
        <div>
            <HeaderContainer>
                <LogoImage src={logoUrl}/>
                <HomeIcon src={homeUrl}/>
            </HeaderContainer>
        </div>
    );
}

const Button = styled.div`
    color: #6C6C6C;
    font-size: 13px;
    font-family: Pretendard;
    font-weight: 400;
`;

export default function Header(){

        const{pathname} = useLocation();
        const navigate = useNavigate();
        const buttonName = "상품등록";
        
        return(
            <div>
                <HeaderContainer>
                        <LogoImage src={logoUrl}/>
                        <HomeIcon src={homeUrl}/>
                        {pathname === "/" && (
                            <Button onClick={()=>navigate("/add")}>{buttonName}</Button>
                        )}
                </HeaderContainer>
        </div>
        );
    }*/
   

import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import logoUrl from "../../assets/images/kream_image.png";
import homeUrl from "../../assets/icons/home_icon.png";

const HeaderWrap = styled.div`
  width: 100%;
  height: 141px;
  padding: 0 160px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
`;

const LogoImage = styled.img`
  width: 166px;
  height: auto;
`;

const HeaderRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 9px;
`;

const NavButtons = styled.div`
  display: flex;
  gap: 16px;
`;

const NavBtn = styled.span`
  font-size: 13px;
  color: #6c6c6c;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const HomeIcon = styled.img`
  width: 61px;
  height: 24px;
`;

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div>
      <HeaderWrap>
        <LogoImage src={logoUrl} alt="KREAM 로고" />
        <HeaderRight>
          <NavButtons>
            {/* 메인 페이지일 때 */}
            {pathname === "/" && (
              <NavBtn onClick={() => navigate("/add")}>상품등록</NavBtn>
            )}

            {/* 수정 페이지일 때 */}
            {pathname === "/edit" && (
              <>
                <NavBtn onClick={() => navigate("/add")}>상품등록</NavBtn>
                <NavBtn>상품삭제</NavBtn>
                <NavBtn>상품수정</NavBtn>
              </>
            )}
          </NavButtons>
          <HomeIcon src={homeUrl} alt="HOME" />
        </HeaderRight>
      </HeaderWrap>
    </div>
  );
}
