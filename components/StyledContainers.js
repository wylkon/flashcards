import styled from 'styled-components';
import { View, TouchableOpacity } from 'react-native';

export const Container = styled(View)`
  background-color: ${({ theme }) => theme.colors.lightGray};
  flex: 1;
`;

export const TouchableContainer = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom-color: ${({ theme }) => theme.colors.borderGray};
  border-bottom-width: 1px;
  padding: 16px;
`;
