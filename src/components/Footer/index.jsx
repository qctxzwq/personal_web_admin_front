import React from 'react'
import {DefaultFooter} from "@ant-design/pro-layout"
import { GithubOutlined } from "@ant-design/icons"
import "./index.less"

class MyFooter extends React.Component {
    render() {
        return <DefaultFooter
            copyright={`${new Date().getFullYear()} Produced by Ant Group Experience Technology Department`}
            links={[
                {
                    key: 'github',
                    title: <GithubOutlined />,
                    href: 'https://github.com/qctxzwq',
                    blankTarget: true,
                },
            ]}
        />
    }
}

export default MyFooter