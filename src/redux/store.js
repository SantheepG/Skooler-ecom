/*import { configureStore } from "@reduxjs/toolkit";

import NavReducer from "./NavReducer.reducer";
import SidebarReducer from "./SidebarReducer.reducer";

const store = configureStore({
  reducer: NavReducer,
  reducer: SidebarReducer,
});

export default store;
*/
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import NavReducer from "./NavReducer.reducer";
import SidebarReducer from "./SidebarReducer.reducer";

const rootReducer = combineReducers({
  navbar: NavReducer,
  sidebar: SidebarReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
