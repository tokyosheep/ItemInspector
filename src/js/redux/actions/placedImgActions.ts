import { PlacedItemsAction , PrevItemsAction , ImagesDataType } from "../redux/placedImages";

export const placedItems_set:(files:ImagesDataType[])=>PlacedItemsAction = files =>{
    return {type:"placedItems_set",places:files};
}

export const prevItems_set:(files:ImagesDataType[])=>PrevItemsAction = files =>{
    return {type:"prevItems_set",prevs:files};
}

export type PlacedItems_set = (files:ImagesDataType[])=>void;