import { css } from '@emotion/react';

// ref: https://projects.lukehaas.me/css-loaders/

const loading = css`
  font-size: 10px;
  margin: 50px auto;
  text-indent: -9999em;
  width: 11em;
  height: 11em;
  border-radius: 50%;
  background: #3da9fc;
  background: -moz-linear-gradient(
    left,
    #3da9fc 10%,
    rgba(61, 169, 252, 0) 42%
  );
  background: -webkit-linear-gradient(
    left,
    #3da9fc 10%,
    rgba(61, 169, 252, 0) 42%
  );
  background: -o-linear-gradient(left, #3da9fc 10%, rgba(61, 169, 252, 0) 42%);
  background: -ms-linear-gradient(left, #3da9fc 10%, rgba(61, 169, 252, 0) 42%);
  background: linear-gradient(to right, #3da9fc 10%, rgba(61, 169, 252, 0) 42%);
  position: relative;
  -webkit-animation: load3 1.4s infinite linear;
  animation: load3 1.4s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);

  &:before {
    width: 50%;
    height: 50%;
    background: #3da9fc;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }

  &:after {
    background: #ffffff;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  @-webkit-keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

export const Loading = () => {
  return <div css={loading} />;
};
