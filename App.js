import React from 'react';
import Login from './screens/Login'
import SignUp from './screens/SignUp'
import AddItem from './screens/AddItem'
import ItemList from './screens/ItemList'
import {
  TabNavigator,
} from 'react-navigation';

const App = TabNavigator({
  Login: { screen: Login },
  SignUp: { screen: SignUp },
  AddItem: { screen: AddItem },
  ItemList: { screen: ItemList }
}, {
  tabBarOptions: { 
    activeTintColor: '#7567B1',
    labelStyle: {
      fontSize: 16,
      fontWeight: '600'
    }
  }
});

export default  App;




