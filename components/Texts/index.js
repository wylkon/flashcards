import styled from 'styled-components';

export const StyledText = styled.Text`
  font-size: ${({ small }) => (small ? '16px' : '24px')};
  font-family: 'product-sans';
  text-align: center;
  padding: 8px 16px;
  font-weight: 200;
`;
