import React, { Dimensions } from 'react';

// const { Dimensions } = React;

import { View } from 'react-native';
import { WebView } from 'react-native-webview';

function Profile({ navigation }) {

  const deviceHeight = 320;
  const deviceWidth = 600;

  const githubUsername = navigation.getParam('github_username');

  console.log(githubUsername);

  return (<WebView
    style={{ flex: 1 }}
    source={{ uri: `https://github.com/${githubUsername}` }}
    javaScriptEnabled={true}
    domStorageEnabled={true}
    startInLoadingState={true}
  />);
}

export default Profile;