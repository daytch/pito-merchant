import React from 'react'
import { css } from "@emotion/core";
// import CircleLoader from "react-spinners/CircleLoader";
import HashLoader from "react-spinners/HashLoader";
import LoadingOverlay from 'react-loading-overlay';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


const Spinner = ({ isLoading, children }) => {

    return (
        <LoadingOverlay 
            active={isLoading}
            spinner={<HashLoader
                css={override}
                size={100}
                color={"#C7FFFC"}
                loading={isLoading}
            />}
        >
            {children}
        </LoadingOverlay>
    )
}

export default Spinner;
