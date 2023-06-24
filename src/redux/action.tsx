import { GET_DATA, SAVE_ROOM } from "./actionTypes"

export const GetUser = (data:any) => {
  return {
    type: GET_DATA,
    data: data
  }
}

export const SaveRoom = (data:any) => {
  return {
    type: SAVE_ROOM,
    data: data
  }
}