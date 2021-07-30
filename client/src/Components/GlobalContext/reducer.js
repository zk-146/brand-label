export const initialState = {
  user: null,
  isWishlisted: null,
  cart: null,
  totalCartProducts: null,
  cartProducts: null,
  isAuth: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
        isAuth: action.isAuth,
      };
    case "REMOVE_USER":
      return {
        ...state,
        user: action.user,
        isAuth: action.isAuth,
      };
    case "SET_WISHLIST":
      return {
        ...state,
        isWishlisted: action.isWishlisted,
      };
    case "SET_CART":
      return {
        ...state,
        cart: action.cart,
      };
    case "SET_TOTALCARTPRODUCTS":
      return {
        ...state,
        totalCartProducts: action.totalCartProducts,
      };
    default:
      return state;
  }
};

export default reducer;
