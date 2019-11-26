import { Container, Content } from 'native-base'
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ScrollView
} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import DashboardButton from '../Components/DashboardButton'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import React, { Component } from 'react'
import { NavigationEvents } from 'react-navigation'
import { calcPeriodInSeconds, isPeriodsEqual } from '../app'
import * as Arduino from './../IntegratedComponents/Arduino'
import Toast from '../utils/Toast'
import Period from '../utils/Period'
const image = require('../assets/download.jpg')
const log = (...args) => {
  console.log(...args)
}
const borderWidth = 0

function msToTime (s) {

  // Pad to 2 or 3 digits, default is 2
  function pad (n, z) {
    z = z || 2
    return ('00' + n).slice(-z)
  }

  const mm = s

  var secs = s % 60
  s = (s - secs) / 60
  var mins = s % 60
  s = (s - mins) / 60
  var hrs = s % 24
  s = (s - hrs) / 24
  var days = s

  return pad(days) + ':' + pad(hrs) + ':' + pad(mins) + ':' + pad(secs)
}

const Reconnect = ({onPress}) => {

  return (<View style={{width: 150, alignSelf: 'flex-start', flex: 1}}>
    <TouchableHighlight onPress={onPress}>
      <View style={styles.reconnect}>
        <Text style={styles.buttonText}>reconnect</Text>
        <FontAwesomeIcon icon={faSyncAlt} marginLeft={10}/>
      </View>
    </TouchableHighlight>
  </View>)
}
export const WATERING_DURATION = 'WATERING_DURATION'
export const WATERING_PERIOD_TIME_INITIAL = 'WATERING_PERIOD_TIME_INITIAL'
export const WATERING_PERIOD_TIME_DISPLAY = 'WATERING_PERIOD_TIME_DISPLAY'

export default class HomeScreen extends Component {
  state = {
    connected: false,
    [WATERING_DURATION]: 0,
    [WATERING_PERIOD_TIME_INITIAL]: new Period(10,'Days'),
    [WATERING_PERIOD_TIME_DISPLAY]: 0,
    interval: 0
  }

  componentDidMount () {
    this.connect()
    this.setWateringPeriodTime(new Period(4,'Days'))
    this.setState({[WATERING_DURATION]: 3})
    const interval = setInterval(this.handlePeriodTimeDisplay, 1000)
    this.setState({interval})
  }

  handlePeriodTimeDisplay = () => {
    let wateringPeriodTimeTemp = this.state[WATERING_PERIOD_TIME_DISPLAY]

    if (wateringPeriodTimeTemp <= 0) {
      wateringPeriodTimeTemp = calcPeriodInSeconds(this.state[WATERING_PERIOD_TIME_INITIAL])
    } else {
      wateringPeriodTimeTemp = wateringPeriodTimeTemp - 1
    }

    this.setState({[WATERING_PERIOD_TIME_DISPLAY]: wateringPeriodTimeTemp})
  }

  componentWillUnmount () {
    clearInterval(this.state.interval)
  }

  connect = async () => {
    Toast.show({msg: 'connecting..'})
    await Arduino.connect()
  }

  doWater = async () => {
    Toast.show({msg: 'watering'})

    await Arduino.water()
  }

  fetchDurationTimeout = async () => {
    const {navigation} = this.props

    const wateringFromNavigation = navigation.getParam(WATERING_DURATION)

    if (wateringFromNavigation) {

    }
    try {
      // const watering_duration = await Arduino.getWateringDuration()
    } catch
      (err) {
      log(err.message)
    }
  }

  getDurationTimeout = () => {
    const wateringFromNavigation = this.state[WATERING_DURATION]

    return wateringFromNavigation
  }

  getPeriodTime = () => {
    return this.state[WATERING_PERIOD_TIME_DISPLAY]
  }

  goToSettings = async () => {
    this.setState({modal: true})

    const {navigate} = this.props.navigation

    navigate('Settings', {
      [WATERING_DURATION]: this.state[WATERING_DURATION],
      [WATERING_PERIOD_TIME_INITIAL]: this.state[WATERING_PERIOD_TIME_INITIAL],
    })
  }

  onScreenReload = async payload => {

    const {navigation} = this.props

    const newPeriod = navigation.getParam(WATERING_PERIOD_TIME_INITIAL)

    const newWateringDuration = navigation.getParam(WATERING_DURATION)

    if (newPeriod && !isPeriodsEqual(newPeriod, this.state[WATERING_PERIOD_TIME_INITIAL])) {
      this.setWateringPeriodTime(newPeriod)
    }
    if (newWateringDuration) {
      this.setState({[WATERING_DURATION]: newWateringDuration})
    }
    //console.log('will focus', payload)
  }

  setWateringPeriodTime (period) {
    const periodInSeconds = calcPeriodInSeconds(period)

    this.setState({
      [WATERING_PERIOD_TIME_INITIAL]: period,
      [WATERING_PERIOD_TIME_DISPLAY]: periodInSeconds
    })
  }

  render () {
    const durationTimeout = this.getDurationTimeout()
    const wateringPeriod = this.getPeriodTime()
    return (
      <>
        <Container>
          <NavigationEvents
            onWillFocus={this.onScreenReload}
          />
          <ImageBackground source={image} style={{width: '100%', height: '100%'}}>
            <Content padder contentContainerStyle={{height: '100%'}}>
              <StatusBar barStyle="dark-content"/>
              <SafeAreaView style={{borderWidth, borderColor: 'red', height: '100%'}}>
                {/*<ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>*/}
                {!this.state.connected && <Reconnect onPress={this.connect}/>}

                <View style={{justifyContent: 'flex-start', borderWidth, borderColor: 'blue', flex: 12}}>
                  <View style={{borderWidth, justifyContent: 'center', alignItems: 'center', flex: 2}}>
                    <Text style={{borderWidth, fontSize: 28}}>Next watering:</Text>
                    <Text style={{borderWidth, fontSize: 40}}>{msToTime(wateringPeriod)}</Text>
                    <Text style={{borderWidth, fontSize: 28}}>watering for: {durationTimeout} sec</Text>
                  </View>
                  <View style={styles.waterButtons}>
                    <DashboardButton onPress={this.doWater}>Water</DashboardButton>
                    <DashboardButton onPress={this.goToSettings}>Settings</DashboardButton>
                  </View>
                  <View style={styles.state}>
                    <ScrollView>
                      <Text style={styles.sectionTitle}>{JSON.stringify(this.state, null, 2)}</Text>
                    </ScrollView>
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
    color: 'white',
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
    borderWidth,
    flex: 1
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.black,
  },
  waterButtons: {
    // flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 2,
    //height: '35%'

  },

  reconnect: {
    backgroundColor: 'gray',
    flexDirection: 'row',
    margin: 10,
    borderWidth,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
})