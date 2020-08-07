import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FaInstagram, FaGithub, FaFacebook } from 'react-icons/fa';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0;
  .social-media-icon {
    margin: 5px 10px;
    cursor: pointer;
    color: ${props => props.inverse === true ? 'white' : props.theme.colors.dark};
    &:hover {
      color: ${props => props.theme.colors.pale};
    }
  }
`;

function SocialMedia({ inverse }) {
  const size = 40;
  return (
    <Wrapper inverse={inverse}>
      <a
        href="https://www.instagram.com/peelthegarlic/"
        target="_blank"
        rel="noopener"
        rel="noreferrer"
      >
        <FaInstagram size={size} className="social-media-icon" />
      </a>
      <a
        href="https://www.facebook.com/Peel-the-Garlic-105045281272206"
        target="_blank"
        rel="noopener"
        rel="noreferrer"
      >
        <FaFacebook size={size} className="social-media-icon" />
      </a>
      <a
        href="https://github.com/braxtonlemmon"
        target="_blank"
        rel="noopener"
        rel="noreferrer"
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