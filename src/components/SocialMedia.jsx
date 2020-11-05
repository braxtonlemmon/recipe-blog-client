import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FaInstagram, FaGithub, FaFacebook, FaTwitter, FaPinterest } from 'react-icons/fa';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0;
  .social-media-icon {
    margin: ${props => props.menu ? '5px 8px' : '5px 15px'};
    /* margin: 5px 15px; */
    cursor: pointer;
    color: ${props => props.inverse === true ? 'white' : props.theme.colors.dark};
    &:hover {
      color: ${props => props.theme.colors.pale};
    }
  }
`;

function SocialMedia({ inverse, menu }) {
  const size = 40;
  return (
    <Wrapper inverse={inverse} menu={menu}>
      <a
        href="https://www.pinterest.com/peelthegarlic"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Go to peel the garlic pinterest."
      >
        <FaPinterest size={size} className="social-media-icon" />
      </a>
      <a
        href="https://www.instagram.com/peelthegarlic/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Go to peel the garlic instagram."
      >
        <FaInstagram size={size} className="social-media-icon" />
      </a>
      <a
        href="https://www.facebook.com/Peel-the-Garlic-105045281272206"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Go to peel the garlic facebook."
      >
        <FaFacebook size={size} className="social-media-icon" />
      </a>
      <a
        href="https://twitter.com/PeelGarlic"
        target="blank"
        rel="noopener noreferrer"
        aria-label="Go to peel the garlic twitter."
      >
        <FaTwitter size={size} className="social-media-icon" />
      </a>
      <a
        href="https://github.com/braxtonlemmon"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Go to peel the garlic github."
      >
        <FaGithub size={size} className="social-media-icon" />
      </a>
    </Wrapper>
  )
}

SocialMedia.propTypes = {
  inverse: PropTypes.bool
}

export default SocialMedia;