import { ImageBackground, Picker, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'
import Slider from '@react-native-community/slider'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import React, { Component } from 'react'
import DashboardButton from '../../Components/DashboardButton'
import { Container, Content, CardItem, Card, Text } from 'native-base'
import { WATERING_DURATION, WATERING_PERIOD_TIME_INITIAL } from '../HomeScreen'
import WateringPeriodSetter from '../../Components/WateringPeriodSetter'
import { isPeriodsEqual } from '../../app'
import * as Arduino from '../../IntegratedComponents/Arduino'
import Toast from '../../utils/Toast'
import { calcPeriodInSeconds } from '../../app'
import Period from '../../utils/Period'
const image = require('../../assets/download.jpg')

const borderWidth = 0

export default class Settings extends Component {
  state = {
    connected: false,
    watering_duration: 0,
    desiredDuration: 0,
    periodType: 'Days',
    periodValue: 3,
    initialDuration: {}
  }

  componentDidMount () {

    const {navigation} = this.props

    const duration = navigation.getParam(WATERING_DURATION)
    const period = navigation.getParam(WATERING_PERIOD_TIME_INITIAL)
    console.log('componentDidMount,period',period)
    this.setState({
      watering_duration: duration,
      desiredDuration: duration,
      initialDuration: period,
      periodType: period.type,
      periodValue: period.value,
    })

  }

  onSave = async () => {
    const {navigate} = this.props.navigation

    const {periodType, periodValue, initialDuration} = this.state
    console.log('periodType, periodValue',periodType, periodValue)
    const newPeriod = new Period(periodValue, periodType)
    Toast.show({msg: 'saving'})

    try {
      //await Arduino.setWateringDuration(this.state.desiredDuration)

      if (!isPeriodsEqual(initialDuration, newPeriod)) {
        console.log('calcPeriodInSeconds(newPeriod)',calcPeriodInSeconds(newPeriod))
        await Arduino.setWateringPeriod(calcPeriodInSeconds(newPeriod))
      }
      Toast.success({msg: 'saved'})
      navigate('Home', {
        [WATERING_DURATION]: this.state.desiredDuration,
        [WATERING_PERIOD_TIME_INITIAL]: newPeriod,
      })
    } catch (err) {
      console.log('err', err)
      Toast.error({msg: err.message})
    }
  }

  onChangeDurationText = (text) => {
    this.setState({desiredDuration: text})
  }

  render () {
    return (
      <Container>
        <ImageBackground source={image} style={{width: '100%', height: '100%'}}>
          <Content padder contentContainerStyle={{height: '100%', borderWidth}}>
            <SafeAreaView style={{borderWidth, borderColor: 'red'}}>
              <View style={{justifyContent: 'space-around', borderWidth, borderColor: 'yellow', height: '100%'}}>
                <View style={{justifyContent: 'center', borderWidth, borderColor: 'blue'}}>
                  <View style={{justifyContent: 'center'}}>
                    <Card>
                      <CardItem>
                        <Text>Choose the amount of water </Text>
                      </CardItem>
                      <CardItem>
                        <View style={styles.durationSelectors}>
                          <Slider
                            style={{width: 200, height: 40}}
                            minimumValue={0}
                            maximumValue={10}
                            step={1}
                            minimumTrackTintColor="light blue"
                            maximumTrackTintColor="#000000"
                            value={this.state.desiredDuration}
                            onValueChange={text => this.onChangeDurationText(text)}
                          />
                          <Text style={styles.durationText} border={1}>
                            {this.state.desiredDuration.toString()} seconds
                          </Text>
                        </View>
                      </CardItem>
                    </Card>
                  </View>
                  <WateringPeriodSetter periodType={this.state.periodType} periodValue={this.state.periodValue}
                                        onChange={(state) => {
                                          console.log('state', state)
                                          this.setState({
                                            periodType: state.periodType,
                                            periodValue: state.periodValue
                                          })

                                        }}/>
                </View>
                <View style={{justifyContent: 'center'}}>
                  <DashboardButton onPress={this.onSave}>Save</DashboardButton>
                </View>
              </View>
              <StatusBar barStyle="dark-content"/>
            </SafeAreaView>
          </Content>
        </ImageBackground>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  durationSelectors: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.gray,
    borderWidth
  },
  durationText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    marginLeft: 10
  },
})