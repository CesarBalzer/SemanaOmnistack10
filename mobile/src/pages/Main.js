import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, PermissionsAndroid } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        });

      }
    }
    loadInitialPosition();
  }, []);

  if (!currentRegion) {
    return null;
  }

  // const granted = PermissionsAndroid.request("android.permission.ACCESS_FINE_LOCATION");
  // console.log(granted);

  return (
    <MapView initialRegion={currentRegion} style={styles.map}>
      <Marker coordinate={{ latitude: -25.113599, longitude: -50.208618 }}>
        <Image style={styles.avatar} source={{ uri: 'https://avatars0.githubusercontent.com/u/13343041?v=4' }} />

        <Callout onPress={() => {
          //navegacao
          navigation.navigate('Profile', { github_username: 'CesarBalzer' });
        }}>
          <View style={styles.callout}>
            <Text style={styles.devName}>Cesar Balzer</Text>
            <Text style={styles.devBio}>Add a bio</Text>
            <Text style={styles.devTechs}>Node.js, ReactJS, React Native</Text>
          </View>
        </Callout>
      </Marker>
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#FFF'
  },

  callout: {
    width: 260,

  },

  devName: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  devBio: {
    color: '#666',
    marginTop: 5,
  },

  devTechs: {
    marginTop: 5,
  },
})

export default Main;