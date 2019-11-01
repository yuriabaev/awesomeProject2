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
  TouchableHighlight,
  ImageBackground
} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import Slider from '@react-native-community/slider'
import { Container, Header, Content,Button as ButtonNB } from 'native-base'
import DashboardButton from './src/Components/DashboardButton'
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
    console.log('watering')
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
        <Container>
          <ImageBackground source={require('./src/assets/download.jpg')} style={{width: '100%', height: '100%'}}>
            <Content  contentContainerStyle={{ height: '100%'}}>
              <StatusBar barStyle="dark-content"/>
              <SafeAreaView style={{ borderWidth: 2, borderColor: 'red', height: '100%'}}>
                {/*<ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>*/}
                {!this.state.connected &&
                <View style={{width: 150, alignSelf: 'flex-start', flex: 1}}>
                  <TouchableHighlight onPress={this.connect} >
                    <View style={styles.reconnect}>
                      <Text style={styles.buttonText}>reconnect</Text>
                      <FontAwesomeIcon icon={faSyncAlt} marginLeft={10}/>
                    </View>
                  </TouchableHighlight>
                </View>
                }
                <View style={{justifyContent: 'flex-start', borderWidth: 2, borderColor: 'blue', flex: 12}}>
                  <View style={styles.waterButtons}>

                    <DashboardButton onPress={this.doWater}>water</DashboardButton>
                    <DashboardButton onPress={this.getDurationTimeout}>get duration timeout</DashboardButton>



                    {/*<TouchableHighlight onPress={this.doWater} underlayColor="white">*/}
                    {/*  <View style={styles.waterButtons_btns}>*/}
                    {/*    <Text style={styles.waterbuttonText}>Water</Text>*/}
                    {/*  </View>*/}
                    {/*</TouchableHighlight>*/}
                    {/*<TouchableHighlight onPress={this.getDurationTimeout} underlayColor="white">*/}
                    {/*  <View style={styles.waterButtons_btns}>*/}
                    {/*    <Text style={styles.waterbuttonText}>Get Timeout</Text>*/}
                    {/*  </View>*/}
                    {/*</TouchableHighlight>*/}

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
                  <View style={{flex:1}}>
                    <Button title={'Set Duration Timeout'} onPress={this.setDurationTimeout}/>
                  </View>
                  <View style={styles.state}>
                    <Text style={styles.sectionTitle}>{JSON.stringify(this.state, null, 2)}</Text>
                  </View>
                </View>
                {/*</ScrollView>*/}
              </SafeAreaView>
            </Content>
          </ImageBackground>
        </Container>
      </>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  buttonText: {
    color:'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    margin: 3
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  state: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    flex:1
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
     // flexDirection: 'row',
    justifyContent: 'center',
    flex:5,
    //height: '35%'

  },
  waterButtons_btns: {
    justifyContent: 'center',
    //flex:1,
    borderRadius: 10,
    margin:10,

    // minWidth: '45%',
     // flexBasis: 150
  },
  waterButtons_btns2: {
    color: 'green',
    justifyContent: 'center',
    borderRadius: 10,
    margin:10
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
    flex:1,
    flexDirection: 'row',
    backgroundColor: Colors.light.gray,
    borderWidth: 1
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
    backgroundColor: 'gray',
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



