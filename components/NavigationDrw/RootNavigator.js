import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './DrawerContent';
//import { FontFamily } from '../config/FontFamily';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import HomePage from '../HomePage'
import ShopTopCategoy from '../ShopTopCategory'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { getData, ServerURL } from '../FetchNodeServices';
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const Drawer = createDrawerNavigator();
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  HBoxes: {
    backgroundColor: '#FFF',
    shadowColor: '#000',
    elevation: 8,
    padding: 10,
  },
});
/*
function DrawerContent() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Drawer content</Text>
    </View>
  );
}
*/
function HomeScreen({ navigation }) {
  const [getCategoryAdList, setCategoryAdList] = useState([])
  const [activeslide, setslide] = useState(0);
  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={{ uri: `${ServerURL}/images/${item.ad}` }}
          style={{
            width: width * 0.98,
            height: height * 0.3,
            //resizeMode: 'contain',
          }}
        />
      </View>
    );
  };

  const fetchCategoryAd = async () => {
    var list = await getData('category/displayAll')
    setCategoryAdList(list)
  }
  useEffect(function () {
    fetchCategoryAd()
  }, [])

  // const renderCall=({item})=>{


  return (
    <ScrollView>
      {/*   <StatusBar translucent backgroundColor="transparent" />*/}
      <View>
        <View
          style={{
            ...styles.HBoxes,
            flexDirection: 'row',
            paddingTop: StatusBar.currentHeight,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Icon name={'menu'} size={24} color="#000"></Icon>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 24,
              textAlign: 'center',
              color: '#000',
              //fontFamily: FontFamily.regular,
            }}>
            Dashboard
        </Text>
          <TouchableOpacity
            onPress={() => {
              alert('You Notification!');
            }}>
            <FAIcon style={{ color: '#000' }} name="bell" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('ListProduct')}>
        <HomePage />
      </TouchableOpacity>



      <View style={{ padding: 3, width: width, display: 'flex', alignItems: 'center', alignSelf: 'center', borderWidth: 0.5, borderColor: 'gray' }}>

        <Carousel
          layout={'default'}
          //ref={ref => this.carousel = ref}
          data={getCategoryAdList}
          sliderWidth={width * 2}
          itemWidth={width * 0.9}
          renderItem={renderItem}
          onSnapToItem={(index) => setslide(index)}
          autoplay={true}
          loop={true}
        />
        <Pagination
          dotsLength={getCategoryAdList.length}
          activeDotIndex={activeslide}
          dotStyle={{
            width: 12,
            height: 12,
            borderRadius: 7.5,
          }}
          inactiveDotStyle={
            {
              // Define styles for inactive dots here
            }
          }
          inactiveDotOpacity={0.2}
          inactiveDotScale={0.5}
        /></View>
      <ScrollView>
        <ShopTopCategoy />
      </ScrollView>
    </ScrollView>
  );
}




export const RootNavigator = (props) => {
  return (
    <Drawer.Navigator drawerContent={() => <DrawerContent />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
};










// import React from 'react';
// import { StyleSheet, Text, View,StatusBar,TouchableOpacity} from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import {DrawerContent} from './DrawerContent'
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import FAIcon from 'react-native-vector-icons/FontAwesome';

// const Drawer = createDrawerNavigator();
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   HBoxes: {
//     backgroundColor: '#FFF',
//     shadowColor: '#000',
//     elevation: 8,
//     padding: 10,
//   },
// });

//  function HomeScreen({navigation}){

//     const handleButton=()=>{
//         alert('helo World')
//     }
//   return(
//     <View>

//     {/* <StatusBar translucent backgroundColor="transparent" /> */}

//     <View
//       style={{
//         ...styles.HBoxes,
//         flexDirection: 'row',
//         paddingTop: StatusBar.currentHeight,
//         alignItems: 'center',
//         justifyContent: 'space-between',
//       }}>
//       <View>
//       <TouchableOpacity
//         onPress={handleButton}>
//         <Icon name={"menu"} size={24} color="blue"></Icon>
//       </TouchableOpacity>
//       </View>
//       <Text
//         style={{
//           fontSize: 24,
//           textAlign: 'center',
//           color: '#000',
//           //fontFamily: FontFamily.regular,
//         }}>
//         Dashboard
//       </Text>
//       <TouchableOpacity
//         onPress={() => {
//           alert('You Notification!');
//         }}>
//         <FAIcon style={{ color: '#000' }} name="bell" size={24} />
//       </TouchableOpacity>
//     </View>


//     <View
//          style={{
//            marginTop: 300,
//            alignItems: 'center',
//           justifyContent: 'center',
//         }}>
//           <Text>Home Screen</Text>
//         </View>
//         </View>

//   )
//  }
// export default function RootNavigator(props){
//     return (

//           <Drawer.Navigator>
//             <Drawer.Screen name="Home" component={HomeScreen} />

//           </Drawer.Navigator>

//       );

// }
