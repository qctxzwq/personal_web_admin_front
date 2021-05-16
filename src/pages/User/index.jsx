import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, connect } from 'umi';
import React from 'react';
import MyFooter from '@/components/Footer'
import './index.less';

const UserLayout = (props) => {
    const {
        children,
    } = props;
    return (
        <HelmetProvider>
            <Helmet>
                <title>登录页</title>
                <meta name="" content={"登录页"} />
            </Helmet>

            <div className="container">
                <div className="content">
                    <div className="center">
                        <div className="top">
                            <div className="header">
                                <Link to="/">
                                    <span className="title">后台管理</span>
                                </Link>
                            </div>
                            <div className="desc">
                                秦川一夜尽风雪，人间自此止兵戈。
                            </div>
                        </div>
                        {children}
                    </div>
                </div>
                <div className="footer">
                    <MyFooter />
                </div>
            </div>
        </HelmetProvider>
    );
};

export default UserLayout
