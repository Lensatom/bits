
const initialState = {
  userData: null,
  roomData: {},
};

export const UserReducer = (state:any = initialState, action:any) => {
  switch (action.type) {
    case "GET_DATA":
      return {
        ...state,
        userData: action.data
      };
    case "SAVE_ROOM":
      return {
        ...state,
        roomData: action.data
      };
    default:
      return state
  }
}