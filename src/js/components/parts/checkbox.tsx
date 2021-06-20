import * as React from "react";
import styled from "styled-components";

import { CenterPosition } from "../../style/mixin";
import { darken } from "polished"; 

export type CheckBox<T> = {
    checked:boolean,
    arg?:T,
    func:(e:React.ChangeEvent,arg?:T)=>void,
    name:string
}

const SwitchWrapper = styled.label`
    display: block;
    width: 160px;
    height: 20px;
    background: #222;
    border: 2px solid #000;
    border-radius: 2px;
    position: relative;
    display: flex;
    justify-content: flex-start;
    color: #fff;
    font-size: 12px;
    & > input{
        display: none;
    }
`;

const SwitchBoxSlider = styled.div<{checked:boolean}>`
    position: absolute;
    width: 50%;
    height: 100%;
    border-radius: 3px;
    background: linear-gradient(#333,#555);
    top: 0;
    left: ${props=> props.checked ? (160 - 80)+"px" : 0};
    transition: .2s linear;
    z-index: 10;
    cursor: pointer;
    &:active{
        background: linear-gradient(#111,#333);
    }
`;

const SwitchOn = styled.div<{checked:boolean}>`
    width: 50%;
    height: 100%;
    position: relative;
    background: ${props=> props.checked ? "#52c082" : "#111"};
    transition: .2s linear;
`;

const SwitchOff = styled.div`
    width: 50%;
    height: 100%;
    position: relative;
    background: rgb(20,20,20);
`;

const NamePlate = styled.span`
    display: block;
    font-size: 10px;
    ${CenterPosition};
`;

export const SwitchBox:(props:CheckBox<string>)=>JSX.Element = ({name,checked,func,arg}) =>{
    return(
        <SwitchWrapper>
            <SwitchBoxSlider checked={checked}>
                <NamePlate>{name}</NamePlate>
            </SwitchBoxSlider>
            <SwitchOn checked={checked}>
                <NamePlate>
                    ON
                </NamePlate>
            </SwitchOn>
            <SwitchOff>
                <NamePlate>
                    OFF
                </NamePlate>
            </SwitchOff>
            <input type="checkbox" checked={checked} onChange={(e)=>func(e,arg)} />
        </SwitchWrapper>
    )
}