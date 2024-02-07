import { combineReducers, configureStore  } from "@reduxjs/toolkit"
import productReducer from "./slicers"


const rootReducer = combineReducers({
    product: productReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: { warnAfter: 128 },
        serializableCheck: { warnAfter: 128 },
      })
})