import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, Text } from 'react-native';
import { Container } from '../components';

class Quiz extends React.Component {
  render() {
    return (
      <Container>
        <Text>Quiz</Text>
      </Container>
    );
  }
}

const mapStateToProps = decks => ({
  decks,
});

export default connect(mapStateToProps)(Quiz);
