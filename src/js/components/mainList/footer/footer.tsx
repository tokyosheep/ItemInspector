import * as React from "react";
import { useSelector , useDispatch } from "react-redux";
import StateType from "../../../redux/stateType";
import styled from "styled-components";

import { MainContainer } from "../../../style/container";
const { FooterCompo } = MainContainer;

const IDWrapper = styled.span`
    color: #fff;
    font-size: 12px;
    font-weight: 300;
`;

const Footer = () =>{
    const ID = useSelector((state:StateType)=>state.documentID);
    return(
        <FooterCompo>
            <IDWrapper>
                document ID :{ID}
            </IDWrapper>
        </FooterCompo>
    )
}

export default Footer;