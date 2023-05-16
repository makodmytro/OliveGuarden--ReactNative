import React, {useState} from 'react';
import { Image, Pressable, Text, TextInput, View, Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import { prev, del_img } from './assets/images'

function Login({navigation}) {
    const [inputSttFlg, setInputSttFlg] = useState(false)
    const [verifyKeyFlg, setverifyKeyFlg] = useState(false);

    const [alertText, setAlertText] = useState(["Enter your phone", "number to start"])
    const [phoneNumber, setphoneNumber] = useState('');
    const [verifyCode, setVerifyCode] = useState('');
    
    const onphoneNumberBtn = (str) => {
        if(verifyKeyFlg){
            if(str === 'esc'){
                setVerifyCode('');
                return;
            }
            if(str === 'bac'){
                setVerifyCode((prev) => prev.slice(0,-1))
                return;
            }
            if(verifyCode.length>=4){
                setInputSttFlg(true);
                return;
            }
    
            setVerifyCode(verifyCode + str);
        } else {
            if(str === 'esc'){
                setphoneNumber('');
                return;
            }
            if(str === 'bac'){
                setphoneNumber((prev) => prev.slice(0,-1))
                return;
            }
            if(phoneNumber.length>=13){
                setInputSttFlg(true);
                return;
            }
    
            setphoneNumber(phoneNumber + str);
        }
    }

    const clickEnterBtn = (flg) => {
        if(inputSttFlg){
            if(verifyKeyFlg){
                if(verifyCode === '1111'){
                    setverifyKeyFlg(false)
                    setInputSttFlg(false);
                    setVerifyCode('')
                    setAlertText(["Enter your phone", "number to start"])
                    setphoneNumber('')
                    navigation.navigate('Main')
                    Alert.alert('Success!')
                } else {
                    Alert.alert('Incorrect Code!')
                    setVerifyCode('')
                }
            } else {
                setverifyKeyFlg(true)
                setAlertText(['Please enter the code sent to','your cell phone to confirm'])
            }
        } else {
            Alert.alert('No correct!')
        }
    }

    const gotoStart = () => {
        navigation.navigate('Home')
    }

    return (
        <View className="w-full flex-1 items-center pt-[6vh]">
            <View className="mb-[4vh]">
                <Text style={styles.alertText}>{alertText[0]}</Text>
                <Text style={styles.alertText}>{alertText[1]}</Text>
            </View>
            <View className="h-[6vh] mb-[2vh]">
                <TextInput editable={false} className="text-[54px] text-[#333] w-[]">{verifyKeyFlg ? verifyCode : phoneNumber}</TextInput>
            </View>
            <View>
                <View className="flex-row mb-[2vh]">
                    <View>
                        <Pressable className="w-[10vh] h-[10vh] flex-row bg-[#333333] rounded-full justify-center items-center" onPress={() => onphoneNumberBtn('1')}>
                            <Text className="text-[48px] text-[#fff]">1</Text>
                        </Pressable>
                    </View>
                    <View>
                        <Pressable className="w-[10vh] h-[10vh] flex-row bg-[#333333] rounded-full justify-center items-center mx-[19px]" onPress={() => onphoneNumberBtn('2')}>
                            <Text className="text-[48px] text-[#fff]">2</Text>
                        </Pressable>
                    </View>
                    <View>
                        <Pressable className="w-[10vh] h-[10vh] flex-row bg-[#333333] rounded-full justify-center items-center" onPress={() => onphoneNumberBtn('3')}>
                            <Text className="text-[48px] text-[#fff]">3</Text>
                        </Pressable>
                    </View>
                </View>
                <View className="flex-row mb-[2vh]">
                    <View>
                        <Pressable className="w-[10vh] h-[10vh] flex-row bg-[#333333] rounded-full justify-center items-center" onPress={() => onphoneNumberBtn('4')}>
                            <Text className="text-[48px] text-[#fff]">4</Text>
                        </Pressable>
                    </View>
                    <View>
                        <Pressable className="w-[10vh] h-[10vh] flex-row bg-[#333333] rounded-full justify-center items-center mx-[19px]" onPress={() => onphoneNumberBtn('5')}>
                            <Text className="text-[48px] text-[#fff]">5</Text>
                        </Pressable>
                    </View>
                    <View>
                        <Pressable className="w-[10vh] h-[10vh] flex-row bg-[#333333] rounded-full justify-center items-center" onPress={() => onphoneNumberBtn('6')}>
                            <Text className="text-[48px] text-[#fff]">6</Text>
                        </Pressable>
                    </View>
                </View>
                <View className="flex-row mb-[2vh]">
                    <View>
                        <Pressable className="w-[10vh] h-[10vh] flex-row bg-[#333333] rounded-full justify-center items-center" onPress={() => onphoneNumberBtn('7')}>
                            <Text className="text-[48px] text-[#fff]">7</Text>
                        </Pressable>
                    </View>
                    <View>
                        <Pressable className="w-[10vh] h-[10vh] flex-row bg-[#333333] rounded-full justify-center items-center mx-[19px]" onPress={() => onphoneNumberBtn('8')}>
                            <Text className="text-[48px] text-[#fff]">8</Text>
                        </Pressable>
                    </View>
                    <View>
                        <Pressable className="w-[10vh] h-[10vh] flex-row bg-[#333333] rounded-full justify-center items-center" onPress={() => onphoneNumberBtn('9')}>
                            <Text className="text-[48px] text-[#fff]">9</Text>
                        </Pressable>
                    </View>
                </View>
                <View className="flex-row mb-[2vh]">
                    <View>
                        <Pressable className="w-[10vh] h-[10vh] flex-row bg-[#333333] rounded-full justify-center items-center" onPress={() => onphoneNumberBtn('esc')}>
                            <Text className="text-[48px] text-[#fff]">x</Text>
                        </Pressable>
                    </View>
                    <View>
                        <Pressable className="w-[10vh] h-[10vh] flex-row bg-[#333333] rounded-full justify-center items-center mx-[19px]" onPress={() => onphoneNumberBtn('0')}>
                            <Text className="text-[48px] text-[#fff]">0</Text>
                        </Pressable>
                    </View>
                    <View>
                        <Pressable className="w-[10vh] h-[10vh] flex-row bg-[#333333] rounded-full justify-center items-center" onPress={() => onphoneNumberBtn('bac')}>
                            <Image source={del_img}></Image>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View className="mt-[4vh]">
                <Pressable className="h-[6vh] w-[33vh] bg-[#b2ba21] justify-center items-center" onPress={clickEnterBtn}>
                    <Text className="text-[27px] text-white">Enter</Text>
                </Pressable>
            </View>
            <View className="absolute top-[5vh] left-[9vh]">
                <Pressable className="w-[50px] h-[50px] rounded-full justify-center items-center" onPress={gotoStart}>
                    <Image source={prev}></Image>
                </Pressable>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    alertText: {
        color: "#333",
        fontSize: 34,
        lineHeight: 40,
        textAlign: 'center'
    }
})

export default Login;