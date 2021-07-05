import React,{useEffect,useState} from "react"
import {createStackNavigator} from '@react-navigation/stack'

import {View} from 'react-native'
import ListProduct from './ListProduct'
import ShowProduct from './ShowProduct'
import AppHeader from './AppHeader'
import ShowCart from './ShowCart'
//import Login from './Login'
import SignUp from './SignUp'
import HomePage from './HomePage'

import {RootNavigator} from './NavigationDrw/RootNavigator';

export default function  ProjectStack(props){
    var StackNav=createStackNavigator()
        return(
            
        <StackNav.Navigator initialRouteName="SignUp" >
            <StackNav.Screen name="ListProduct" component={ListProduct} options={{header:AppHeader}}  />
            <StackNav.Screen name="ShowProduct" component={ShowProduct} options={{header:AppHeader}}/>
            <StackNav.Screen name="ShowCart" component={ShowCart} options={{header:AppHeader}}  />
            <StackNav.Screen name="HomePage" component={HomePage}   /> 
            <StackNav.Screen name="SignUp" component={SignUp}   /> 
            <StackNav.Screen name="RootNavigator" component={RootNavigator}   options={{headerShown: false}}  />
       
        </StackNav.Navigator>
       
        )
    
}