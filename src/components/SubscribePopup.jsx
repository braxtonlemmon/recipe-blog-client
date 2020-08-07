import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { GiGarlic } from 'react-icons/gi';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const fadeIn = keyframes`
  0% { opacity: 0 }
  100% { opacity: 1}
`;
const Popup = styled.div`
  height: 300px;
  width: 250px;
  box-shadow: 0 0 10px rgba(0,0,0,0.7);
  border-radius: 10px;
  background: white;
  color: ${props => props.theme.colors.dark};
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  p {
    text-align: center;
    font-size: 1.5em;
    margin-top: 15px;
  }
  animation: ${fadeIn} 1s forwards;
`;

const Close = styled(AiOutlineCloseCircle)`
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
`;

function SubscribePopup({ handleClose }) {
  return (
    <Wrapper onClick={handleClose} >
      <Popup>
        <Close size={30} />
        <GiGarlic size={50} />
        <p>Thanks for subscribing! Watch for the weekly newsletter every Tuesday.</p>
      </Popup>
    </Wrapper>
  )
}

SubscribePopup.propTypes = {
  handleClose: PropTypes.func
}

export default SubscribePopup;