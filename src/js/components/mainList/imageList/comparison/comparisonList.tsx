import * as React from "react";
import { useCallback } from "react";
import { useSelector , useDispatch } from "react-redux";
import StateType from "../../../../redux/stateType";
import styled from "styled-components";

import ListBox from "./listBox";

const FileListWrapper = styled.ul`
    width: 100%;
    padding: 2px;
    box-sizing:border-box;
    list-style: none;
    border: 1px solid #fff;
`;

const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 20px;
`;

const Title = styled.h2`
    font-size: 14px;
    font-weight: 300;
    color: #fff;
    text-align: center;
    width: 50%;
`;

const ComparisonList = () =>{
    const prevItems = useSelector((state:StateType)=>state.prevItems);
    const places = useSelector((state:StateType)=>state.places);
    const lists = prevItems.map((prev,index)=><li key={index}><ListBox imgData={{prev:prev,present:places[index]}} ></ListBox></li>);
    return(
        <>
            <TitleWrapper>
                <Title>
                    previous
                </Title>
                <Title>
                    present
                </Title>
            </TitleWrapper>
            <FileListWrapper>
                {lists}
            </FileListWrapper>
        </>
    )
}

export default ComparisonList;