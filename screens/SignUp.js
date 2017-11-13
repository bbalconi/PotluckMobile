import React from 'react';
import { Button, StyleSheet, TouchableOpacity, Image, Text, TextInput } from 'react-native';
import tabstyle from '../styles';
import { ColorPicker, toHsv } from 'react-native-color-picker'
var axios = require('axios');


export default class SignUp extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Signup',
    tabBarIcon: ({ tintColor }) => (
      <Image
      source={require('../notification-icon.png')}
      style={[tabstyle.icon, { tintColor: tintColor }]}
    />
  )
}
  constructor(){
    super();
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      confirmPassword: "",
    }
  }

  updateEmail(text){
    this.setState({
      email: text
    })
  }

  updateFirstName(text){
    this.setState({
      firstName: text
    })
  }

  updateLastName(text){
    this.setState({
      lastName: text
    })
  }


  updatePassword(text){
    this.setState({
      password: text
    })
  }

  updateConfirmPassword(text){
    this.setState({
      confirmPassword: text
    })
  }

  handleSignup() {
    if (this.state.password === this.state.confirmPassword) {
      this.submitSignup({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        color: this.state.userColor
      })
    } else {
        alert('Passwords do not match!')
    }
  }

  submitSignup(signupObj) {
    return new Promise((resolve, reject) => {
      axios.post('/signup', {
        firstName: signupObj.firstName,
        lastName: signupObj.lastName,
        email: signupObj.email,
        password: signupObj.password,
        color: signupObj.color
      }
      ).then((userObj) => {
        console.log(userObj)
        if (userObj.data.message == 'An account is already associated with that email address.') {
          this.setState({
            message: userObj.data.message
          })
        } else {
          this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            message: userObj.data.message,
            userColor: ''
          })        
          this.props.history.push("/login");
          resolve();          
        }}
    )})
    }


  render() {
    console.log(this.state)
    return (
      <Image source={require('./main-background.jpg')} style={styles.backgroundImage}> 
      <Text style={styles.titles}>First Name:</Text>
        <TextInput style={styles.inputText}
        onChangeText={(text) => this.updateFirstName(text)}
        value={this.state.firstName}/>  
        <Text style={styles.titles}>Last Name:</Text>
        <TextInput style={styles.inputText}
        onChangeText={(text) => this.updateLastName(text)}
        value={this.state.lastName}/>  
        <Text style={styles.titles}>Email:</Text>
        <TextInput style={styles.inputText}
        onChangeText={(text) => this.updateEmail(text)}
        value={this.state.email}/>  
        <Text style={styles.titles}>Password:</Text>
        <TextInput style={styles.inputText}
        onChangeText={(text) => this.updatePassword(text)}
        value={this.state.password}
        secureTextEntry={true}
        />
        <Text style={styles.titles}>Confirm Password:</Text>
        <TextInput style={styles.inputText}
        onChangeText={(text) => this.updateConfirmPassword(text)}
        value={this.state.confirmPassword}
        secureTextEntry={true}
        />
        <Button style={styles.loginButton} 
        title='Sign Up'
        onPress={this.handleSignup} />
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
