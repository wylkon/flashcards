import React from 'react';
import { AsyncStorage, ActivityIndicator, TextInput, KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components';
import { createDeck } from '../utils/storage';

import { theme } from '../theme';
import { Title, TextButton } from '../components';
import { Container } from '../components/StyledContainers';

const ViewStyled = styled(KeyboardAvoidingView)`
  flex: 1;
  padding: 0 16px;
  justify-content: center;
`;

const TextInputStyled = styled(TextInput)`
  height: 60px;
  font-size: 24px;
  border: 1px solid ${({ theme }) => theme.colors.purple};
  padding: 10px;
  margin-top: 24px;
  text-align: center;
`;

export default class LinksScreen extends React.Component {
  state = {
    deckName: '',
    loading: false,
  };

  isLoading = value => {
    this.setState({
      loading: value,
    });
  };

  createNewDeck = () => {
    const { deckName } = this.state;

    this.isLoading(true);

    createDeck().then(success => {
      this.isLoading(false);
      this.props.navigator.navigate('Home');
    });
  };

  render() {
    const { deckName, loading } = this.state;

    return loading ? (
      <Container>
        <ActivityIndicator size="large" color={theme.colors.purple} />
      </Container>
    ) : (
      <ViewStyled behavior="padding" enabled>
        <Title>What is the title of your new deck?</Title>
        <TextInputStyled
          value={deckName}
          placeholder="Type here a name of deck"
          onChangeText={deckName => this.setState({ deckName })}
        />
        <TextButton title="Submit" onPress={this.createNewDeck} />
      </ViewStyled>
    );
  }
}
