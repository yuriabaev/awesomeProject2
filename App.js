/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import EasyBluetooth from 'easy-bluetooth-classic'

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

export default class App extends Component {
  componentDidMount () {
    let config = {
      uuid: '00001101-0000-1000-8000-00805f9b34fb',
      deviceName: 'Mi A2',
      bufferSize: 1024,
      characterDelimiter: '\n'
    }

    EasyBluetooth.init(config)
      .then(function (config) {
        console.log('config done!')
      })
      .catch(function (ex) {
        console.warn(ex)
      })

    this.onDeviceFoundEvent = EasyBluetooth.addOnDeviceFoundListener(this.onDeviceFound.bind(this));
    this.onStatusChangeEvent = EasyBluetooth.addOnStatusChangeListener(this.onStatusChange.bind(this));
    this.onDataReadEvent = EasyBluetooth.addOnDataReadListener(this.onDataRead.bind(this));
    this.onDeviceNameEvent = EasyBluetooth.addOnDeviceNameListener(this.onDeviceName.bind(this));
  }

  onDeviceFound (device) {
    console.log('onDeviceFound')
    console.log(device)

    if (device.name === 'IXI') {
      this.setState({device})
    }
  }

  onStatusChange (status) {
    console.log('onStatusChange')
    console.log(status)
  }

  onDataRead (data) {
    console.log('onDataRead')
    console.log(data)
  }

  onDeviceName (name) {
    console.log('onDeviceName')
    console.log(name)
  }

  componentWillUnmount () {
    this.onDeviceFoundEvent.remove()
    this.onStatusChangeEvent.remove()
    this.onDataReadEvent.remove()
    this.onDeviceNameEvent.remove()
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
            <Button title={'ff'} onPress={() => {
              console.log('searching..')
              EasyBluetooth.startScan()
                .then(function (devices) {
                  console.log('all devices found:')
                  console.log(devices)
                })
                .catch(function (ex) {
                  console.warn(ex)
                })
            }}></Button>
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

