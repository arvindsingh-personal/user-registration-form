const initialValues: any = {
  listOfUsers: [],
};

const formReducer = (state: any = initialValues, action: any) => {
  // actions should been written
  switch (action.type) {
    case "add_user":
      return {
        listOfUsers: [...state.listOfUsers, action.payload],
      };
    default:
      return state;
  }
};
export default formReducer;
