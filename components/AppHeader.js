import  React from 'react';
import { Appbar,Badge } from 'react-native-paper';
import { StyleSheet,View ,Text, TouchableOpacity} from 'react-native';
import MICON from 'react-native-vector-icons/MaterialIcons';
import {useSelector,useDispatch} from 'react-redux'

export default function AppHeader(props){

    const handlelogout=async()=>{
        alert("click")
        const value = await AsyncStorage.removeItem('@user_key')
        console.log("Async Data:",value)
    props.navigation.navigate('SignUp')

    }
    var cart = useSelector((state) => state.cart);
  var length = Object.keys(cart).length;
  const _goBack=()=>{
      props.navigation.goBack();
  }
    return(
      
        <Appbar.Header style={{backgroundColor:'#008ECC'}}>
          <Appbar.BackAction onPress={_goBack}/>
        <Appbar.Content title={"JioMart"} subtitle={"BETA VERSION"} />
     <TouchableOpacity onPress={()=>handlelogout()}><Text>Log Out</Text>
     </TouchableOpacity>

       <View>
           
           
       <MICON name="shopping-cart" size={30} color="#FFF" onPress={()=>props.navigation.navigate('ShowCart')}/>
        {/* <Appbar.Action icon="cart" onPress={() => {}} /> */}
        <Badge style={{position:'absolute',top:-5,left:-7}}><Text style={{fontSize:14}}>{length}</Text></Badge>
     </View>
     </Appbar.Header>
     
    )
}