import React, {useEffect, useState} from 'react';
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
  /* bottom: 15px;
  right: 15px; */
  z-index: 600;
  /* transition: opacity 500ms ease; */
  /* opacity: ${props => props.needArrow ? '0.8' : '0'};
  pointer-events: ${props => props.needArrow ? 'auto' : 'none'}; */

`;

function ToTop() {
  const [needArrow, setNeedArrow] = useState();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const aboutBox = document.getElementById('about-box');
      const observer = new IntersectionObserver(entries => {
        console.log(entries);
        if (entries[0].boundingClientRect.top < 0) {
          setNeedArrow(true);
        } else {
          setNeedArrow(false);
        }
        // entries.forEach(entry => {
        //   entry.isIntersecting ? setNeedArrow(true) : setNeedArrow(false); 
        // })
      })
      observer.observe(aboutBox);
      return () => observer.unobserve(aboutBox);
    }
  }, [])
  return (
    <Wrapper needArrow={needArrow}>
      <ScrollLink className="scrollLink button-w-icon" to={"page-top"} smooth={true}>
        <span>
          <TiArrowUpOutline /> Top of page. <TiArrowUpOutline />
        </span>
        <p>(save your scroll finger)</p>
        {/* <TiArrowUpOutline size={30} /> */}
      </ScrollLink>
    </Wrapper>
  )
}

export default ToTop;