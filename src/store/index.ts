import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { userApi } from "@/app/user/service";
import { departmentApi } from "@/app/department/service";
import { roomApi } from "@/app/room/service";
import { checkRoomApi } from "@/app/check-list/service";
import { reportApi } from "@/app/service";

export function makeStore() {
  return configureStore({
    reducer: {
      [userApi.reducerPath]: userApi.reducer,
      [departmentApi.reducerPath]: departmentApi.reducer,
      [roomApi.reducerPath]: roomApi.reducer,
      [checkRoomApi.reducerPath]: checkRoomApi.reducer,
      [reportApi.reducerPath]: reportApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        userApi.middleware,
        departmentApi.middleware,
        roomApi.middleware,
        checkRoomApi.middleware,
        reportApi.middleware,
      ]),
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
