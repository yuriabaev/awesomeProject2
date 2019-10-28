/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react'
import * as Arduino from 'src/IntegratedComponents/Arduino'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
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
  console.log(...args)
}

export default class App extends Component {
  state = {
    connected: false,
    watering_duration: 0,
    desiredDuration: 0
  }

  componentDidMount () {
    this.connect()
  }

  connect = () => {
    Arduino.connect()
  }

  doWater = async () => {
    try {
      await Arduino.water()
    } catch
      (err) {
      log(err.message)
    }
  }

  getDurationTimeout = async () => {
    try {
      const watering_duration = await Arduino.getWateringDuration()
      this.setState({watering_duration, desiredDuration: watering_duration})
    } catch
      (err) {
      log(err.message)
    }
  }

  setDurationTimeout = async () => {
    try {
     await Arduino.setWateringDuration(this.state.desiredDuration)
    } catch
      (err) {
      log(err.message)
    }
  }

  onChangeDurationText = (text) => {
    this.setState({desiredDuration: text})
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
            <Text style={styles.sectionTitle}>connected: {this.state.connected.toString()}</Text>
            <Button title={'connect'} onPress={this.connect}/>
            <Text style={styles.sectionTitle}>Step One</Text>
            <Button title={'water'} onPress={this.doWater}/>
            <Text style={styles.sectionTitle}>Step One</Text>
            <Button title={'Get Duration Timeout'} onPress={this.getDurationTimeout}/>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={text => this.onChangeDurationText(text)}
              value={this.state.desiredDuration.toString()}
              placeHolder="fff"
            />
            <Button title={'Set Duration Timeout'} onPress={this.setDurationTimeout}/>


            <View style={styles.body}>
              <Text style={styles.sectionTitle}>{JSON.stringify(this.state, null, 2)}</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    )
  }
}

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

