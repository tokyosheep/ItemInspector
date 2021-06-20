import * as React from "react";
import { useMemo } from "react";
import { useCallback } from "react";
import { useSelector , useDispatch } from "react-redux";
import StateType from "../../../redux/stateType";
import styled from "styled-components";

import { alertEvent_check , saveEvent_check } from "../../../redux/actions/eventSwitch";

import { SwitchBox } from "../../parts/checkbox";

import { MainContainer } from "../../../style/container";
const { HeaderCompo } = MainContainer;

const Title = styled.h1`
    margin: 5px;
    font-size: 20px;
    color: #fff;
    font-weight: 300;
`;

const SwitchWrapper = styled.div`
    display: flex;
    justify-content: space-around;
`;

const Header = () =>{
    const dispatch = useDispatch();
    const saveEvent = useSelector((state:StateType)=>state.saveEventSwitch);
    const alertEvent = useSelector((state:StateType)=>state.alertEventSwitch);
    const handleSaveEvent = useCallback((e)=>dispatch(saveEvent_check(e.target.checked)),[saveEvent]);
    const handleAlertEvent = useCallback((e)=>dispatch(alertEvent_check(e.target.checked)),[alertEvent]);
    return(
        <HeaderCompo>
            <Title>Item Inspector</Title>
            <SwitchWrapper>
                <SwitchBox name="save" func={handleSaveEvent} checked={saveEvent} />
                <SwitchBox name="alert" func={handleAlertEvent} checked={alertEvent} />
            </SwitchWrapper>
        </HeaderCompo>
    )
}

export default Header;