import React, { Fragment } from 'react';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Title, TextButton, Container, StyledText } from '../components';

// Remove o espaço extra da sidebar
SafeAreaView.setStatusBarHeight(0);

// Filter para objetos
const filterObject = (obj, filter, filterValue) =>
  Object.keys(obj).reduce(
    (acc, val) =>
      obj[val][filter] !== filterValue
        ? acc
        : {
            ...acc,
            [val]: obj[val],
          },
    {}
  );

const StyledContainer = styled(Container)`
  padding: 0 16px;
`;

class Deck extends React.Component {
  componentWillMount() {
    const {
      setParams,
      state: { params },
    } = this.props.navigation;
    setParams({ title: params.title });
  }

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;

    if (state.params != undefined) {
      return {
        title: state.params.title,
      };
    }
  };

  render() {
    const { decks } = this.props;
    const {
      navigate,
      state: {
        params: { title },
      },
    } = this.props.navigation;
    const actualDeck = filterObject(decks, 'title', title);
    const questions = actualDeck[title].questions.length;

    return (
      <StyledContainer>
        <Title>{actualDeck[title].title}</Title>
        {questions !== 0 ? (
          <Fragment>
            <StyledText small>{questions === 1 ? '1 Question' : `${questions} Questions`}</StyledText>
            <TextButton title="Create new question" onPress={() => navigate('NewQuestion', { key: title })} />
            <TextButton title="Start quiz" onPress={() => navigate('Quiz', { deck: actualDeck[title] })} secondary />
          </Fragment>
        ) : (
          <Fragment>
            <StyledText small>You don't have questions yeat, create some and start the quiz!</StyledText>
            <TextButton title="Create new question" onPress={() => navigate('NewQuestion', { key: title })} />
          </Fragment>
        )}
      </StyledContainer>
    );
  }
}

const mapStateToProps = decks => ({
  decks,
});

export default connect(mapStateToProps)(Deck);
