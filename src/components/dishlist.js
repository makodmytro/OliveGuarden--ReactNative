import React, { useState, useEffect, useContext } from 'react'
import { View, Modal, ScrollView, Text, TouchableOpacity, Pressable, Image, TextInput, Alert } from 'react-native';
import { dish1, prev, checkout, more } from '../assets/images';
import { DataContext } from '../context/dataContext';
import { FilterContext } from '../context/filterContext';
import { dishArrays, sideList, drinkList } from '../utils/dishData';
import SearchEngin from '../utils/searchEngin';
import Counter from './include/counter';

function Dishlist(props) {
    const { dishlist, orderlist, setOrderlist } = useContext(DataContext);
    const { searchword } = useContext(FilterContext)
    const [modalDetailVisible, setDetailModalVisible] = useState(false);
    const [_dishlist, setDishs] = useState(dishlist);
    const [ selDish, setSelDish ] = useState({});

    const text = "(Max 3)"

    const gotoStart = () => {
        setDetailModalVisible(false)
    }

    const filterengin = (props) => {
        var filterType = 'dish' + (props.dishIndex % 5 + 1);
        var midtmp = []
        dishlist.forEach((ele,idx) => {
            if(ele.type === filterType){
                midtmp.push(ele);
            }
        })

        if(searchword === "") {
            return midtmp;
        } else {
            return SearchEngin(midtmp, ['title','price', 'description', 'type'], searchword)
        }
    }

    const openAddCartModal = (ele) => {
        setSelDish(ele)
        setDetailModalVisible(true);
    }

    const closeAddCartmodal = () => {
        setOrderlist((prev) => [...prev, selDish])
        setDetailModalVisible(false)
    }

    useEffect(()=>{
        setDishs(filterengin(props))
    }, [searchword])

    return (
        <ScrollView className="container">
            <View className="flex flex-row flex-wrap">
                {
                    _dishlist.map((ele, idx) =>
                        <View key={idx} className="w-[25%] animate-fadeIn">
                            <View  className="px-[25px] py-[18px]">
                                <TouchableOpacity onPress={() => openAddCartModal(ele)}>
                                    <View className="pb-[13px]">
                                        <Image source={ele.img} className="w-full h-auto rounded-[16px]" />
                                    </View>
                                    <View>
                                        <View className="flex flex-row items-center w-full justify-between pb-[8px]">
                                            <Text className="text-[18px] leading-[25px] text-[#222222]">{ele.title}</Text>
                                            <Text className="text-[18px] leading-[25px] text-[#b2ba21]">{ele.price}</Text>
                                        </View>
                                        <Text className="w-full text-left text-[#ACACAC] leading-[17px]">
                                            {ele.description}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }

                <Modal animationType="slide" transparent={true} visible={modalDetailVisible} onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setDetailModalVisible(!modalDetailVisible);
                }}>

                    <ScrollView className="w-full flex">
                        <View className="w-full bg-[#000] bg-[#000000d9] items-center">
                            <View className="absolute top-[77px] left-[71px]">
                                <Pressable className="w-[64px] h-[64px] rounded-full bg-white justify-center items-center" onPress={gotoStart}>
                                    <Image source={prev}></Image>
                                </Pressable>
                            </View>

                            <View className="justify-between w-[829px] mt-[83px] bg-[#fff] px-[50px] py-[35px] divide-solid divide-y divide-[#243c5a]">
                                <View>
                                    <View className="flex flex-row h-220 pb-[40px] justify-between">
                                        <View className="w-[280px] h-[220px] pr-[35px]">
                                            <Image source={dish1} className="w-280"></Image>
                                        </View>
                                        <View className="w-[412px] justify-center">
                                            <Text className="text-[29px] leading-7 font-blod pb-[18px]">Stream Wontons Long Title</Text>
                                            <Text className="text-neutral-500 leading-[22px]">Extra-thin corn tostada chips made fresh daily, Served with fresh salsa. Extra thin corn tostada chips made fresh daily. Served with fresh salsa</Text>
                                        </View>
                                    </View>

                                    <View className="flex flex-row h-[63px] justify-between">
                                        <View className="flex flex-row justify-between">
                                            <Counter size="lg"></Counter>
                                        </View>
                                        <View className="w-1/4">
                                            <Text className="text-[46px] text-[#b2ba21] font-[700]">$6.99</Text>
                                        </View>
                                    </View>

                                    <View className="flex">
                                        <View className="static pb-[22px]">
                                            <Text className="text-[16px] text-[#222] font-[700]">Roll Option</Text>
                                            <View className="h-[2px] w-[25px] bg-[#b2ba21] absolute bottom-[17px] left-0"></View>
                                        </View>
                                        <View className="pb-[16px] flex flex-row">
                                            <Image source={checkout}></Image><Text className="pl-[12px]">Roll</Text>
                                        </View>
                                        <View className="pb-[30px] flex flex-row">
                                            <Image source={checkout}></Image>
                                            <Text className="pl-[12px]">No Roll</Text>
                                        </View>
                                    </View>
                                </View>

                                <View>
                                    <View>
                                        <View className="mt-[30px] static">
                                            <Text className="text-[16px] text-[#222] font-[700]">Drinks <Text className="text-[#ec2121]">{text}</Text></Text>
                                            <View className="h-[2px] w-[25px] bg-[#b2ba21] absolute bottom-[-5px] left-0"></View>
                                        </View>
                                        <View>
                                            {
                                                sideList.map((side, sidx) =>
                                                    <View className="flex flex-row justify-between py-[10px]" key={sidx}>
                                                        <View>
                                                            <Text className="text-[16px]">{side.title}</Text>
                                                        </View>
                                                        <Counter size="xs"></Counter>
                                                    </View>
                                                )
                                            }
                                            <View className="flex flex-row justify-between py-[10px]">
                                                <View>
                                                    <Text className="text-[16px]">Show more</Text>
                                                </View>
                                                <View>
                                                    <Image source={more} className=""></Image>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    <View>
                                        <View className="static pb-[19px]">
                                            <Text className="text-[16px] text-[#222] font-[700]">Drinks</Text>
                                            <View className="h-[2px] w-[25px] bg-[#b2ba21] absolute bottom-[14px] left-0"></View>
                                        </View>
                                        <View>
                                            {
                                                drinkList.map((drink, didx) =>
                                                    <View className="flex flex-row justify-between py-[9px]" key={didx}>
                                                        <View>
                                                            <Text className="text-[16px]">{drink.title}</Text>
                                                        </View>
                                                        <Counter size="xs"></Counter>
                                                    </View>
                                                )
                                            }
                                        </View>
                                    </View>

                                    <View>
                                        <View><Text className="text-[16px] text-[#222] font-[700]">Special Instructions</Text></View>
                                        <View>
                                            <TextInput editable className="w-[729px] h-[173px] bg-[#f5f5f5] mt-[11px]"></TextInput>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <Pressable className="w-full h-[60px] mt-[26px] bg-[#b2ba21] justify-center" onPress={() => closeAddCartmodal()}>
                                <Text className="text-center text-white leading-[37px] text-[27px]">Add to Cart</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </Modal>
            </View>
        </ScrollView>
    )
}

export default Dishlist;