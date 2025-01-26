import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="overlay">
        <div className="loader">
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }

  .loader {
    display: flex;
    align-items: center;
  }

  .bar {
    display: inline-block;
    width: 3px;
    height: 20px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    animation: scale-up4 1s linear infinite;
  }

  .bar:nth-child(2) {
    height: 35px;
    margin: 0 5px;
    animation-delay: 0.25s;
  }

  .bar:nth-child(3) {
    animation-delay: 0.5s;
  }

  @keyframes scale-up4 {
    20% {
      background-color: #fff;
      transform: scaleY(1.5);
    }

    40% {
      transform: scaleY(1);
    }
  }
`;

export default Loader;
