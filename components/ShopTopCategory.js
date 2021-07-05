import React, { useEffect, useState } from "react"
import { FlatList, View, Text, Dimensions, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from "react-native"
import { getData, ServerURL, BaseURL } from './FetchNodeServices'
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemViews: {
        flex: 1,
        flexDirection: 'row',
        width: width * 0.85
    },
    imageSize: {
        width: width * 0.2,
        height: height * 0.15,
        resizeMode: 'contain'



    }


});


export default function ListProduct(props) {



    const [getList, setList] = useState([])

    const renderItem = ({ item }) => {

        return (
            <ScrollView>
                <View style={{ backgroundColor: '#ffcccc', paddingTop: 10, borderColor: '#ffcccc', borderWidth: 1, borderRadius: 0.5, margin: 5 }}>

                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            style={styles.imageSize}
                            source={{ uri: ServerURL + "/images/" + item.icon }}
                        />
                    </View>
                    <View style={{ display: 'flex', padding: 5, justifyContent: 'center', alignItems: 'center', fontSize: '14px', fontWeight: 'bold', color: '#3f414d', width: width * 0.3 }}>
                        <Text >  {item.categoryname}</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }

    const fetchData = async () => {
        var result = await getData('category/displayAll')
        setList(result)
    }


    useEffect(function () {
        fetchData()
    }, [])
    return (
        <View style={styles.root}>
            <FlatList
                data={getList}
                renderItem={renderItem}
                keyExtractor={item => item.categoryid}
                numColumns={3}

            />
        </View>
    )
}