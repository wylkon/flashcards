import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, KeyboardAvoidingView, TextInput } from 'react-native';
import { theme } from '../theme';
import styled from 'styled-components';

import { createQuestion, getDeck } from '../utils/storage';
import { Title, TextButton, Container } from '../components';
import { receiveDecks } from '../actions';

const ViewStyled = styled(KeyboardAvoidingView)`
  flex: 1;
  padding: 0 16px;
  justify-content: center;
`;

const TextInputStyled = styled(TextInput)`
  min-height: 100px;
  max-height: 200px;
  font-size: 24px;
  border: 1px solid ${({ theme }) => theme.colors.darkPurple};
  padding: 10px;
  text-align: center;
`;

const Label = styled.Text`
  font-size: 16px;
  font-family: 'product-sans';
  margin: 16px 0 8px;
`;

class NewQuestion extends React.Component {
  state = {
    question: '',
    answer: '',
    loading: false,
  };

  isLoading = value => {
    this.setState({
      loading: value,
    });
  };

  createNewQuestion = () => {
    const {
      navigation: {
        goBack,
        state: {
          params: { key },
        },
      },
      receiveDecks,
    } = this.props;

    const { question, answer } = this.state;
    const newQuestion = { question, answer };

    this.isLoading(true);

    createQuestion({ question: newQuestion, key })
      .then(() => {
        getDeck().then(success => {
          receiveDecks(success);
        });
      })
      .then(() => {
        this.setState({
          question: '',
          answer: '',
        });
        this.isLoading(false);
        goBack();
      });
  };

  render() {
    const { question, answer, loading } = this.state;
    const {
      navigation: {
        state: {
          params: { key },
        },
      },
    } = this.props;

    return loading ? (
      <Container>
        <ActivityIndicator size="large" color={theme.colors.purple} />
      </Container>
    ) : (
      <ViewStyled behavior="padding" enabled>
        <Title>Create a new question for {key} deck</Title>
        <Label>Question:</Label>
        <TextInputStyled
          value={question}
          placeholder="Type the question here"
          onChangeText={question => this.setState({ question })}
          multiline={true}
        />
        <Label>Answer:</Label>
        <TextInputStyled
          value={answer}
          placeholder="Type the answer here"
          onChangeText={answer => this.setState({ answer })}
          multiline={true}
        />
        <TextButton
          title="Submit"
          onPress={this.createNewQuestion}
          disabled={question.trim() === '' || answer.trim() === ''}
        />
      </ViewStyled>
    );
  }
}

const mapStateToProps = decks => ({
  decks,
});

export default connect(
  mapStateToProps,
  { receiveDecks }
)(NewQuestion);
