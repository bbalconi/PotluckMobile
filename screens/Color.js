import React from 'react';
import { ColorPicker, toHsv } from 'react-native-color-picker'
import { Image, View, Text } from 'react-native'
import tabstyle from '../styles';
var axios = require('axios');

export default class Login extends React.Component {
  static navigationOptions = {
    title: "Welcome",
    tabBarLabel: 'Color',
    tabBarIcon: ({ tintColor }) => (
      <Image
      source={require('../notification-icon.png')}
      style={[tabstyle.icon, { tintColor: tintColor }]}

    />
  )
}
  constructor(){
    super()
    this.state = { 
      color: toHsv('green') 
    }
    this.onColorChange = this.onColorChange.bind(this)
  }

  onColorChange(color) {
    this.setState({ color })
  }


  render() {
    const { navigate } = this.props.navigation    
    return (
      <View style={{flex: 1, padding: 15, backgroundColor: '#212021'}}>
        <ColorPicker
          oldColor='purple'
          color={this.state.color}
          onColorChange={this.onColorChange}
          onColorSelected={color => alert(`Color selected: ${color}`)}
          onOldColorSelected={color => alert(`Old color selected: ${color}`)}
          style={{flex: 1}}
        />
      </View>
    )
  }
}