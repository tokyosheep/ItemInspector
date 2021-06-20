import { ImagesDataType } from "./redux/placedImages";

type StateType = {
    documentID:string,
    saveEventSwitch:boolean,
    alertEventSwitch:boolean,
    prevItems:ImagesDataType[],
    places:ImagesDataType[]
}

export default StateType;