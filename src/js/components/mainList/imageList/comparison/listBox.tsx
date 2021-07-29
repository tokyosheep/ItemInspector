import * as React from "react";
import styled from "styled-components";

import path from "path";
import { ImagesDataType } from "../../../../redux/redux/placedImages";

import { turnBintoMB } from "../../../../fileSystem/fileSystem";

const ListWrapper = styled.ul`
    height: auto;
    padding: 0px;
    box-sizing: border-box;
    list-style: none;
    display: flex;
    justify-content: space-around;
    & > li{
        height: 100%;
        width: 48%;
        padding: 3px;
        border: 1px solid #999;
        box-sizing: border-box;
    }
`;

const DataList = styled.ul`
    color: #fff;
    font-size: 12px;
    font-weight: 300;
    padding-left: 20px;
    padding-right: 4px;
`;

const DataLi = styled.li<{isMatch:boolean}>`
    background: ${props=>props.isMatch ? "rgba(0,0,0,0)": "#bb4"};
    margin-bottom: 8px;
    border-bottom: 1px solid #aaa;
    word-break:break-all;
`;

export type Comparison = {
    prev:ImagesDataType,
    present:ImagesDataType
}

const Box:(props:{data:ImagesDataType,compare:ImagesDataType})=>JSX.Element = ({data,compare}) =>(
    <DataList>
        <DataLi isMatch={data.path === compare.path} >name :{path.basename(data.path)}</DataLi>
        <DataLi isMatch={data.path === compare.path} >path :{data.path}</DataLi>
        <DataLi isMatch={data.modifiedDate === compare.modifiedDate} >modified :{data.modifiedDate ?? "error"}</DataLi>
        <DataLi isMatch={data.birthTime === compare.birthTime} >birth :{data.birthTime ?? "error"}</DataLi>
        <DataLi isMatch={data.size === compare.size} >size :{data.size !== undefined ? turnBintoMB(data.size) + "MB" : "error"}</DataLi>
    </DataList>
)

const ListBox:(props:{imgData:Comparison})=>JSX.Element = ({imgData}) =>{
    const { prev } = imgData;
    const { present } = imgData;
    return(
        <ListWrapper>
            <li>
                <Box data={prev} compare={present} />
            </li>
            <li>
                <Box data={present} compare={prev} />
            </li>
        </ListWrapper>
    )
}

export default ListBox;