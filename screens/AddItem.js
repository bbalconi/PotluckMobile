import React from 'react';
import { Button, StyleSheet, TouchableOpacity, Image, Text, TextInput } from 'react-native';
import tabstyle from '../styles';
var axios = require('axios');

export default class AddItem extends React.Component {
  static navigationOptions = {
    title: "Welcome",
    tabBarLabel: 'Add Item',
    tabBarIcon: ({ tintColor }) => (
      <Image
      source={require('../notification-icon.png')}
      style={[tabstyle.icon, { tintColor: tintColor }]}

    />
  )
}
  constructor(){
    super()
    this.sendData = this.sendData.bind(this);
    this.addToList = this.addToList.bind(this);
    this.state = {
      item: "",
      quantity: "",
    }
  }

  sendData(foodObj) {
    axios.put('http://10.10.20.94:5001/houses', {
        item: foodObj.item,
        quantity: foodObj.quantity,
    }, {headers: { 'Content-Type': 'application/json' }}).then((data)=>{
      console.log(data)
      this.setState({
        items: data.data
      });
    });
  };
  
  addToList() {
    this.sendData({
      item:this.state.item,
      quantity:this.state.quantity
    });
    this.setState({
      input: "",
      quantity: "",
    })
  }

  updateItem(text){
    this.setState({
      item: text
    })
  }

  updateQuantity(text){
    this.setState({
      quantity: text
    })
  }


  render() {
    console.log(this.state)
    const { navigate } = this.props.navigation    
    console.log(this.state)
    return (
      <Image source={require('./main-background.jpg')} style={styles.backgroundImage}> 
      <Image source={require('./1.png')} style={styles.logo}/>
        <Text style={styles.titles}>Item:</Text>
        <TextInput style={styles.inputText}
        onChangeText={(text) => this.updateItem(text)}
        value={this.state.username}/>  
        <Text style={styles.titles}>Quantity:</Text>
        <TextInput style={styles.inputText}
        onChangeText={(text) => this.updateQuantity(text)}
        value={this.state.password}
        secureTextEntry={true}
        />
        <Button style={styles.loginButton} 
        title='Add'
        onPress={() => this.addToList(this.state.item, this.state.quantity)} />
     </Image>
    )
  }
}

const styles = StyleSheet.create({
  logo:{
  },
  inputText:{
    height: 40, 
    width: 220,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white'
  },
  backgroundImage:{
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titles:{
    backgroundColor: 'rgba(52, 52, 52, 0.0)'
  },
  loginButton:{
    marginTop: 5,
    backgroundColor: 'rgba(52, 52, 52, 0.0)',
  }
});
