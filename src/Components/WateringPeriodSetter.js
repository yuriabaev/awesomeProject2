import { StyleSheet, Text, View, Picker } from 'react-native'
import { Card, CardItem } from 'native-base'
import React, { useState } from 'react'

const borderWidth = 2
const WateringPeriodSetter = ({onChange, periodType, periodValue}) => {
  const onValueChange = (value) => {
    onChange({
      periodType: value.periodType || periodType,
      periodValue: value.periodValue || periodValue,
    })
  }

  return (
    <View style={{justifyContent: 'center'}}>
      <Card>
        <CardItem>
          <Text>Watering Period:</Text>
        </CardItem>
        <CardItem>

          <View style={styles.durationSelectors}>
            <Text style={styles.durationText} border={1}>
              every
            </Text>
            <Text style={styles.durationText} border={1}>
              3
            </Text>
            <Picker
              selectedValue={periodType}
              style={{height: 50, width: 150, borderWidth, borderColor: 'blue',}}
              onValueChange={(itemValue, itemIndex) => {

                onValueChange({periodType: itemValue})

              }}>
              <Picker.Item label="Seconds" value="Seconds"/>
              <Picker.Item label="Minutes" value="Minutes"/>
              <Picker.Item label="Hours" value="Hours"/>
              <Picker.Item label="Days" value="Days"/>
            </Picker>

          </View>
        </CardItem>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({

  durationSelectors: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  durationText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    marginLeft: 10
  },
})

export default WateringPeriodSetter