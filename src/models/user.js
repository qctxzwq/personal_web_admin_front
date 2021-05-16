import { queryCurrent, login, query as queryUsers } from '@/services/user';
import { vaildResponse } from "@/utils/vaildMes.js"

const UserModel = {
  namespace: 'user',
  state: {
    userInfo: {}
  },
  effects: {
    *login({ payload, callback }, { call, put }) {
      const response = yield call(login, payload);
      if (vaildResponse(response)) {
        console.log(response)
        callback()
        yield put({
          type: 'saveUserInfo',
          payload: response,
        });
      }
    },
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },
  reducers: {
    saveUserInfo(state, action) {
      const {payload} = action
      console.log(payload)
      return state

    },
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
