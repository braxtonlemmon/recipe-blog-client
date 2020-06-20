import styled from 'styled-components';

const Button = styled.button`
  border: none;
  color: white;
  border-radius: 5px;
  background: red;
  outline: none;
  padding: 5px;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

export default Button;