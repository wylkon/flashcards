import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { StatusBar, View } from 'react-native';
import { AppLoading, Asset, Font, Icon, Constants } from 'expo';
import { createStore } from 'redux';
import reducer from './reducers';
import { Provider } from 'react-redux';

import AppNavigator from './navigation/AppNavigator';
import { Container } from './components';
import { theme } from './theme';

const StatusHeight = styled(View)`
  height: ${Constants.statusBarHeight};
  background-color: ${({ theme }) => theme.colors.purple};
`;

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={createStore(reducer)}>
          <ThemeProvider theme={theme}>
            <Container>
              <StatusHeight>
                <StatusBar translucent barStyle="light-content" />
              </StatusHeight>
              <AppNavigator />
            </Container>
          </ThemeProvider>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      // Adicionar a lista de assets que será carregado "require('./assets/images/robot-dev.png')"
      Asset.loadAsync([]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
        'product-sans': require('./assets/fonts/product-sans.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
