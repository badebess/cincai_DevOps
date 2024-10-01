import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import persistStore from "redux-persist/lib/persistStore";
import persistReducer from "redux-persist/lib/persistReducer";
import storage from "redux-persist/lib/storage";

import employees from '../store/employees/indexEployeesSplice';
import employee from '../store/employee/indexEployeeSplice';

const rootReducers = combineReducers({
    employees,
    employee,
});

const persistConfig = { key: "root", storage, backlist: ["task"] };

const pReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
    reducer: pReducer,
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware({
            serializableCheck: false,
        })
    } 
})

const persistor = persistStore(store);
export {persistor};
export default store;
