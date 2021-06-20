import * as React from "react";
import styled from "styled-components";

import path from "path";

type ListProps = {
    filePath:string,
    modifiedDate:string
}

const ListWrapper = styled.ul`
    height: 50px;
    border: 1px solid #999;
    padding: 0;
    list-style: none;
    & > li{
        color: #fff;
        font-size: 12px;
        font-weight: 300;
    }
`;

const ListCompo:(props:ListProps)=>JSX.Element = ({filePath,modifiedDate}) =>{
    return(
        <ListWrapper>
            <li>{path.basename(filePath)}</li>
            <li>{filePath}</li>
            <li>{modifiedDate}</li>
        </ListWrapper>
    )   
}

export default ListCompo;