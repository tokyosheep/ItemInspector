export type ImagesDataType = {
    path:string,
    modifiedDate:string
}

const initImages:ImagesDataType[] = [];

export type PlacedItemsAction = {type:"placedItems_set",places:ImagesDataType[]};

export type PrevItemsAction = {type:"prevItems_set",prevs:ImagesDataType[]};

type PlacedItemsReducer = (state:ImagesDataType[],action:PlacedItemsAction)=>ImagesDataType[];

type PrevItemsReducer = (state:ImagesDataType[],action:PrevItemsAction)=>ImagesDataType[];

export const prevItems:PrevItemsReducer = (state=[...initImages],action)=>{
    switch(action.type){
        case "prevItems_set":
            return [...action.prevs];

        default:
            return state;
    }
}

export const places:PlacedItemsReducer = (state=[...initImages],action)=>{
    switch(action.type){
        case "placedItems_set":
            return [...action.places];

        default:
            return state;
    }
}