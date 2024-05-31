import { combineReducers } from "@reduxjs/toolkit"
import { SAVE_TOKEN, SET_LOADING } from "./actions"
import { HYDRATE } from "next-redux-wrapper"

const initialState = {
    token:"",
    isLoading: false
}

const globalReducer = (state = initialState, action: any) => {

    switch (action.type) {
        case HYDRATE:
            return {
                ...state,
                ...action.payload.global
            }
        case SAVE_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        default:
            return state
    }

   
    
}


const rootReducer = combineReducers<any>({
    global: globalReducer,
});
  
  export default rootReducer;