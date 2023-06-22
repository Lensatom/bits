import { GET_DATA } from "./actionTypes"

export const GetUser = (data:any) => {
  return {
    type: GET_DATA,
    data: data
  }
}