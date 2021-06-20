import { AlertEventActions , SaveEventActions } from "../redux/eventSwitch";

export const alertEvent_check:(checked:boolean)=>AlertEventActions = checked => ({type:"alertEvent_check",checked:checked});

export const saveEvent_check:(checked:boolean)=>SaveEventActions = checked =>({type:"saveEvent_check",checked:checked});
