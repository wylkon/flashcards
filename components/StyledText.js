import React from 'react';
import styled from 'styled-components';
import { Text } from 'react-native';

export const StyledText = styled(Text)`
  font-size: 16;
  font-family: 'product-sans';
  color: #f0f;
`;

export class MonoText extends React.Component {
  render() {
    return <StyledText {...this.props} />;
  }
}
