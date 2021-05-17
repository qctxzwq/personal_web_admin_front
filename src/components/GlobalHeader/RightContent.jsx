import React from 'react';
import { connect } from 'umi';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import './index.less';

const GlobalHeaderRight = (props) => {
  const { theme, layout } = props;
  let className = "right";

  if (theme === 'dark' && layout === 'top') {
    className = `right dark`;
  }

  return (
    <div className={className}>
      <HeaderSearch
        className="action search"
        placeholder="Site Search"
        defaultValue="umi ui"
        options={[
          {
            label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>,
            value: 'umi ui',
          }]}
      />
      <Avatar />
    </div>
  );
};

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
