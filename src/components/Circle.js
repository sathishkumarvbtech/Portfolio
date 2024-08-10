import React from 'react';
import styled from 'styled-components';

const CircleStyle = styled.div`
position:absolute;
width:20px;
height:20px;
z-index:101;
border:2px solid #2AD882;
border-radius:50%;
transform:translate(-50%,-50%);
transition:transform 0.1s ease-out;
`;

const Circle = ({ x, y }) => {
  return (
    <CircleStyle style={{ transform: `translateX(${x}px) translateY(${y + 5}px)` }} />
  )

}

export default Circle;