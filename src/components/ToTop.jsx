import React from 'react';
import styled from 'styled-components';
import { Link as ScrollLink } from 'react-scroll';
import { TiArrowUpOutline } from 'react-icons/ti';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  grid-area: toTop;
  margin-top: 30px;
  position: fixed;
  position: relative;
  z-index: 600;

`;

function ToTop() {
  return (
    <Wrapper>
      <ScrollLink className="scrollLink button-w-icon" to={"page-top"} >
        <span>
          <TiArrowUpOutline /> Top of page. <TiArrowUpOutline />
        </span>
        <p>(save your scroll finger)</p>
      </ScrollLink>
    </Wrapper>
  )
}

export default ToTop;