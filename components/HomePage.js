import React,{useState,useEffect} from 'react'
import {FlatList,View,Text,Dimensions,Image,StyleSheet,TouchableOpacity} from "react-native"
import {getData,ServerURL,} from './FetchNodeServices'
import { Avatar } from 'react-native-paper';
import Carousel, { Pagination } from 'react-native-snap-carousel';
const {width,height} = Dimensions.get('window');

const styles = StyleSheet.create({
   
     root:{
         display:'flex',
         justifyContent:'center',
         alignItems:'center',
     },
     itemViews:{
         flex:1,
         flexDirection:'row',
         width:width*0.85
     },
     imageSize:{
         width:width*0.1,
         height:height*0.3,
        
         resizeMode:'contain'
         
     }
      

   });



export default function HomePage(props) {
    const [getCategoryIcon,setCategoryIcon]=useState([])
    //const [getBrandAd,setBrandAd]=useState([])
    const [getBrandAdList, setBrandAdList] = useState([])
    const [activeslide, setslide] = useState(0);

    const fetchCategoryIcon=async()=>{
    var result=await getData('category/displayAll')
    setCategoryIcon(result)
    }
    const fetchBrandAd=async()=>{
        var result=await getData('category/displayAll')
        setBrandAdList(result)
        }

    useEffect(function(){
    fetchCategoryIcon()
    fetchBrandAd()
    },[])
    const renderItem=({item,index})=>{
        
        
      
    return (
        
          <View >       
          <View style={{display:'flex',flexDirection:'row',marginTop:10,margin:5}}>
             <Avatar.Image size={60}source={{uri:ServerURL+"/images/"+item.icon }} style={{margin:5}} />
             {/* <Text>{item.categoryname}</Text> */}
             </View>
            
            
                       </View> 

        
    )
  
    }
    return(
       
                <View >
                    
                    <FlatList
                    horizontal
                data={getCategoryIcon}
                renderItem={renderItem}
                keyExtractor={item => item.categoryid}
                
              />
                    </View>
            )
}


// import React,{useEffect,useState} from "react"
// import {FlatList,View,Text,Dimensions,Image,StyleSheet,TouchableOpacity} from "react-native"
// import {getData,ServerURL,BaseURL} from './FetchNodeServices'
// import { Avatar } from 'react-native-paper';

// const {width,height} = Dimensions.get('window');

// const styles = StyleSheet.create({
   
//      root:{
//          display:'flex',
//          justifyContent:'center',
//          alignItems:'center',
//      },
//      itemViews:{
//          flex:1,
//          flexDirection:'row',
//          width:width*0.85
//      },
//      imageSize:{
//          width:width*0.1,
//          height:height*0.3,
        
//          resizeMode:'contain'
         
//      }
      

//    });


// export default function ListProduct(props){

   

//     const [getList,setList]=useState([])
//     const [getImage,setImage]=useState([])

//     const renderItem=({item,index})=>{
     
        
        
       
//         return (
          
//               <Image
//                 source={{uri: `${ServerURL}/images/${item.ad}`}}
//                 style={{
//                   width: width * 0.6,
//                   height: height * 0.28,
//                   resizeMode: 'contain',
//                 }}
//               />
           
//           );
//         return(
//             <View>
//           <View style={{display:'flex',flexDirection:'row',marginTop:10,margin:5}}>
//              <Avatar.Image size={60}source={{uri:ServerURL+"/images/"+item.icon }} style={{margin:5}} />
//              </View>
//      <View>
    
//      <Carousel
//             layout={'default'}
//             //ref={ref => this.carousel = ref}
//             data={getImage}
//             sliderWidth={width * 1}
//             itemWidth={width * 0.9}
//             renderItem={renderItem}
//             onSnapToItem={(index) => setslide(index)}
//             autoplay={true}
//             loop={true}
//           />
//      </View>
//              </View>
//         )
//     }

//     const fetchData=async()=>{
//      var result=await getData('category/displayAll')
//     setList(result)
//     }
    
//     const fetchBrandAd=async()=>{
//         var result=await getData('brand/displayAll') 
//         setImage(result)
//    }
//     useEffect(function(){
//     fetchData()
//     fetchBrandAd()
//     },[])
//     return(
//         <View style={styles.root}>
//             <FlatList
//             horizontal
//         data={getList}
//         renderItem={renderItem}
//         keyExtractor={item => item.categoryid}
        
//       />
//             </View>
//     )
// }