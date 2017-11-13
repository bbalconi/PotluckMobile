import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Image, Text, TextInput } from 'react-native';
import tabstyle from '../styles';
import { List, ListItem } from 'react-native-elements'
var axios = require('axios');

export default class AddItem extends React.Component {
  static navigationOptions = {
    title: "Welcome",
    tabBarLabel: 'Item List',
    tabBarIcon: ({ tintColor }) => (
      <Image
      source={require('../notification-icon.png')}
      style={[tabstyle.icon, { tintColor: tintColor }]}

    />
  )
}
  constructor(){
    super()
    this.getList = this.getList.bind(this)
    this.buttonPress = this.buttonPress.bind(this)
    this.state = {
      items: "",
    }
  }

  getList(){
    axios.get('http://192.168.0.161:5001/houses')
    .then((data)=>{
      console.log(data)
          this.setState({
            items:data.data,
          });
          console.log(this.state)
          
    });
  }

  buttonPress(){
    this.getList();
  }

  mapper(){

  }

  render() {
    if (this.state.items != "") {
    console.log(this.state)
    let newNewList = []
    let list = this.state.items
    console.log(list)
    let newList = list.map((item, i) => {
      console.log(item)
      return       <ListItem
      key={i}
      title={item.name}
      style={styles.lister}
    />
    })
    console.log(newList)
    const { navigate } = this.props.navigation    
    return (
      <View>
        <Button style={styles.loginButton} 
        title='Load Item List'
        onPress={this.fuckButtonPress} />
        <List>
          {newList}
        </List>
      </View>
    )
  }
  else {
    const { navigate } = this.props.navigation    
    return (
      <Image source={require('./main-background.jpg')} style={styles.backgroundImage}> 
        <Button style={styles.loginButton} 
        title='Load Item List'
        onPress={this.buttonPress} />
     </Image>
    )
  }}
}

const styles = StyleSheet.create({
  backgroundImage:{
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titles:{
    backgroundColor: 'rgba(52, 52, 52, 0.0)'
  },
  lister:{
    backgroundColor: 'rgba(255, 255, 255, 1.0)',
  }
});
