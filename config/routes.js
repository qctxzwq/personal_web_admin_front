export default [
  {
    path: '/',
    routes: [
      {
        path: '/user',
        component: './User/index',
        routes: [
          {
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/home',
              },
              {
                path: '/home',
                name: '首页',
                icon: 'smile',
                component: './home',
              },
              {
                path: '/admin',
                name: '管理页',
                icon: 'crown',
                component: './Admin',
                authority: ['admin'],
                routes: [
                  {
                    path: '/admin/sub-page',
                    name: 'sub-page',
                    icon: 'smile',
                    component: './home',
                    authority: ['admin'],
                  },
                ],
              },
              {
                name: '列表',
                icon: 'table',
                path: '/list',
                component: './TableList',
              },
              {
                name: 'socket内容管理',
                icon: 'MessageOutlined',
                path: '/SocketMag',
                component: './SocketMag',
              },
              {
                name: '用户管理',
                icon: 'UserSwitchOutlined',
                path: '/UserMag',
                component: './UserMag',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
