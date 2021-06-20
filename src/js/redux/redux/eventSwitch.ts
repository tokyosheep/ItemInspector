export type AlertEventActions = {type:"alertEvent_check",checked:boolean};

export type SaveEventActions = {type:"saveEvent_check",checked:boolean};

type AlertEventReducer = (state:boolean,action:AlertEventActions)=>boolean;

type SaveEventReducer = (state:boolean,action:SaveEventActions)=>boolean;

export const saveEventSwitch:SaveEventReducer = (state=false,action)=>{
    switch(action.type){
        case "saveEvent_check":
            return action.checked;

        default:
            return state;
    }
} 

export const alertEventSwitch:AlertEventReducer = (state=false,action)=>{
    switch(action.type){
        case "alertEvent_check":
            return action.checked;

        default:
            return state;
    }
}