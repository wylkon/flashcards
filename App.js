import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { StatusBar, View } from 'react-native';
import { AppLoading, Asset, Font, Icon, Constants } from 'expo';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { setLocalNotification } from './utils/notification';
import reducer from './reducers';
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

  componentDidMount() {
    setLocalNotification();
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
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

  loadResourcesAsync = async () => {
    return Promise.all([
      // Adicionar a lista de assets que será carregado "require('./assets/images/robot-dev.png')"
      Asset.loadAsync([]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
        'product-sans': require('./assets/fonts/product-sans.ttf'),
      }),
    ]);
  };

  handleLoadingError = error => {
    console.warn(error);
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
