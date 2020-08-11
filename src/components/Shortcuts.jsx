import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link as ScrollLink } from 'react-scroll';
import { FaPrint } from 'react-icons/fa';
import { TiArrowDownOutline } from 'react-icons/ti';
import { GrShareOption } from "react-icons/gr"

const Links = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-area: links;
  margin: 15px 0;
  padding: 15px 0;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  text-align: center;
  .links-buttons {
    display: grid;
    display: flex;
    flex-wrap: wrap;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-flow: column;
    gap: 10px;
    margin-top: 10px;
    width: 100%;
    max-width: 330px;
    justify-content: center;
    @media (min-width: 600px) {
      max-width: 650px;
    }
  }
  .button-w-icon {
    width: 120px;
  }
`;

function Shortcuts({ handlePrint, handleShare, setViewShare }) {
  const handleOpenShare = () => {
    setViewShare(true);
  }
  const path = typeof window !== 'undefined' ? window.location.pathname : '';
  const url = `https://www.peelthegarlic.com${path}`

  return (
    <Links>
      <p>Psst! Some shortcuts just for you...</p>
      <div className="links-buttons">
        <ScrollLink
          className="scrollLink button-w-icon"
          to={"about-end"}
          smooth={true}
        >
          Recipe
          <TiArrowDownOutline />
        </ScrollLink>
        <ScrollLink
          className="scrollLink button-w-icon"
          to={"steps-end"}
          smooth={true}
        >
          Comments
          <TiArrowDownOutline />
        </ScrollLink>
        <div className="scrollLink button-w-icon" onClick={handlePrint}>
          <p>Print</p>
          <FaPrint />
        </div>
        <div className="scrollLink button-w-icon" onClick={handleOpenShare}>
          <p>Share</p>
          <GrShareOption />
        </div>
      </div>
    </Links>
  )
}

Shortcuts.propTypes = {
  handlePrint: PropTypes.func,
  handleShare: PropTypes.func,
  setViewShare: PropTypes.func
}

export default Shortcuts;
