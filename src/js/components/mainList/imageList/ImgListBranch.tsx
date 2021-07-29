import * as React from "react";
import { useCallback } from "react";
import { useSelector , useDispatch } from "react-redux";
import StateType from "../../../redux/stateType";
import styled from "styled-components";

import { MainContainer } from "../../../style/container";
const { ImageListCompo } = MainContainer;

import ComparisonList from "./comparison/comparisonList";
import ImageList from "./listCompo/imageList";

const ImgListBranch = () =>{
    const prevItems = useSelector((state:StateType)=>state.prevItems);
    const places = useSelector((state:StateType)=>state.places);
    const flag = (prevItems.length===places.length&&prevItems.every((prev,index)=>{
        return prev.path === places[index].path;
    }));
    console.log(flag);
    return(
        <ImageListCompo>
            {
                flag 
                ?
                    <ComparisonList />
                :
                    <ImageList />
                
            }
        </ImageListCompo>
    )
}

export default ImgListBranch;