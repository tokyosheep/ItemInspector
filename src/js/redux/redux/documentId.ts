const initDocumentID = "";

export type DocumentIDActions = {type:"documentID_set",id:string};

type DocumentIDReducer = (state:string,action:DocumentIDActions)=>string;

export const documentID:DocumentIDReducer = (state=initDocumentID,action) =>{
    switch(action.type){
        case "documentID_set":
            return action.id;

        default:
            return state;
    }
}