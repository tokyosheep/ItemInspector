import { DocumentIDActions } from "../redux/documentId";

export const documentID_set:(id:string)=>DocumentIDActions = id => ({type:"documentID_set",id:id});

export type DocumentID_set = (id:string)=>void