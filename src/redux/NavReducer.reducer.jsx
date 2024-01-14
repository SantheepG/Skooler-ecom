const initialNavbarState = {
  homeClicked: false,
  productsClicked: false,
  eventsClicked: false,
  cartClicked: false,
  userClicked: false,
  productViewClicked: false,
};

const NavReducer = (state = initialNavbarState, action) => {
  switch (action.type) {
    case "SET_CLICKED":
      const newFlags = Object.keys(state).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});

      newFlags[action.payload.item] = action.payload.value;

      return {
        ...newFlags,
      };
    default:
      return state;
  }
};

export default NavReducer;
