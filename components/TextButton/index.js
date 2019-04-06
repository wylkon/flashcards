import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components';

const Button = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.purple};
  color: #fff;
  padding: 16px;
  margin-top: 16px;
  border-radius: 4px;
`;

const StyledText = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  text-align: center;
`;

export const TextButton = ({ onPress, title }) => (
  <Button onPress={onPress}>
    <StyledText>{title}</StyledText>
  </Button>
);
