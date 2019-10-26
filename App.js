/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
//import EasyBluetooth from 'easy-bluetooth-classic'
import BluetoothSerial from 'react-native-bluetooth-serial'
import Toast from '@remobile/react-native-toast'
import React, { Component } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  StatusBar,
} from 'react-native'

import {
  Header,
  Colors,
} from 'react-native/Libraries/NewAppScreen'

const log = (...args) => {
  Toast.showShortBottom(...args)
  console.log(...args)
}

export default class App extends Component {
  componentDidMount () {
    Promise.all([
      BluetoothSerial.isEnabled(),
      BluetoothSerial.list()
    ])
      .then((values) => {
        const [isEnabled, devices] = values
        log('isEnabled,  devices', isEnabled, devices)
        this.setState({isEnabled, devices})
        const device = devices[0]
        BluetoothSerial.connect(device.id)
          .then((res) => {
            log(`Connected to device  ${device.name}`)
            this.setState({device, connected: true, connecting: false})
          })
          .catch((err) => log(err.message))
      })

    BluetoothSerial.on('error', (err) => log(`Error: ${err.message}`))
    BluetoothSerial.on('data', (data) => log('data:' + data))
    BluetoothSerial.on('rawData', (data) => log('rawData:' + data))
    BluetoothSerial.on('connectionLost', () => {
      if (this.state.device) {
        log(`Connection to device ${this.state.device.name} has been lost`)
      }
      this.setState({connected: false})
    })
    BluetoothSerial.on('read', (data) => {
      console.log('Reading data: ', data)
    })
  }

  connect = () => {
    Promise.all([
      BluetoothSerial.isEnabled(),
      BluetoothSerial.list()
    ])
      .then((values) => {
        const [isEnabled, devices] = values
        log('isEnabled,  devices', isEnabled, devices)
        this.setState({isEnabled, devices})
        const device = devices[0]
        BluetoothSerial.connect(device.id)
          .then((res) => {
            log(`Connected to device  ${device.name}`)
            this.setState({device, connected: true, connecting: false})
          })
          .catch((err) => log(err.message))
      })
  }

  doWater = () => {
    return BluetoothSerial.write('water')
      .then((res) => {
        log('Successfuly wrote to device ' + res)
        this.setState({connected: true})
      })
      .catch((err) => log(err.message))
  }

  getDurationTimeout = () => {
    return BluetoothSerial.write('get_watering_duration')
      .then((res) => {
        log('get_watering_duration:' + res)
        BluetoothSerial.readFromDevice().then((res) => {
          log('res:' + res)
        })
      })
      .catch((err) => log(err.message))
  }

  render () {
    return (
      <>
        <StatusBar barStyle="dark-content"/>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Header/>
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <Button title={'connect'} onPress={this.connect}/>
            <Text style={styles.sectionTitle}>Step One</Text>
            <Button title={'water'} onPress={this.doWater}/>
            <Text style={styles.sectionTitle}>Step One</Text>
            <Button title={'Get Duration Timeout'} onPress={this.getDurationTimeout}/>
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Step One</Text>
                <Text style={styles.sectionDescription}>
                  Edit <Text style={styles.highlight}>App.j9cs</Text> to change this
                  screen and then come back to see your edits.
                </Text>
              </View>


            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    )
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
})

