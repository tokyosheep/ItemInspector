import * as React from "react";
import { useSelector ,useDispatch } from "react-redux";
import StateType from "../redux/stateType";
import { useMemo , useEffect } from "react";
import { placedItems_set , prevItems_set } from "../redux/actions/placedImgActions";
import { documentID_set } from "../redux/actions/documentActions";
import styled from "styled-components";
import { csInterface } from "../fileSystem/init";
import { createGlobalStyle } from "styled-components";
import { init } from "../fileSystem/init";
import { saveEvent_check , alertEvent_check } from "../redux/actions/eventSwitch";
import { saveJSON  , loadPlacedItems , lookUpModifiedTime} from "../fileSystem/inspectItmes";
import { compareItems } from "../fileSystem/eventFunc";

import { dispatchAfterActivate } from "../fileSystem/eventFunc";
import MainPage from "./mainPage";


const GlobalStyle = createGlobalStyle`
    body{
        margin: 0;
        font-family: "Helvetica Neue" , Helvetica , Arial , Verdana , Roboto , "游ゴシック" , "Yu Gothic" , "游ゴシック体" , "YuGothic" , "ヒラギノ角ゴ Pro W3" , "Hiragino Kaku Gothic Pro" , "Meiryo UI" , "メイリオ" , Meiryo , "ＭＳ Ｐゴシック" , "MS PGothic" , sans-serif;
        background: #222;
    }
`;

const recordJSONAfterSave = async(docID) =>{
    const items = await loadPlacedItems();
    if(!items)return;
    saveJSON(await lookUpModifiedTime(items.files),docID);
}

const Layout = () =>{
    const dispatch = useDispatch();
    const saveEvent = useSelector((state:StateType)=>state.saveEventSwitch);
    const alertEvent = useSelector((state:StateType)=>state.alertEventSwitch);
    const places = useSelector((state:StateType)=>state.places);
    const prevs = useSelector((state:StateType)=>state.prevItems);
    const docID = useSelector((state:StateType)=>state.documentID);
    useMemo(()=>{
        /*　引数の内容を更新するためイベントは常に更新させる */
        csInterface.removeEventListener("documentAfterSave",()=>recordJSONAfterSave(docID));
        if(saveEvent)csInterface.addEventListener("documentAfterSave",()=>recordJSONAfterSave(docID));
    },[saveEvent,docID]);
    useEffect(()=>{
        if(alertEvent){
            console.log(prevs);
            console.log(places);
            compareItems(places,prevs);
        }
    },[prevs]);
    
    const setStatus = async()=>{
        const status = await dispatchAfterActivate();
        console.log(status);
        dispatch(placedItems_set(status.places ? status.places : []));
        dispatch(prevItems_set(status.prev ? status.prev : []));
        dispatch(documentID_set(status.id　? status.id : ""));
    }
    useMemo(()=>{
        init();
        setStatus();
        csInterface.addEventListener("documentAfterActivate",setStatus);
        csInterface.addEventListener("com.adobe.csxs.events.WindowVisibilityChanged",(e)=>{
            /* windowが閉じたらイベント停止 */
            if(!e.data){
                dispatch(saveEvent_check(false));
                dispatch(alertEvent_check(false));
                csInterface.removeEventListener("documentAfterActivate",setStatus);
            }else{
                csInterface.addEventListener("documentAfterActivate",setStatus);
                setStatus();
            }
        });
    },[]);
    return(
        <>
            <GlobalStyle>
            </GlobalStyle>
            <MainPage />
        </>
    )
}

export default Layout;