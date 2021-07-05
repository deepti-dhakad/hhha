import React,{useEffect} from 'react';
import Carousel from 'react-native-banner-carousel';
import { StyleSheet, Image, View, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import {getData,ServerURL} from './FetchNodeServices';
//const BannerWidth = Dimensions.get('window').width;
//const BannerHeight = 260;
 


function renderimage(image, index) {
  return (
      <View key={index}>
          <Image style={{ width: 500, height: 500 }} source={{uri:ServerURL+"/images/"+image.ad}} />
      </View>
  );
}


 
export default function Slider() {

    const [getImage , setImage] = React.useState([])

    useEffect (function()
    {
        fetchCategory()
    },[])

    const fetchCategory=async()=>{
        var result = await getData('category/displayAll')
        setImage(result)
    }
 
    {
        return (
            <View style={styles.container}>
                <Carousel
                    autoplay
                    autoplayTimeout={3000}
                    loop
                    index={0}
                    pageSize={width,height}

                   
                >
                    {getImage.map((image, index) => renderimage(image, index))}
                </Carousel>
            </View>
        );
    }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
});























// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   Button,
//   StyleSheet,
//   Image,
//   Dimensions,
//   Touchable,
//   Alert,
// } from 'react-native';
// import {getData, postData, ServerURL} from './FetchNodeServices';
// const {width, height} = Dimensions.get('window');

// import {useDispatch, useSelector} from 'react-redux';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import Carousel, {Pagination} from 'react-native-snap-carousel';

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     backgroundColor: '#FFF',
//   },
//   itemView: {
//     flexDirection: 'column',
//     width: width * 0.88,
//     //  height: height * 0.2,
//   },
//   imageSize: {
//     width: width * 0.4,
//     height: height * 0.24,
//     resizeMode: 'contain',
//   },
// });

// export default function Carousels() {
//   //console.log(props)

//   const [getBrandAdList, setBrandAdList] = useState([]);
//   const [activeslide, setslide] = useState(0);

//   useEffect(function () {
//     fetchBrandAd();
//   }, []);

//   const fetchBrandAd = async () => {
   
//     var list = await getData('category/displayAll' )
//     setBrandAdList(list);
//   };
//   const renderItem = ({item, index}) => {
//     return (
//       <View
//         style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}>
//         {/* <Image
//           source={{uri: `${ServerURL}/images/${item.ad}`}}
//           style={{
//             width: width * 0.6,
//             height: height * 0.28,
//             resizeMode: 'contain',
//           }}
//         /> */}
//           {/* <Image
//           source={{uri: `${ServerURL}/images/${item.ad}`}}
         
//         /> */}
//         {/* <Text>{item.categoryname}</Text> */}
//          </View>
//     );
//   };
  
//   return (
//     <View style={styles.root}>
//       <View
//         style={{
//           width: width,

//           backgroundColor: '#FFF',
//           borderWidth: 0.5,
//           borderColor: '#ecf0f1',
//         }}>
//             {console.log(getBrandAdList)}
//          {/* <Text style={{fontSize:20}}>{getBrandAdList.length}</Text> */}
//           <Image source={{uri:`${ServerURL}/images/${getBrandAdList[0].ad}`}} style={{width:200,height:300}} /> 
//          {/* <Carousel
//             layout={'default'}
//             //ref={ref => this.carousel = ref}
//             data={getBrandAdList}
//             sliderWidth={width * 1}
//             itemWidth={width * 0.9}
//             renderItem={renderItem}
//           onSnapToItem={(index) => setslide(index)}
//             autoplay={true}
//             loop={true}
//           /> */}
          
//         </View>
       
   

//           </View>
    
//   );
// }
