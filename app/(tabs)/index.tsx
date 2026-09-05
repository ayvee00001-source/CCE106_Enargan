import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, StatusBar } from 'react-native';
import * as Location from 'expo-location';
import { Magnetometer } from 'expo-sensors';
import * as ScreenOrientation from 'expo-screen-orientation';

const { width, height } = Dimensions.get('window');

export default function CompassScreen() {
  const [heading, setHeading] = useState(0);
  const [location, setLocation] = useState(null);
  const [permission, setPermission] = useState(null);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    StatusBar.setHidden(true);

    const setup = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setPermission(status);
      if (status === 'granted') {
        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
      }
    };
    setup();

    const subscription = Magnetometer.addListener(data => {
      let { x, y } = data;
      let angle = Math.atan2(y, x) * (180 / Math.PI);
      let deg = 90 - angle; // 0 = North
      if (deg < 0) deg += 360;
      setHeading(deg);
    });

    Magnetometer.setUpdateInterval(100);
    return () => subscription.remove();
  }, []);

  const getDirection = (deg) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  }

  if (permission!== 'granted') {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>Need Location Permission</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>


      <View style={styles.compassContainer}>
        {/* Yung umiikot na bilog */}
        <View style={[styles.compassRose, { transform: [{ rotate: `${-heading}deg` }] }]}>
          <Text style={styles.north}>N</Text>
          <Text style={styles.ne}>NE</Text>
          <Text style={styles.east}>E</Text>
          <Text style={styles.se}>SE</Text>
          <Text style={styles.south}>S</Text>
          <Text style={styles.sw}>SW</Text>
          <Text style={styles.west}>W</Text>
          <Text style={styles.nw}>NW</Text>
        </View>


        <View style={styles.needle} />
        <View style={styles.centerDot} />
      </View>

      {/* INFO BOX */}
      <View style={styles.infoBox}>
        <Text style={styles.headingText}>{heading.toFixed(0)}° {getDirection(heading)}</Text>
        {location && (
          <Text style={styles.infoText}>
            Lat: {location.coords.latitude.toFixed(4)}{'\n'}
            Long: {location.coords.longitude.toFixed(4)}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1208', // Dark pirate brown
    alignItems: 'center',
    justifyContent: 'center'
  },
  compassContainer: {
    width: 320,
    height: 320,
    alignItems: 'center',
    justifyContent: 'center'
  },
  compassRose: {
    width: 320,
    height: 320,
    borderRadius: 160,
    borderWidth: 4,
    borderColor: '#D4A017', // Gold border
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  north: { position: 'absolute', top: 15, fontSize: 32, fontWeight: 'bold', color: 'red' },
  ne: { position: 'absolute', top: 45, right: 45, fontSize: 20, fontWeight: 'bold', color: '#F5DEB3' },
  east: { position: 'absolute', right: 15, fontSize: 28, fontWeight: 'bold', color: '#F5DEB3' },
  se: { position: 'absolute', bottom: 45, right: 45, fontSize: 20, fontWeight: 'bold', color: '#F5DEB3' },
  south: { position: 'absolute', bottom: 15, fontSize: 28, fontWeight: 'bold', color: '#F5DEB3' },
  sw: { position: 'absolute', bottom: 45, left: 45, fontSize: 20, fontWeight: 'bold', color: '#F5DEB3' },
  west: { position: 'absolute', left: 15, fontSize: 28, fontWeight: 'bold', color: '#F5DEB3' },
  nw: { position: 'absolute', top: 45, left: 45, fontSize: 20, fontWeight: 'bold', color: '#F5DEB3' },
  needle: {
    width: 10,
    height: 150,
    backgroundColor: 'red',
    position: 'absolute',
    borderRadius: 5,
    top: 70
  },
  centerDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'red',
    position: 'absolute'
  },
  infoBox: {
    position: 'absolute',
    bottom: 60,
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D4A017'
  },
  headingText: {
    color: '#F5DEB3', // Parchment color
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  infoText: {
    color: '#F5DEB3',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5
  },
});
