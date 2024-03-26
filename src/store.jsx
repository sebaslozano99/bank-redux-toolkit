import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/account/accountSlice";
import customerReducer from "./features/customer/customerSlice";

const store = configureStore({
    reducer: {
        account: accountReducer,
        customer: customerReducer,
    }
})


export default store;



// old way of doing this 

// import { createStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
// import { thunk } from "redux-thunk";

// const rootReducer = combineReducers({
//     account: accountReducer,
//     customer: customerReducer,
// })
// const storeTwo = createStore(rootReducer, applyMiddleware(thunk));

// export default storeTwo;

