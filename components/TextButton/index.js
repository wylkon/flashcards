import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled, { css } from 'styled-components';

const Button = styled(TouchableOpacity)`
  background-color: ${({ theme, secondary }) => (secondary ? theme.colors.purple : theme.colors.darkPurple)};
  color: #fff;
  padding: 16px;
  margin-top: 16px;
  border-radius: 4px;

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: ${({ theme }) => theme.colors.gray};
    `}
`;

const StyledText = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  text-align: center;
`;

export const TextButton = ({ onPress, title, disabled, secondary }) => (
  <Button onPress={onPress} disabled={disabled} secondary={secondary}>
    <StyledText>{title}</StyledText>
  </Button>
);
