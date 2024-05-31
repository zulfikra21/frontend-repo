export const SAVE_TOKEN = "SAVE_TOKEN";
export const SET_LOADING = "SET_LOADING";
export const GET_TOKEN = "GET_TOKEN";

export const saveToken = (token: string) => ({ type: SAVE_TOKEN, payload: token });
export const setLoading = (laoding: boolean) => ({ type: SET_LOADING, payload: laoding })
export const getToken = () => ({ type: GET_TOKEN })