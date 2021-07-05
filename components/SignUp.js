import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
//import {getData,ServerURL,BaseURL,postData} from './FetchNodeServices'

// expo install expo-linear-gradient (For Expo Users)
// Alternate: npm i react-native-linear-gradient (For non-expo users)
import  LinearGradient  from 'react-native-linear-gradient';

// npm install react-native-elements
import { Icon } from 'react-native-elements';
import { postData } from './FetchNodeServices';

// https://fonts.google.com/specimen/Nunito+Sans
 //import { useFonts } from 'expo-font';
// import NSLight from '../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
// import NSRegular from '../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
// import NSBold from '../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
// import NSExtraBold from '../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

export default function LoginScreen3(props) {
 

  const [activeTab, setActiveTab] = useState('Login');

  

  useEffect(function () {
    StatusBar.setBarStyle('light-content', true);
  }, []);

  function switchTab() {
    if (activeTab === 'Login') {
      setActiveTab('Register');
    } else {
      setActiveTab('Login');
    }
  }

  function Login() {
    const [showLoginPassword, setShowLoginPassword] = useState(false);

    const [getEmail,setEmail]=useState('')
    const [getPassword,setPassword]=useState('')
    const handleSubmit=async()=>{
      var body={email:getEmail,password:getPassword}
      var result=await postData('signup/chkUserLogin',body)
     // alert(result.result)
      if(result.status){
        storeData(result.data)
        props.navigation.navigate('RootNavigator')
      }
  else{
      Alert.alert("INVALID ADMIN ID AND PASSWORD")
  }
    }








  
    // const getData=async()=>{
    //   try {
    //     console.log('xxxxxx')
    //     const value = await AsyncStorage.getItem('@User_key')
    //     console.log("Async Data:",value)
    //     if(value !==null) {
    //       // value previously stored
    //       var user=JSON.parse(value)
    //       //await fetchData(user.emailid)
    //      // dispatch({type:"LOGIN",payload:[user.emailid,user]})
    //       props.navigation.navigate('RootNavigator')
    //              console.log("Async Data:",value)
    //     }
    //     else{console.log("No Data Found..")}
    //   } catch(e) {
    //     console.log("Async Data Error",e)
    //   }
    

    // }

    // const storeData = async (body) => {
    //   try {
    //    // console.log(body)
    //     await AsyncStorage.setItem('@User_Key',JSON.stringify(body))
    //     alert(JSON.stringify(body))
    //   } catch (e) {
    //     console.log("Error in saving data",e)
    //   }
    // }

    const getData = async () => {
      try {
        console.log('xxxxxx')
        const value = await AsyncStorage.getItem('@User_Key')
        console.log("Async Data:",value)
        if(value !==null) {
          // value previously stored
          var user=JSON.parse(value)
          //await fetchData(user.emailid)
      
          props.navigation.navigate('RootNavigator')
                 console.log("Async Data:",value)
        }
        else{console.log("No Data Found..")}
      } catch(e) {
        console.log("Async Data Error",e)
      }
    }
    
    
    const storeData = async (body) => {
      try {
        await AsyncStorage.setItem('@User_Key',JSON.stringify(body))
      } catch (e) {
        console.log("Error in saving data")
      }
    }
    
    
    useEffect(function(){
      getData()
    },[])

    return (
      <View style={{ marginTop: 10 }}>
        <View style={styles.inputView}>
          <Icon
            style={{ paddingHorizontal: 4 }}
            name='envelope'
            type='font-awesome'
            color='#fff'
            size={22}
          />
          <TextInput
            style={styles.input}
            placeholder='Email'
            placeholderTextColor='#f1f2f6'
            keyboardType='email-address'
            textContentType='emailAddress'
            autoCapitalize={false}
            autoCompleteType='email'
            returnKeyType='next'
            onChangeText={(txt)=>setEmail(txt)}
          />
        </View>
        <View style={styles.inputView}>
          <Icon
            style={{ paddingHorizontal: 4 }}
            name='key'
            type='font-awesome-5'
            color='#fff'
            size={22}
          />
          <TextInput
            style={styles.input}
            placeholder='Password'
            placeholderTextColor='#f1f2f6'
            secureTextEntry={!showLoginPassword}
            textContentType='password'
            returnKeyType='done'
            onChangeText={(txt)=>setPassword(txt)}
   
          />
          <TouchableOpacity
            style={{ paddingVertical: 4 }}
            onPress={() => {
              setShowLoginPassword(!showLoginPassword);
            }}
          >
            <Icon
              style={{ paddingHorizontal: 4 }}
              name='eye'
              type='font-awesome'
              color='#fff'
              size={22}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={()=>handleSubmit()}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <View style={styles.socialLoginView}>
          <TouchableOpacity style={styles.socialLoginTouchable}>
            <Icon name='google' type='font-awesome' color='#F16529' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialLoginTouchable}>
            <Icon name='facebook' type='font-awesome' color='#F16529' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialLoginTouchable}>
            <Icon name='apple' type='font-awesome' color='#F16529' />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function Register() {
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);
    const [getFullName,setFullName]=useState('')
    const [getEmail,setEmail]=useState('')
    const [getPhone,setPhone]=useState('')
    const [getMsg,setMsg]=useState('')
    const [getPassword,setPassword]=useState('')
    const registeration=async()=>{
    const body={fullname:getFullName,email:getEmail,phone:getPhone,password:getPassword}
     var result=await postData('signup/userRegistration',body)  
     if(result){
        Alert.alert("Register Successfully")
        }
        
        else
        {
         Alert.alert("Register Not Success")
        }
    }

    
    return (
      <View style={{ marginTop: 10 }}>
        <View style={styles.inputView}>
          <Icon
            style={{ paddingHorizontal: 4, width: 30 }}
            name='user'
            type='font-awesome'
            color='#fff'
            size={22}
          />
          <TextInput
            style={styles.input}
            placeholder='Full Name'
            placeholderTextColor='#f1f2f6'
            textContentType='name'
            autoCompleteType='name'
            returnKeyType='next'
            onChangeText={(txt)=>setFullName(txt)}
          />
        </View>
        <View style={styles.inputView}>
          <Icon
            style={{ paddingHorizontal: 4, width: 30 }}
            name='envelope'
            type='font-awesome'
            color='#fff'
            size={22}
          />
          <TextInput
            style={styles.input}
            placeholder='Email'
            placeholderTextColor='#f1f2f6'
            keyboardType='email-address'
            textContentType='emailAddress'
            autoCapitalize={false}
            autoCompleteType='email'
            returnKeyType='next'
            onChangeText={(txt)=>setEmail(txt)}
          />
        </View>
        <View style={styles.inputView}>
          <Icon
            style={{ paddingHorizontal: 4, width: 30 }}
            name='phone'
            type='font-awesome'
            color='#fff'
            size={22}
          />
          <TextInput
            style={styles.input}
            placeholder='Phone'
            placeholderTextColor='#f1f2f6'
            keyboardType='phone-pad'
            returnKeyType='next'
            onChangeText={(txt)=>setPhone(txt)}
          />
        </View>
        <View style={styles.inputView}>
          <Icon
            style={{ paddingHorizontal: 4, width: 30 }}
            name='key'
            type='font-awesome-5'
            color='#fff'
            size={22}
          />
          <TextInput
            style={styles.input}
            placeholder='Password'
            placeholderTextColor='#f1f2f6'
            secureTextEntry={!showRegisterPassword}
            textContentType='password'
            returnKeyType='done'
            onChangeText={(txt)=>setPassword(txt)}
          />
          <TouchableOpacity
            style={{ paddingVertical: 4 }}
            onPress={() => {
              setShowRegisterPassword(!showRegisterPassword);
            }}
          >
            <Icon
              style={{ paddingHorizontal: 4 }}
              name='eye'
              type='font-awesome'
              color='#fff'
              size={22}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={()=>registeration()}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
       {/* <Text> {getMsg}</Text> */}
        <View>
          <Text
            style={{
              marginHorizontal: 20,
              marginTop: 30,
              fontSize: 18,
              color: '#fff',
              fontFamily: 'NSBold',
            }}
          >
            Or Register with
          </Text>
          <View
            style={[
              styles.socialLoginView,
              { marginTop: 14, justifyContent: 'flex-start' },
            ]}
          >
            <TouchableOpacity
              style={[styles.socialLoginTouchable, { marginLeft: 0 }]}
            >
              <Icon name='google' type='font-awesome' color='#F16529' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialLoginTouchable}>
              <Icon name='facebook' type='font-awesome' color='#F16529' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialLoginTouchable}>
              <Icon name='apple' type='font-awesome' color='#F16529' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <LinearGradient colors={['#E44D26', '#F16529']} style={styles.container}>
        <Text style={styles.welcomeText}>
          {activeTab === 'Login' ? 'Welcome Back' : 'Register Now'}
        </Text>
        <View style={styles.switchTabsView}>
          <TouchableOpacity
            style={{
              borderBottomWidth: activeTab === 'Login' ? 4 : 0,
              borderBottomColor: '#fff',
              paddingHorizontal: 4,
              marginRight: 14,
            }}
            onPress={() => switchTab()}
          >
            <Text style={styles.switchText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderBottomWidth: activeTab === 'Register' ? 4 : 0,
              borderBottomColor: '#fff',
              paddingHorizontal: 4,
              marginRight: 14,
            }}
            onPress={() => switchTab()}
          >
            <Text style={styles.switchText}>Register</Text>
          </TouchableOpacity>
        </View>
        {activeTab === 'Login' ? <Login /> : <Register />}
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
   // backgroundColor:'#4b7bec'
  },
  welcomeText: {
    alignSelf: 'center',
    fontSize: 40,
    fontFamily: 'NSLight',
    marginTop: 10,
    color: '#fff',
  },
  switchTabsView: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  switchText: {
    padding: 2,
    fontSize: 20,
    color: '#fff',
    fontFamily: 'NSExtraBold',
  },
  inputView: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#c1c1c1',
    marginTop: 10,
    marginHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    fontFamily: 'NSLight',
    paddingHorizontal: 4,
    color: '#fff',
  },
  button: {
    marginHorizontal: 20,
    backgroundColor: '#fafafa',
    marginTop: 12,
    paddingVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: { fontFamily: 'NSRegular', fontSize: 20, color: '#000' },
  forgotPasswordText: {
    marginHorizontal: 20,
    marginTop: 20,
    alignSelf: 'flex-end',
    color: '#fff',
    fontSize: 18,
    fontFamily: 'NSBold',
  },
  socialLoginView: {
    marginTop: 40,
    marginHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialLoginTouchable: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
});