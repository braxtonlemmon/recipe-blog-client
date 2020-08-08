import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import {
  FacebookShareButton,
  EmailShareButton,
  PinterestShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  EmailIcon,
  PinterestIcon,
  RedditIcon,
  TwitterIcon,
  WhatsappIcon
} from 'react-share';

const fadeIn = keyframes`
  0% { opacity: 0 }
  100% { opacity: 1 }
`;
const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 800;
  background: rgba(0,0,0,0.4);
  animation: ${fadeIn} 600ms forwards;
`;


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  box-shadow: 0 0 8px rgba(0,0,0,0.7);
  padding: 10px 10px 20px 10px;
  position: relative;
  border-radius: 10px;
  @media (min-width: 768px) {
    padding:
  }
`;

const Icons = styled.div`
  display: flex;
  margin-top: 10px;

  .share-icon {
    margin: 0 4px;
    transform: scale(1.0);
    transition: transform 150ms ease;
    &:hover {
      transform: scale(1.03);
    }
    @media (min-width: 412px) {
      height: 48px;
      width: 48px;
    }
    @media (min-width: 768px) {
      height: 52px;
      width: 52px;
      margin: 0 10px;
    }
    @media (min-width: 1024px) {
      height: 55px;
      width: 55px;
      margin: 0 12px;
    }
  }
`;

const Close = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
  .share-links-close {
    position: absolute;
    top: 0; 
    right: 0;
    cursor: pointer;
    &:hover {
      color: ${props => props.theme.colors.pale};
    }
  }
  p {
    padding-top: 10px;
    font-weight: bolder;
    font-size: 1.1em;
    @media (min-width: 768px) {
      font-size: 1.3em;
    }
  }
`;

function ShareLinks({ setViewShare }) {
  const url='www.peelthegarlic.com/recipe/spanish-tortilla';
  const size = 37;

  const handleCloseShare = () => {
    setViewShare(false);
  }

  return (
    <Container onClick={handleCloseShare} >
      <Wrapper>
        <Close onClick={handleCloseShare}>
          <p>Yum. Yum. Share it!</p>
          <AiOutlineCloseCircle className="share-links-close" size={30} />
        </Close>
        <Icons>
          <FacebookShareButton url={url}>
            <FacebookIcon size={size} round={true} className="share-icon" />
          </FacebookShareButton>
  
          <EmailShareButton url={url}>
            <EmailIcon size={size} round={true} className="share-icon" />
          </EmailShareButton>
  
          <TwitterShareButton url={url}>
            <TwitterIcon size={size} round={true} className="share-icon" />
          </TwitterShareButton>
  
          <PinterestShareButton url={url}>
            <PinterestIcon size={size} round={true} className="share-icon" />
          </PinterestShareButton>
  
          <RedditShareButton url={url}>
            <RedditIcon size={size} round={true} className="share-icon" />
          </RedditShareButton>
  
          <WhatsappShareButton url={url}>
            <WhatsappIcon size={size} round={true} className="share-icon" />
          </WhatsappShareButton>
        </Icons>
      </Wrapper>
    </Container>
  )
}

ShareLinks.propTypes = {
  setViewShare: PropTypes.func
}

export default ShareLinks;