import { create } from "domain";
import { combineReducers , createStore } from "redux";

import { documentID } from "../redux/documentId";
import { saveEventSwitch , alertEventSwitch } from "../redux/eventSwitch";
import { prevItems , places } from "../redux/placedImages";

const rootReducer = combineReducers({
    alertEventSwitch,
    saveEventSwitch,
    documentID,
    prevItems,
    places
});

const configStore = () => createStore(rootReducer);

export default configStore;