import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link as ScrollLink } from 'react-scroll';
import { FaPrint } from 'react-icons/fa';
import { TiArrowDownOutline } from 'react-icons/ti';

const Links = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-area: links;
  margin: 15px 0;
  padding: 10px 0;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  text-align: center;
  .links-buttons {
    display: flex;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-flow: column;
    gap: 10px;
    margin-top: 10px;
    width: 100%;
    justify-content: center;
  }
`;

function Shortcuts({ handlePrint }) {
  return (
    <Links>
      <p>Psst! Some shortcuts just for you...</p>
      <div className="links-buttons">
        <ScrollLink className="scrollLink button-w-icon" to={"about-end"} smooth={true}>
          Recipe
              <TiArrowDownOutline />
        </ScrollLink>
        <ScrollLink className="scrollLink button-w-icon" to={"steps-end"} smooth={true}>
          Comments
              <TiArrowDownOutline />
        </ScrollLink>
        <div className="scrollLink button-w-icon" onClick={handlePrint}>
          <p>Print</p>
          <FaPrint />
        </div>
      </div>
    </Links>
  )
}

Shortcuts.propTypes = {
  handlePrint: PropTypes.func
}

export default Shortcuts;
