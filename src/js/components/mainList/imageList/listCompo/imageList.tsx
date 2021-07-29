import * as React from "react";
import { useCallback } from "react";
import { useSelector , useDispatch } from "react-redux";
import StateType from "../../../../redux/stateType";
import styled from "styled-components";

import ListCompo from "./listCompo";

const Caution = styled.h2`
    font-size: 20px;
    font-weight: 300;
    color: #fff;
    margin: 3px;
`;

const ListTitle = styled.h3`
    color: #fff;
    font-size: 14px;
    font-weight: 300;
    margin: 3px;
`;

const FileListWrapper = styled.ul`
    width: 100%;
    padding: 2px;
    box-sizing:border-box;
    list-style: none;
    border: 1px solid #fff;
`;

const ImageList = () =>{
    const prevItems = useSelector((state:StateType)=>state.prevItems);
    const places = useSelector((state:StateType)=>state.places);
    const prevList = prevItems.map((f,i)=><li key={i}><ListCompo imgData={f} /></li>);
    const placeList = places.map((f,i)=><li key={i}><ListCompo imgData={f} /></li>);
    return(
        <>
            <Caution>files did't match previous files </Caution>
            <ListTitle>previous items</ListTitle>
            <FileListWrapper>
                {prevList}
            </FileListWrapper>
            <ListTitle>placed items</ListTitle>
            <FileListWrapper>
                {placeList}
            </FileListWrapper>
        </>
    )
}

export default ImageList;