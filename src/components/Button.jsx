import styled from 'styled-components';

const Button = styled.button`
  border: none;
  border-radius: 5px;
  background: ${props => props.theme.colors.medium};
  outline: none;
  color: #cdcbd6;
  padding: 4px 5px;
  padding: 11px;
  font-size: 0.8em;
  font-weight: bolder;
  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    background: ${props => props.theme.colors.medium}e6;
  }
`;

export default Button;