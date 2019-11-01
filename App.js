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
        <SafeAreaView style={{justifyContent: 'flex-end', borderWidth: 2, borderColor: 'red',height:'100%'}}>
          {/*<ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>*/}
          {!this.state.connected &&
          <View style={{width: 150, alignSelf: 'flex-start', flex: 1}}>
            <TouchableHighlight onPress={this.connect} underlayColor="white">
              <View style={styles.reconnect}>
                <Text style={styles.buttonText}>reconnect</Text>
                <FontAwesomeIcon icon={faSyncAlt} marginLeft={10}/>
              </View>
            </TouchableHighlight>
          </View>
          }
          <View style={{justifyContent: 'flex-end', borderWidth: 2, borderColor: 'blue',flex:12}}>
            <View style={styles.waterButtons}>
              <TouchableHighlight onPress={this.doWater} underlayColor="white">
                <View style={styles.waterButtons_btns}>
                  <Text style={styles.waterbuttonText}>Water</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={this.getDurationTimeout} underlayColor="white">
                <View style={styles.waterButtons_btns}>
                  <Text style={styles.waterbuttonText}>Get Timeout</Text>
                </View>
              </TouchableHighlight>

            </View>
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
            <View>
              <Button title={'Set Duration Timeout'} onPress={this.setDurationTimeout}/>
            </View>
            <View style={styles.body}>
              <Text style={styles.sectionTitle}>{JSON.stringify(this.state, null, 2)}</Text>
            </View>
          </View>
          {/*</ScrollView>*/}
        </SafeAreaView>
      </>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  buttonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    margin: 3
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
    borderWidth: 1
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.black,
  },
  waterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    //flex:1,
   // height: '35%'

  },
  waterButtons_btns: {
    backgroundColor: 'green',
    justifyContent: 'center',
    //flex:1,
    borderRadius: 20,
    minWidth: '45%',
    flexBasis: 150
  },
  waterbuttonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    margin: 20,
    fontSize: 24,
    fontWeight: '900',
    fontFamily: 'Roboto',
    color: Colors.white,
  },
  durationSelectors: {
    flexDirection: 'row',
    backgroundColor:Colors.light.gray,
    borderWidth:1
  },
  durationText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    marginLeft: 10
  },
  highlight: {
    fontWeight: '700',
  },
  reconnect: {
    flexDirection: 'row',
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
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

