import { history } from "umi"
import { message } from "antd"
import { queryCurrent, login, query as queryUsers } from '@/services/user';
import { GetEnduranceToLocal, EnduranceToLocal } from "@/utils/endurance"
import { vaildResponse } from "@/utils/vaildMes.js"

const UserModel = {
  namespace: 'user',
  state: {
    userInfo: GetEnduranceToLocal("user_info") || {},
    token: GetEnduranceToLocal("user_token") || null
  },
  effects: {
    *login({ payload, callback }, { call, put }) {
      const response = yield call(login, payload);
      callback()
      if (vaildResponse(response)) {
        message.success("登录成功！")
        history.push("/")
        yield put({
          type: 'saveUserInfo',
          payload: response.data,
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
      const { payload } = action
      const { user_info: userInfo, token } = payload
      EnduranceToLocal("user_info", userInfo)
      EnduranceToLocal("token", token)
      return { ...state, userInfo, token }
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
