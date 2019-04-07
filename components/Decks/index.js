import React from 'react';

import styled, { css } from 'styled-components';
import { Text, FlatList, View, Platform } from 'react-native';
import { func } from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

import { TextButton } from '../TextButton';
import { StyledText } from '../Texts';
import { TouchableContainer } from '../Containers';
import { theme } from '../../theme';

const TouchableView = styled(View)`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const ViewStyled = styled(View)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1;
  justify-content: center;
  padding: 0 16px;
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

export const Decks = ({ navigationHandler, decks }) => {
  return decks && Object.keys(decks).length ? (
    <FlatList
      data={Object.entries(decks)}
      keyExtractor={item => item[1].title}
      renderItem={({ item }) => (
        <TouchableContainer
          onPress={() => navigationHandler('Deck', { title: item[1].title })}
          underlayColor={theme.colors.white}>
          <TouchableView>
            <ListTextStyled>{item[1].title}</ListTextStyled>
            <ListTextStyled small as={View}>
              <ListTextStyled>{item[1].questions.length}</ListTextStyled>
            </ListTextStyled>
          </TouchableView>
        </TouchableContainer>
      )}
    />
  ) : (
    <ViewStyled>
      <Ionicons name={Platform.OS === 'ios' ? 'ios-sad' : 'md-sad'} size={60} color={theme.colors.purple} />
      <StyledText>You don't have decks yeat, create some and good study.</StyledText>
      <TextButton title="Go to New Deck" onPress={() => navigationHandler('NewDeck')} />
    </ViewStyled>
  );

  return null;
};

Decks.propTypes = {
  navigationHandler: func.isRequired,
};
