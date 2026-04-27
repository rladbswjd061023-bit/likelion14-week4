/*const Button = ({ buttonName, onClick, ...props }) => (
    <div onClick={onClick} {...props}>
        {buttonName}
    </div>
);

export default Button;*/

import styled from "styled-components";

const StyledButton = styled.button`
  padding: 6px 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  font-size: 13px;
  cursor: pointer;

  &.active {
    background-color: #222;
    color: #fff;
    border-color: #222;
  }
`;

const Button = ({ buttonName, onClick, className }) => (
  <StyledButton onClick={onClick} className={className}>
    {buttonName}
  </StyledButton>
);

export default Button;