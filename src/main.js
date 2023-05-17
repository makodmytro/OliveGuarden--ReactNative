import React, { useState, useRef, useEffect, useContext, useMemo } from 'react';
import { View, Text, Image, TextInput, Pressable, Button, ImageBackground, ScrollView, Alert, Dimensions } from 'react-native';
import { logo, union, search, basket } from './assets/images';

import DishList from './components/dishlist'
import CartModal from './components/modals/cartModal';
import Checkout from './components/modals/checkout';
import { DataContext } from './context/dataContext';
import { FilterContext } from './context/filterContext';

const deltaMenu = ['PASTA', 'CHICKEN SANDWICHES', 'APPETIZERS', 'SOUP AND SALADS', 'PIZZA', 'PASTA', 'CHICKEN SANDWICHES', 'APPETIZERS', 'SOUP AND SALADS', 'PIZZA']

function Main({ navigation }) {
    const { setSearchwrod } = useContext(FilterContext)
    const { orderlist } = useContext(DataContext)
    const scrollViewRef = useRef(null);
    const [cartModalVisible, setCartModalVisible] = useState(false);
    const [chkoutModalVisible, setChkoutModalVisible] = useState(false);
    const [scrollMenulist, setScrollMenulist] = useState(deltaMenu.concat(deltaMenu.concat(deltaMenu.concat(deltaMenu))))
    const gotoStart = () => {
        navigation.navigate('Home')
    }
    const [selCateTitle, setSelCateTitle] = useState(null);

    const counts =  useMemo(() => {
        return orderlist.length
    }, [orderlist])

    const handleItemClick = (index) => {
        const screenWidth = Dimensions.get('window').width;
        const scrollX = index * 200 - screenWidth / 2 + 200 / 2;

        scrollViewRef.current.scrollTo({ x: scrollX, y: 0, animated: true });
        setSelCateTitle(index);
    };
    
    useEffect(() => {
        handleItemClick(20)
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <View className="flex flex-row py-[16px] px-[62px] bg-white">
                <View className="w-1/3">
                    <Pressable onPress={gotoStart}>
                        <Image className="h-[87px]" source={logo}></Image>
                    </Pressable>
                </View>
                <View className="w-1/3">
                    <Text className="text-[28px] self-center m-auto">Hello there 😄</Text>
                </View>
                <View className="flex flex-row items-stretch w-1/3">
                    <View className="flex flex-row self-center m-auto w-[260px] h-[50px] static">
                        <TextInput placeholder='Search' onChangeText={(e) => { setSearchwrod(e) }} className="focus:border-solid rounded-[10px] focus:border-2 focus:boder-radius-[5px] focus:border-[#869198] w-[260px] bg-[#f5f5f5] pl-[20px]"></TextInput>
                        <Pressable className="absolute top-[16px] right-[23px]">
                            <Image source={search}></Image>
                        </Pressable>
                    </View>
                    <View className="flex flex-row self-center m-auto items-stretch">
                        <Text className="self-center m-auto pr-[22px] pl-[27px] leading-[31px] text-[27px]">Cart</Text>
                        <Pressable className="self-center m-auto" onPress={() => setCartModalVisible(true)}>
                            <Image source={basket} className="w-[49px] h-[48.21px] pr-[58px] self-center m-auto">
                            </Image>
                            {
                                counts === 0 ? (
                                    <View>

                                    </View>
                                ) :
                                (
                                    <View className={"absolute h-[35px] w-[35px] bg-[#b2ba21] rounded-full border-solid border-[3px] border-[#fff] items-center bottom-[-17px] right-[-17px]"}>
                                        <Text className="text-[19px] leading-[23px] text-white text-center m-auto">{counts}</Text>
                                    </View>
                                )
                            }
                        </Pressable>
                        <CartModal visible={cartModalVisible} visibleAction={setCartModalVisible} chkAction={setChkoutModalVisible}></CartModal>
                    </View>
                </View>
            </View>

            <View>
                <ImageBackground source={union} className="h-[115px] w-full" resizeMode='cover'>
                    <ScrollView ref={scrollViewRef} showsHorizontalScrollIndicator={false} className="flex flex-row h-[90px] overflow-hidden" horizontal alwaysBounceHorizontal={true} snapToAlignment={'center'}>
                        {
                            scrollMenulist.map((ele, idx) =>
                                <View className="w-[200px] justify-center pb-[10px]" key={idx}>
                                    <Pressable onPress={() => { handleItemClick(idx) }}>
                                        <Text className={"text-[25px] leading-[27px] font-[700] text-center text-[#C2C8CB] text-" + (selCateTitle === idx ? "white" : "")}>{ele}</Text>
                                    </Pressable>
                                </View>
                            )
                        }
                    </ScrollView>
                </ImageBackground>
            </View>

            <DishList dishIndex={selCateTitle} ></DishList>
            <Checkout visible={chkoutModalVisible} visibleAction={setChkoutModalVisible}></Checkout>
        </View >
    )
}

export default Main