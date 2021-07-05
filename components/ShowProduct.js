import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Button,
  Alert,
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {getData, ServerURL, BaseURL, postData} from './FetchNodeServices';
import InputSpinner from 'react-native-input-spinner';
import {useSelector, useDispatch} from 'react-redux';
import {SliderBox} from 'react-native-image-slider-box';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  itemViews: {
    flex: 1,
    flexDirection: 'column',
    width: width * 0.85,
    height: height * 0.2,
  },
  imageSize: {
    width: width * 0.4,
    height: height * 0.25,
    resizeMode: 'contain',
  },
});

export default function ShowProduct(props) {
  // console.log(props)
  var item = props.route.params.item;
  // console.log(item)

  var dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [getProductPictureList, setProductPictureList] = useState([]);
  const [activeslide, setslide] = useState(0);

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

  const handleAddToCart = () => {
    item['qtydemand'] = qty;

    dispatch({type: 'ADD_CART', payload: [item.productid, item]});
    props.navigation.setParams({x: ''});
  };

  const fetchProductPicture = async (productid) => {
    var body = {productid: item.productid};
    var result = await postData('productpicture/displaybyid', body);
    setProductPictureList(result);
  };
  useEffect(function () {
    fetchProductPicture();
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={{uri: `${ServerURL}/images/${item.productpicture}`}}
          style={{
            width: width * 0.6,
            height: height * 0.28,
            resizeMode: 'contain',
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <View
        style={{
          width: width,
          backgroundColor: '#FFF',
          borderColor: '#ecf0f1',
          borderWidth: 0.5,
        }}>
        <View
          style={{
            padding: 5,
            width: width,
            display: 'flex',
            alignItems: 'center',
            alignSelf: 'center',
            borderWidth: 0.5,
            borderColor: 'gray',
            marginBottom: 5,
          }}>
          <Carousel
            layout={'default'}
            //ref={ref => this.carousel = ref}
            data={getProductPictureList}
            sliderWidth={width * 2}
            itemWidth={width * 0.9}
            renderItem={renderItem}
            onSnapToItem={(index) => setslide(index)}
            autoplay={true}
            loop={true}
          />
          <Pagination
            dotsLength={getProductPictureList.length}
            activeDotIndex={activeslide}
            dotStyle={{
              width: 15,
              height: 15,
              borderRadius: 7.5,
            }}
            inactiveDotStyle={
              {
                // Define styles for inactive dots here
              }
            }
            inactiveDotOpacity={0.2}
            inactiveDotScale={0.5}
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            paddingLeft: 15,
            paddingTop: 5,
            paddingRight: 5,
          }}>
          <Text numberOfLines={1} style={{fontWeight: 'bold', fontSize: 22}}>
            {item.productname}
          </Text>
          <Text
            style={{
              textDecorationLine: 'line-through',
              textDecorationStyle: 'solid',
              fontSize: 18,
              padding: 4,
            }}>
            M.R.P: &#8377; {price}
          </Text>

          <Text style={{fontSize: 18, padding: 3}}>
            Price: &#8377; {actualprice} Inclusive of all taxes
          </Text>
          <Text style={{color: '#27ae60', fontSize: 18, padding: 4}}>
            you save &#8377;{save}
          </Text>
          {item.stock == 0 ? (
            <Text
              style={{
                color: '#00b894',
                padding: 4,
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Not Available
            </Text>
          ) : item.stock >= 1 && item.stock <= 3 ? (
            <Text
              style={{
                color: '#00b894',
                padding: 4,
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Limited Stock {item.stock} items Available
            </Text>
          ) : (
            <Text
              style={{
                color: '#00b894',
                padding: 4,
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              In Stock
            </Text>
          )}

          <Text style={{fontSize: 18, padding: 4}}>
            Inaugural Offer{' '}
            <Text style={{fontWeight: 'bold'}}>Free Shipping</Text>
          </Text>
          <Text
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <InputSpinner
              max={10}
              min={1}
              disabled={false}
              step={1}
              colorMax={'#008ECC'}
              colorMin={'#008ECC'}
              color={'#008ECC'}
              value={qty}
              onChange={(num) => {
                setQty(num);
              }}
            />
            ;
          </Text>
        </View>
      </View>

      <View
        style={{
          width: width,
          position: 'absolute',
          justifyContent: 'flex-end',
          bottom: 0,
        }}>
        <TouchableOpacity
          style={{backgroundColor: '#008ECC'}}
          onPress={() => handleAddToCart()}>
          <Text
            style={{
              fontSize: 20,
              color: '#FFF',
              padding: 10,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
