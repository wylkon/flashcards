import React from 'react';
import { ActivityIndicator, TextInput, KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { createDeck } from '../utils/storage';
import { addDeck } from '../actions';
import { theme } from '../theme';
import { Title, TextButton, Container } from '../components';

const ViewStyled = styled(KeyboardAvoidingView)`
  flex: 1;
  padding: 0 16px;
  justify-content: center;
`;

const TextInputStyled = styled(TextInput)`
  height: 60px;
  font-size: 24px;
  border: 1px solid ${({ theme }) => theme.colors.darkPurple};
  padding: 10px;
  margin-top: 24px;
  text-align: center;
`;

class NewDeck extends React.Component {
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
    const {
      navigation: { navigate },
      addDeck,
    } = this.props;
    const { deckName } = this.state;
    const newDeck = { [deckName]: { title: deckName, questions: [] } };

    this.isLoading(true);

    createDeck(newDeck)
      .then(() => {
        addDeck(newDeck);
      })
      .then(() => {
        this.setState({
          deckName: '',
        });
        this.isLoading(false);
        navigate('Home');
      });
  };

  render() {
    const { deckName, loading } = this.state;
    const { decks } = this.props;
    const isDuplicated = Object.keys(decks).filter(item => item === deckName).length === 1;

    return loading ? (
      <Container>
        <ActivityIndicator size="large" color={theme.colors.purple} />
      </Container>
    ) : (
      <ViewStyled behavior="padding" enabled>
        <Title>What is the title of your new deck?</Title>
        <TextInputStyled
          value={deckName}
          placeholder="Type here the name of deck"
          onChangeText={deckName => this.setState({ deckName })}
        />
        <TextButton title="Submit" onPress={this.createNewDeck} disabled={deckName.trim() === '' || isDuplicated} />
      </ViewStyled>
    );
  }
}

const mapStateToProps = decks => ({
  decks,
});

export default connect(
  mapStateToProps,
  { addDeck }
)(NewDeck);
