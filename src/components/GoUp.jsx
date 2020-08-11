import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TiArrowUpOutline } from 'react-icons/ti';
import { Link as ScrollLink } from 'react-scroll';

const Wrapper = styled.div`
  transition: opacity 700ms ease;
  opacity: ${props => props.show ? '1' : '0'};
  position: fixed;
  height: ${props => props.show ? '42px' : '0'};
  width: ${props => props.show ? '42px' : '0'};
  bottom: 15px;
  right: 15px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 8px rgba(0,0,0,0.2);
  z-index: 999;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  .go-up-arrow {
    color: rgba(0,0,0,0.5);
  }
  &:hover {
    background: rgba(0,0,0,0.3);
  }
`;

function GoUp() {
  const [show, setShow] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const aboutBox = document.getElementById('about-box');
      const slider = document.getElementById('slider');
      const observer = new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting) {
          setShow(true);
        } else {
          setShow(false);
        }
      })
      observer.observe(slider);
      return () => observer.unobserve(slider);
    }
  }, []);

  return (
    <ScrollLink to={"page-top"} smooth={true}>
      <Wrapper show={show}>
        <TiArrowUpOutline className="go-up-arrow" size={20} />
      </Wrapper>
    </ScrollLink>
  )
}

export default GoUp;