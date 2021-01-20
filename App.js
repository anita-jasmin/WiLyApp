
import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BookTransactions from './screens/BookTransactions';
import SearchScreen from './screens/SearchScreen';
import{createAppContainer} from 'react-navigation';
import{createBottomTabNavigator} from 'react-navigation-tabs';
import {Icon} from 'react-native-elements';
import 'react-native-vector-icons';

export default class App extends Component{
  render(){
    return(
      
        <AppContainer/>
      
    )
  }
}
const BottomTabNavigator=createBottomTabNavigator({
  BookTransactions:BookTransactions,
  SearchScreen:SearchScreen
},{
  defaultNavigationOptions:({navigation})=>({
    tabBarIcon:({})=>{
      const routeName=navigation.state.routeName;
      if(routeName==='BookTransactions'){
        return(
          <Icon name="book" type="ant-design"/>
        );
      }
      else if(routeName==='SearchScreen'){
        return(
          <Icon name="search1" type="ant-design" color="red"/>
        );
      }
    }
  })
})
const AppContainer=createAppContainer(BottomTabNavigator);
