import * as React from "react";
import { useCallback } from "react";
import { useSelector , useDispatch } from "react-redux";
import StateType from "../../../redux/stateType";
import styled from "styled-components";

import { MainContainer } from "../../../style/container";
const { ImageListCompo } = MainContainer;

import ListCompo from "./listCompo/listCompo";

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
    const prevList = prevItems.map((f,i)=><li key={i}><ListCompo filePath={f.path} modifiedDate={f.modifiedDate} /></li>);
    const placeList = places.map((f,i)=><li key={i}><ListCompo filePath={f.path} modifiedDate={f.modifiedDate} /></li>);
    return(
        <ImageListCompo>
            <ListTitle>previous items</ListTitle>
            <FileListWrapper>
                {prevList}
            </FileListWrapper>
            <ListTitle>placed items</ListTitle>
            <FileListWrapper>
                {placeList}
            </FileListWrapper>
        </ImageListCompo>
    )
}

export default ImageList;