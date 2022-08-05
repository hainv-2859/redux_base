import { AnyAction, configureStore } from "@reduxjs/toolkit";
import { RootReducer, rootReducer, RootState } from "./rootReducer";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const enhanceHydrate =
  (reducer: RootReducer) => (state: RootState | any, action: AnyAction) => {
    if (action.type === HYDRATE) {
      return reducer({ ...state, ...action.payload }, action);
    }

    return reducer(state, action);
  };

const makeStore = () =>
  configureStore({
    reducer: enhanceHydrate(rootReducer),
    devTools: true,
    middleware: (GDM) => GDM().concat(sagaMiddleware),
  });

export const store = makeStore();
sagaMiddleware.run(rootSaga);

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = RootState;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper<AppStore>(makeStore);
