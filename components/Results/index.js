import React, { Component } from 'react';
import styled from 'styled-components';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { setLocalNotification, clearLocalNotification } from '../../utils/notification';
import { theme } from '../../theme';

import { Container } from '../Containers';
import { Title } from '../Title';
import { StyledText } from '../Texts';
import { TextButton } from '../TextButton';

const StyledContainer = styled(Container)`
  padding: 0 16px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const CenterView = styled.View`
  align-items: center;
`;

export default class Results extends Component {
  componentDidMount() {
    // Limpa as notivicações e inicia a contagem novamente
    clearLocalNotification().then(setLocalNotification);
  }

  render() {
    const { correct, navigation, restartQuiz } = this.props;

    const { goBack, navigate } = navigation;

    return (
      <StyledContainer>
        <CenterView>
          <Ionicons name={Platform.OS === 'ios' ? 'ios-star' : 'md-star'} size={60} color={theme.colors.purple} />
        </CenterView>
        <Title>You finished that!</Title>
        {correct === 0 ? (
          <StyledText>Sorry, you must study more. Don't give up!</StyledText>
        ) : (
          <StyledText>
            Congratulations, you got {correct === 1 ? '1 question' : `${correct} questions`} right!
          </StyledText>
        )}
        <TextButton title="Restart quiz" onPress={restartQuiz} secondary />
        <TextButton title="Back to Deck" onPress={() => goBack()} />
        <TextButton title="Go to Home" onPress={() => navigate('Home')} alt />
      </StyledContainer>
    );
  }
}
