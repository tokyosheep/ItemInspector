import * as React from "react";
import styled from "styled-components";

export type ButtonType = {
    name:string,
    func:(name:string)=>void
}

const StdButtonStyle = styled.button`
    width: 100px;
    height: 30px;
    border: 2px solid #000;
    background: linear-gradient(#222,#444);
    border-radius: 2px;
    font-size: #ffffff;
    color: #fff;
    font-size: 12px;
    cursor: pointer;
    &:focus{
        outline: none;
    }
    &:active{
        background: linear-gradient(#111,#222);
    }
`;

export const StdButton:(props:ButtonType)=>JSX.Element = ({name,func}) => <StdButtonStyle onClick={(e)=>func(name)}>{name}</StdButtonStyle>