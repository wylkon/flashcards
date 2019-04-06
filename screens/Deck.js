import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Container } from '../components';

// removes extra space at top of header on android
SafeAreaView.setStatusBarHeight(0);

export default class Deck extends React.Component {
  render() {
    return (
      <Container>
        <Text>Text</Text>
      </Container>
    );
  }
}
