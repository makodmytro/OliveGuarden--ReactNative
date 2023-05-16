import React from 'react';
import { Text, View, ImageBackground, Image, Pressable } from 'react-native';
import { mainLogo, bgimg } from './assets/images'

function Start({navigation}) {
    const gotoLogin = () => {
        navigation.navigate('Login')
    }
    return(
        <View className="flex-1">
            <ImageBackground source={bgimg} className="flex-1 w-full static">
                <View className="w-full h-[326px] mt-[10%] items-center justify-center bg-white opacity-90">
                    <Image source={mainLogo}></Image>
                </View>
                <Pressable className="bg-[#b2ba21] w-full items-center justify-center absolute h-[12%] bottom-[5%]" onPress={gotoLogin}>
                    <Text className="text-[40px] tracking-[1px] leading-[54px] text-[#fff]">TAP TO START</Text>
                </Pressable>
            </ImageBackground>
        </View>
    )
}

export default Start;