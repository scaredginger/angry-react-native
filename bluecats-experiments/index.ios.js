/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter
} from 'react-native';

import Beacons from 'react-native-ibeacons';

// Define a region which can be identifier + uuid,
// identifier + uuid + major or identifier + uuid + major + minor
// (minor and major properties are numbers)
var region = {
    identifier: 'Our App',
    uuid: '5B45DD15-DBF1-4F78-ABFF-2AFE41DD040C'
};

// Request for authorization while the app is open
Beacons.requestWhenInUseAuthorization();

Beacons.startMonitoringForRegion(region);
Beacons.startRangingBeaconsInRegion(region);

Beacons.startUpdatingLocation();

var myBeacons = [];

let component = null;

// Listen for beacon changes
var subscription = DeviceEventEmitter.addListener(
  'beaconsDidRange',
  (data) => {
    // data.region - The current region
    // data.region.identifier
    // data.region.uuid

    // data.beacons - Array of all beacons inside a region
    //  in the following structure:
    //    .uuid
    //    .major - The major version of a beacon
    //    .minor - The minor version of a beacon
    //    .rssi - Signal strength: RSSI value (between -100 and 0)
    //    .proximity - Proximity value, can either be "unknown", "far", "near" or "immediate"
    //    .accuracy - The accuracy of a beacon

    if (component) {
      component.setState({
        restaurant_id: data.region.uuid,
        beacons: data.beacons
      })
    }
    //console.log(data.beacons)

  }
);

export default class ReactNativeProject extends Component {

  constructor() {
    super();
    this.state = {
      restaurant_id: "xxx",
      beacons: []
    };
    component = this;
  }

  DrawBeacons() {
    var rssi = 0;
    var table = 0;

    console.log("Updating closest table: ")

    for (i = 0; i < this.state.beacons.length; i++) {
      beacon = this.state.beacons[i];
      console.log(beacon.minor, beacon.rssi)
      if (beacon.rssi < rssi) {
        rssi = beacon.rssi;
        table = beacon.minor;
      }
    }

    console.log("-> Closest table is: ", table, "\n");

    return (
      <View>
        <Text> You are sitting on table: {table} </Text>
      </View>
    )
  }

  render() {
    console.log(this.state)
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        { this.DrawBeacons() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ReactNativeProject', () => ReactNativeProject);
