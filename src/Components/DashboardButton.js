import { StyleSheet, Text, View } from 'react-native'
import { Button as ButtonNB } from "native-base"
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

 const DashboardButton = (props)=>{

  return (
    <View style={styles.waterButtons_btns2}>
      <ButtonNB block info style={styles.button} onPress={props.onPress}>
        {/*<FontAwesomeIcon icon={faSlidersH} color={ 'white' } size={ 38 }/>*/}
        {props.icon?
          <FontAwesomeIcon icon={props.icon} color={ 'white' } size={ 38 }/>
          :<Text style={styles.buttonText}>{props.children}</Text>
        }
      </ButtonNB>
      {props.icon && <Text style={styles.buttonText}>{props.children}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({

  buttonText: {
    color:'#505050',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize:20,
    fontWeight:'bold',
    margin: 10
  },
  button: {
    borderRadius: 100,
    backgroundColor: '#3CD57E',
    width: 90,
    height: 90,
  },
  waterButtons_btns2: {
    color: 'green',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop:10
  },
})





export default DashboardButton