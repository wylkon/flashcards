import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled, { css } from 'styled-components';

const Button = styled(TouchableOpacity)`
  background-color: ${({ theme, secondary, alt }) =>
    secondary ? theme.colors.purple : alt ? theme.colors.lightPurple : theme.colors.darkPurple};
  padding: 16px;
  margin-top: 16px;
  border-radius: 4px;

  ${({ flex }) =>
    flex &&
    css`
      width: 48%;
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: ${({ theme }) => theme.colors.gray};
    `}
`;

const StyledText = styled(Text)`
  color: ${({ theme, alt }) => (alt ? theme.colors.darkPurple : theme.colors.white)};
  font-size: 16px;
  text-align: center;
`;

export const TextButton = ({ onPress, title, disabled, secondary, flex, alt }) => (
  <Button onPress={onPress} disabled={disabled} secondary={secondary} alt={alt} flex={flex}>
    <StyledText alt={alt}>{title}</StyledText>
  </Button>
);
