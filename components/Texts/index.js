import styled from 'styled-components';

export const StyledText = styled.Text`
  color: ${({ alt, theme }) => (alt ? theme.colors.purple : theme.colors.dark)};
  font-family: 'product-sans';
  font-size: ${({ small }) => (small ? '16px' : '24px')};
  font-weight: 200;
  padding: 8px 16px;
  text-align: center;
`;
