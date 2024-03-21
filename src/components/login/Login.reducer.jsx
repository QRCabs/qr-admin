export const Login_Reducer = (state = { token: true }, action) => {
  switch (action.type) {
    case 1:
      return {
        loading: true,
      };

    case 2:
      return {
        loading: false,
        success: true,
      };

    case 3:
      return {
        loading: false,
        success: false,
      };

    default:
      return state;
  }
};
