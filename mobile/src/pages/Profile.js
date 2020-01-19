import React from 'react';

import { View } from 'react-native';
import { WebView } from 'react-native-webview';



function Profile({ navigation }) {

  const githubUsername = navigation.getParam('github_username');

  console.log('Username', githubUsername);

  // return <View />;

  return (
    // <View>
    <WebView
      style={{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
      }}
      // scalesPageToFit={false}
      // scrollEnabled={false}
      // javaScriptEnabled={true}
      // automaticallyAdjustContentInsets={false}
      source={{ uri: `https://github.com/${githubUsername}` }}
    />
    // </View> 
  );
}

export default Profile;