import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { TouchableOpacity, Animated } from 'react-native';

import { Container, Title, TextButton, StyledText, Results } from '../components';

const StyledContainer = styled(Container)`
  padding: 0 16px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const StyledTitle = styled(Title)`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.lightPurple};
  color: ${({ theme }) => theme.colors.darkPurple};
`;

const WrapButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

class Quiz extends React.Component {
  state = {
    current: 0,
    count: 1,
    show: false,
    final: false,
    correct: 0,
    bounceValue: new Animated.Value(1),
  };

  componentWillMount() {
    const {
      setParams,
      state: { params },
    } = this.props.navigation;
    const { count } = this.state;

    setParams({ total: `${count} / ${params.deck.questions.length}` });
  }

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;

    if (state.params != undefined) {
      return {
        title: state.params.total,
      };
    }
  };

  toggleAnswer = () => {
    const { bounceValue } = this.state;

    Animated.sequence([
      Animated.timing(bounceValue, { duration: 200, toValue: 1.04 }),
      Animated.spring(bounceValue, { toValue: 1, friction: 4 }),
    ]).start();

    this.setState(prevState => ({
      show: !prevState.show,
    }));
  };

  increaseState = state => {
    this.setState(prevState => ({
      [state]: prevState[state] + 1,
      show: false,
    }));
  };

  nextQuestion = answer => {
    const {
      setParams,
      state: { params },
    } = this.props.navigation;
    const { count } = this.state;
    const totalQuestions = params.deck.questions.length;

    // Atualiza quantas questões estão certas
    if (answer === 'correct') {
      this.increaseState(answer);
    }

    // Atualiza quantas questões faltam
    if (count === totalQuestions) {
      this.setState({
        final: true,
      });
    } else {
      this.increaseState('count');
      this.increaseState('current');
      setParams({ total: `${count + 1} / ${totalQuestions}` });
    }
  };

  restartQuiz = () => {
    const {
      setParams,
      state: { params },
    } = this.props.navigation;
    const totalQuestions = params.deck.questions.length;

    this.setState(
      {
        current: 0,
        count: 1,
        show: false,
        final: false,
        correct: 0,
      },
      () => {
        setParams({ total: `${this.state.count} / ${totalQuestions}` });
      }
    );
  };

  render() {
    const {
      state: {
        params: { deck },
      },
    } = this.props.navigation;

    const { current, show, bounceValue, final, correct } = this.state;

    return !final ? (
      <StyledContainer>
        {show ? (
          <Animated.View style={[{ transform: [{ scale: bounceValue }] }]}>
            <StyledText small>Answer:</StyledText>
            <StyledTitle>{deck.questions[current].answer}</StyledTitle>
          </Animated.View>
        ) : (
          <Animated.View style={[{ transform: [{ scale: bounceValue }] }]}>
            <StyledText small>Question:</StyledText>
            <StyledTitle>{deck.questions[current].question}</StyledTitle>
          </Animated.View>
        )}
        <TouchableOpacity onPress={this.toggleAnswer} style={{ marginBottom: 20, padding: 10 }}>
          <StyledText small alt>
            {show ? 'HIDE ANSWER' : 'SHOW ANSWER'}
          </StyledText>
        </TouchableOpacity>
        <WrapButtons>
          <TextButton title="Incorrect" onPress={() => this.nextQuestion('inCorrect')} secondary flex />
          <TextButton title="Correct" onPress={() => this.nextQuestion('correct')} flex />
        </WrapButtons>
      </StyledContainer>
    ) : (
      <Results correct={correct} navigation={this.props.navigation} restartQuiz={this.restartQuiz} />
    );
  }
}

const mapStateToProps = decks => ({
  decks,
});

export default connect(mapStateToProps)(Quiz);
