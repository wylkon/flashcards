import React from 'react';
import styled, { css } from 'styled-components';
import { Text, FlatList, View } from 'react-native';
import { Container, TouchableContainer } from '../components';
import { mockData } from '../constants/mock';

import { defaultNavigation } from '../theme';

const TouchableView = styled(View)`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const ListTextStyled = styled(Text)`
  font-family: 'product-sans';
  color: ${({ theme, small }) => (small ? theme.colors.darkGray : theme.colors.dark)};
  font-size: ${({ small }) => (small ? '16px' : '18px')};
  ${({ small, theme }) =>
    small &&
    css`
      background-color: ${theme.colors.gray};
      padding: 4px 11px;
      border-radius: 50px;
    `}
`;

export default class HomeScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <FlatList
          data={mockData}
          renderItem={({ item }) => (
            <TouchableContainer onPress={() => navigate('Links')} underlayColor="white">
              <TouchableView>
                <ListTextStyled>{item.title}</ListTextStyled>
                <ListTextStyled small as={View}>
                  <ListTextStyled>{item.questions.length}</ListTextStyled>
                </ListTextStyled>
              </TouchableView>
            </TouchableContainer>
          )}
        />
      </Container>
    );
  }
}
