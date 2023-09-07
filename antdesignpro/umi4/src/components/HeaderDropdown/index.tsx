import { Dropdown } from 'antd';
import type { DropDownProps } from 'antd/es/dropdown';
import React from 'react';
import { useEmotionCss } from '@ant-design/use-emotion-css';
// 根据props动态生成类名
import classNames from 'classnames';

export type HeaderDropdownProps = {
  overlayClassName?: string;
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter';
} & Omit<DropDownProps, 'overlay'>;

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ overlayClassName: cls, ...restProps }) => {
  const className = useEmotionCss(({ token }) => {
    return {
      [`@media screen and (max-width: ${token.screenXS})`]: {
        width: '100%',
      },
    };
  });
  return <Dropdown overlayClassName={classNames(className, cls)} {...restProps} />;
};

export default HeaderDropdown;
