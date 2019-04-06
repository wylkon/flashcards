import React from 'react';
import styled from 'styled-components';
import { Text } from 'react-native';

export const StyledText = styled(Text)`
  font-size: 24px;
  font-family: 'product-sans';
  text-align: center;
  padding: 8px 16px;
  font-weight: 200;
`;

export class MonoText extends React.Component {
  render() {
    return <StyledText {...this.props} />;
  }
}
