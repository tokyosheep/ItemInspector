import * as React from "react";
import styled from "styled-components";

import path from "path";
import { ImagesDataType } from "../../../../redux/redux/placedImages";

import { turnBintoMB } from "../../../../fileSystem/fileSystem";

const ListWrapper = styled.ul`
    height: auto;
    border: 1px solid #999;
    padding: 0;
    list-style: none;
    & > li{
        color: #fff;
        font-size: 12px;
        font-weight: 300;
    }
`;

const ListCompo:(props:{imgData:ImagesDataType})=>JSX.Element = ({imgData}) =>{
    return(
        <ListWrapper>
            <li>{path.basename(imgData.path)}</li>
            <li>{imgData.path}</li>
            <li>{imgData.modifiedDate ?? "error"}</li>
            <li>{imgData.birthTime ?? "error"}</li>
            <li>{imgData.size !== undefined ? turnBintoMB(imgData.size) + "MB" : "error"}</li>
        </ListWrapper>
    )   
}

export default ListCompo;