const initialSidebarState = {
  profileClicked: true,
  ordersClicked: false,
  paymentsClicked: false,
  complaintsClicked: false,
  reviewsClicked: false,
  vouchersClicked: false,
  notificationsClicked: false,
};

const SidebarReducer = (state = initialSidebarState, action) => {
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

export default SidebarReducer;
