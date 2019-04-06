import React from 'react';
import { Icon } from 'expo';
import { theme } from '../../theme';

export default class TabBarIcon extends React.Component {
  render() {
    const { name, focused } = this.props;

    return (
      <Icon.Ionicons
        name={name}
        size={30}
        style={{ marginBottom: -10 }}
        color={focused ? theme.colors.purple : theme.colors.gray}
      />
    );
  }
}
