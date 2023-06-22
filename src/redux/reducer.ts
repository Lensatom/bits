
const initialState = null;

export const UserReducer = (state:any = initialState, action:any) => {
  switch (action.type) {
    case "GET_DATA":
      return action.data;
    default:
      return state
  }
}