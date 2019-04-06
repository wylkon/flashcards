import React from 'react';
import { Container, Decks } from '../components';
import { ActivityIndicator } from 'react-native';
import { theme } from '../theme';
import { getDeck } from '../utils/storage';

export default class HomeScreen extends React.Component {
  state = {
    decks: [],
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
    this.isLoading(true);
    getDeck().then(success => {
      this.setState({
        decks: success ? success : [],
        loading: false,
      });
    });
  };

  componentDidMount() {
    this.retrieveData();
  }

  render() {
    const { decks, loading } = this.state;

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
