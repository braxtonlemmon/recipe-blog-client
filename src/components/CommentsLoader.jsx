import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { GiGarlic } from 'react-icons/gi';

const Wrapper = styled.div`
  z-index: 100;
  height: 200px;
  width: 290px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  p {
    margin-top: 20px;
    font-size: 2em;
    color: ${props => props.theme.colors.dark};
  }
`;

const jump = keyframes`
  0%   { transform: translateY(initial); }
  30%  { transform: translateY(-15px) }
  70%  { transform: translateY(initial); }
  100% { transform: translateY(initial); }
`;


const Garlics = styled.div`
  display: flex;
  #garlic0 {

  }
  #garlic1 {
    animation-delay: -1.0s;
  }
  #garlic2 {
    animation-delay: -0.9s;
  }
`;

const Garlic = styled(GiGarlic)`
  animation: ${jump} 1.1s linear infinite;
  margin: 0 10px;
  color: ${props => props.theme.colors.dark};
`
function CommentsLoader({ message }) {
  const size = 50;
  return (
    <Wrapper>
      <Garlics>
        <Garlic size={size} id="garlic0" />
        <Garlic size={size} id="garlic1" />
        <Garlic size={size} id="garlic2" />
      </Garlics>
      <p>{message}...</p>
    </Wrapper>
  )
}

CommentsLoader.propTypes = {
  message: PropTypes.string
}

export default CommentsLoader;