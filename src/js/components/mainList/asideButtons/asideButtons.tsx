import * as React from "react";
import { useCallback } from "react";
import { useSelector , useDispatch } from "react-redux";
import StateType from "../../../redux/stateType";
import { placedItems_set } from "../../../redux/actions/placedImgActions";
import { loadPlacedItems , lookUpModifiedTime } from "../../../fileSystem/inspectItmes";
import { AppALert } from "../../../fileSystem/connectJSX";

import { StdButton } from "../../parts/button";

import { MainContainer } from "../../../style/container";
const { SideButtonsCompo } = MainContainer;

import { saveJSON } from "../../../fileSystem/inspectItmes";

const SideButtons = () =>{
    const dispatch = useDispatch();
    const docID = useSelector((state:StateType)=>state.documentID);
    const places = useSelector((state:StateType)=>state.places);
    const updateItems = useCallback(()=>{
        (async()=>{
            const items = await loadPlacedItems();
            if(!items)return;
            dispatch(placedItems_set(await lookUpModifiedTime(items.files)));
            await AppALert("item was loaded");
        })();
    },[places]);
    return(
        <SideButtonsCompo>
            <StdButton name="save json" func={async()=>{
                await saveJSON(places,docID);
                await AppALert("item was saved");
            }} />
            <StdButton name="load Items" func={()=>updateItems()} />
        </SideButtonsCompo>
    )
}

export default SideButtons;