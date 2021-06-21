import * as React from "react";
import { useCallback } from "react";
import { useSelector , useDispatch } from "react-redux";
import StateType from "../../../redux/stateType";
import { placedItems_set } from "../../../redux/actions/placedImgActions";
import { documentID_set } from "../../../redux/actions/documentActions";
import { loadPlacedItems , lookUpModifiedTime , loadDocumentID } from "../../../fileSystem/inspectItmes";
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
            dispatch(placedItems_set(await lookUpModifiedTime(items.files,items.doc)));
            await AppALert("item was loaded");
        })();
    },[places]);
    const updateID = useCallback(()=>{
        (async()=>{
            const id = await loadDocumentID();
            if(!id){
                await AppALert("can't recognize document id. suppose you haven't saved document");
                return;
            }
            dispatch(documentID_set(id));
        })();
    },[docID]);
    return(
        <SideButtonsCompo>
            <StdButton name="save json" func={async()=>{
                if(!await saveJSON(places,docID))return;
                await AppALert("item was saved");
            }} />
            <StdButton name="load Items" func={()=>updateItems()} />
            <StdButton name="load id" func={()=>updateID()} />
        </SideButtonsCompo>
    )
}

export default SideButtons;