import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { Container, Decks } from '../components';
import { theme } from '../theme';
import { getDeck } from '../utils/storage';
import { receiveDecks } from '../actions';

class HomeScreen extends React.Component {
  state = {
    loading: false,
  };

  navigationHandler = page => {
    const { navigate } = this.props.navigation;

    navigate(page);
  };

  isLoading = value => {
    this.setState({
      loading: value,
    });
  };

  retrieveData = () => {
    const { receiveDecks } = this.props;
    this.isLoading(true);

    getDeck()
      .then(success => {
        receiveDecks(success);
      })
      .then(() => {
        this.setState({
          loading: false,
        });
      });
  };

  componentDidMount() {
    this.retrieveData();
  }

  render() {
    const { decks } = this.props;
    const { loading } = this.state;

    return (
      <Container>
        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.purple} />
        ) : (
          <Decks decks={decks} navigationHandler={this.navigationHandler} />
        )}
      </Container>
    );
  }
}

const mapStateToProps = decks => ({
  decks,
});

export default connect(
  mapStateToProps,
  { receiveDecks }
)(HomeScreen);
