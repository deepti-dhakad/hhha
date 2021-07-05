import React,{useEffect,useState} from "react"
import {FlatList,View,Text,Dimensions,Image,StyleSheet,TouchableOpacity} from "react-native"
import {getData,ServerURL,BaseURL} from './FetchNodeServices'

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
         width:width*0.3,
         height:height*0.15,
        
         resizeMode:'contain'
         
     }
      

   });


export default function ListProduct(props){

   

    const [getList,setList]=useState([])

    const renderItem=({item})=>{
     
        var actualprice="" 
        var price="" 
        var save=""     
        if(item.offerprice==0)
        {
           actualprice=item.price
           save=0
        }
        else{
           price=item.price
           actualprice=item.offerprice
           save=item.price-item.offerprice
        }
        return(
            <TouchableOpacity onPress={()=>props.navigation.navigate("ShowProduct",{item:item})}>
            <View style={{width:width*0.92,height:height*0.2,padding:10,backgroundColor:'#FFF',borderColor:'#ecf0f1',borderWidth:1,margin:2}}>
             <View style={styles.itemViews}>
             <View style={{padding:10}}>
            <Image
        style={styles.imageSize}
        source={{uri:ServerURL+"/images/"+item.picture}}
      /> 
      </View>
     <View style={{flex:1,flexDirection:'column',paddingLeft:15,paddingTop:5,paddingRight:5}}>
     <Text numberOfLines={1} style={{fontWeight:'bold',fontSize:14}}>
         {item.productname}
     </Text>
     <Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>
        &#8377; {price}
     </Text>

     <Text >
        &#8377;{actualprice}
     </Text>
     <Text style={{color:'#27ae60',fontSize:16}}>
      you save  &#8377;{save}
     </Text>
     </View>

            </View>
             </View>
            </TouchableOpacity>
        )
    }

    const fetchData=async()=>{
     var result=await getData('product/displayall')
    setList(result)
    }
    
    
    useEffect(function(){
    fetchData()
    },[])
    return(
        <View style={styles.root}>
            <FlatList
        data={getList}
        renderItem={renderItem}
        keyExtractor={item => item.productid}
        
      />
            </View>
    )
}