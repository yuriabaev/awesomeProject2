/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react'
//import * as Arduino from 'src/IntegratedComponents/Arduino'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  Button,
  Text,
  StatusBar,
  TouchableHighlight
} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import Slider from '@react-native-community/slider'

import {
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
    //Arduino.connect()
  }

  doWater = async () => {
    try {
      // await Arduino.water()
    } catch
      (err) {
      log(err.message)
    }
  }

  getDurationTimeout = async () => {
    try {
      // const watering_duration = await Arduino.getWateringDuration()
      // this.setState({watering_duration, desiredDuration: watering_duration})
    } catch
      (err) {
      log(err.message)
    }
  }

  setDurationTimeout = async () => {
    try {
      //await Arduino.setWateringDuration(this.state.desiredDuration)
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
            {!this.state.connected &&
            <View>
              <TouchableHighlight onPress={this.connect} underlayColor="white">
                <View style={styles.reconnect}>
                  <Text style={styles.buttonText}>reconnect </Text>
                  <FontAwesomeIcon icon={faSyncAlt} marginLeft={10}/>
                </View>
              </TouchableHighlight>
            </View>
            }

            <Button title={'water'} onPress={this.doWater}/>
            <Button title={'Get Duration Timeout'} onPress={this.getDurationTimeout}/>
            <View style={styles.durationSelectors}>
              <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={10}
                step={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                value={this.state.desiredDuration}
                onValueChange={text => this.onChangeDurationText(text)}
              />
              <Text style={styles.durationText} border={1}>
                {this.state.desiredDuration.toString()} seconds
              </Text>
            </View>
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
  buttonText:{
    textAlign: 'center',
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
  durationSelectors: {
    flex: 1, flexDirection: 'row'
  },
  durationText:{
    textAlign: 'center',
    textAlignVertical: "center",
    marginLeft:10
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
  reconnect: {
    flexDirection: 'row', margin: 10
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

