import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

const ReactNavigation = require('react-navigation');
ReactNavigation.SafeAreaView.setStatusBarHeight(0);

export default class LinksScreen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <ExpoLinksView />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
