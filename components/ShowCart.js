import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {getData, ServerURL, BaseURL} from './FetchNodeServices';
import {useSelector, useDispatch} from 'react-redux';
import InputSpinner from 'react-native-input-spinner';
import {Divider} from 'react-native-paper';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: '#FFF',
  },
  itemViews: {
    flex: 1,
    flexDirection: 'row',
    width: width * 0.85,
  },
  imageSize: {
    width: width * 0.3,
    height: height * 0.15,

    resizeMode: 'contain',
  },
});

export default function ShowCart(props) {
  var cart = useSelector((state) => state.cart);
  var length = Object.keys(cart).length;
  var cartitems = Object.values(cart);

  var total = cartitems.reduce(calculate, 0);

  function calculate(a, b) {
    var price = parseInt(
      b.offerprice === 0 ? b.price * b.qtydemand : b.offerprice * b.qtydemand,
    );
    return a + price;
  }

  // console.log('xxxxxxxxx',total)

  var totalsaving = cartitems.reduce(calculatesaving, 0);

  function calculatesaving(a, b) {
    var savingprice = parseInt(b.price - b.offerprice);
    savingprice = savingprice * b.qtydemand;
    return a + savingprice;
  }

  const [getList, setList] = useState(cartitems);
  const [qty, setQty] = useState(1);

  const [getState, setState] = useState(false);
  const renderItem = ({item}) => {
    var actualprice = '';
    var price = '';
    var save = '';
    if (item.offerprice == 0) {
      actualprice = item.price;
      save = 0;
    } else {
      price = item.price;
      actualprice = item.offerprice;
      save = item.price - item.offerprice;
    }

    const handleQtyChange = (value) => {
      //  console.log(typeof value, value);
      alert(item.productid);
      if (value == 0) {
        item['qtydemand'] = value;

        dispatch({type: 'REMOVE_ITEM', payload: [item.productid, item]});

        setState(!getState);
        props.navigation.setParams({x: ''});
      } else {
        item['qtydemand'] = value;
        dispatch({type: 'ADD_CART', payload: [item.productid, item]});
        // setState(!state);
        props.navigation.setParams({x: ''});
      }
    };
    return (
      <View
        style={{
          width: width * 0.98,
          //  height: height * 0.2,
          padding: 10,
          backgroundColor: '#FFF',
          borderColor: '#ecf0f1',
          borderWidth: 1,
        }}>
        <View style={styles.itemViews}>
          <View style={{padding: 10}}>
            <Image
              style={styles.imageSize}
              source={{uri: ServerURL + '/images/' + item.picture}}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              paddingLeft: 15,
              paddingTop: 5,
              paddingRight: 5,
            }}>
            <Text numberOfLines={1} style={{fontWeight: 'bold', fontSize: 14}}>
              {item.productname}
            </Text>
            <Text
              style={{
                textDecorationLine: 'line-through',
                textDecorationStyle: 'solid',
              }}>
              &#8377; {price}
            </Text>

            <Text>&#8377;{actualprice}</Text>
            <Text style={{color: '#27ae60', fontSize: 16}}>
              you save &#8377;{save}
            </Text>

            {item.stock == 0 ? (
              <Text
                style={{
                  color: '#00b894',
                  padding: 4,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                Not Available
              </Text>
            ) : item.stock >= 1 && item.stock <= 3 ? (
              <Text
                style={{
                  color: '#e74c3c',
                  padding: 4,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                Limited Stock {item.stock} items Available
              </Text>
            ) : (
              <Text
                style={{
                  color: '#00b894',
                  padding: 4,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                In Stock
              </Text>
            )}
            <InputSpinner
              max={10}
              min={0}
              // disabled={false}
              step={1}
              colorMax={'#008ECC'}
              colorMin={'#008ECC'}
              color={'#008ECC'}
              value={item.qtydemand}
              onChange={(num) => {
                handleQtyChange(num);
              }}
            />
          </View>
        </View>

        <Divider />
      </View>
    );
  };

  // const fetchData=async()=>{
  //  var result=await getData('product/displayall')
  // setList(result)
  // }
  /* <TouchableOpacity style={{backgroundColor:'#008ECC'}}  onPress={()=>props.navigation.navigate('SignUp')}>
            <Text style={{fontSize:20,color:'#FFF',padding:10,fontWeight:'bold',textAlign:'center'}}>
              Sign Up 
            </Text>
            </TouchableOpacity>   */

  useEffect(function () {}, []);
  return (
    <View style={styles.root}>
      <View
        style={{
          justifyContent: 'flex-start',
          padding: 5,
          flexDirection: 'row',
          width: width * 0.95,
          marginTop: 10,
          marginBottom: 10,
        }}>
        <Text style={{fontSize: 18}}>Subtotal({length}items):</Text>
        <Text style={{fontSize: 18, color: '#c0392b'}}> &#8377; {total}</Text>
      </View>
      <TouchableOpacity
        style={{
          width: width * 0.95,
          backgroundColor: '#ffb142',
          borderWidth: 0.8,
          borderColor: '#000',
          borderRadius: 2.5,
          marginBottom: 10,
        }}
        onPress={() => handleAddToCart()}>
        <Text
          style={{
            fontSize: 20,
            color: '#000',
            padding: 10,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Proceed to Buy
        </Text>
      </TouchableOpacity>
      <FlatList
        data={getList}
        renderItem={renderItem}
        keyExtractor={(item) => item.productid}
      />
    </View>
  );
}
