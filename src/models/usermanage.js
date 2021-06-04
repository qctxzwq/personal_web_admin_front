const UserManageModel = {
  namespace: 'user_manage',
  state: {
  },
  effects: {
    *addUser({ payload, callback }, { call, put }) {
      console.log(payload);

    }
  },
  reducers: {
  }
}

export default UserManageModel;