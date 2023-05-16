import React, {useEffect, useState} from 'react'
import { TouchableHighlight , View, Text, Alert, Image } from 'react-native'
import { plus_lg, plus_xs, minus_xs, minus_lg} from '../../assets/images'

function Counter(props) {
    const [cartCnt, setCartCnt] = useState(0);

    const [sizePixel, setSizePixel] = useState('');
    const [sizeText, setSizeText] = useState('');
    const [offset, setOffset] = useState('');

    const minus = () => {
        if(cartCnt > 0){
            setCartCnt(cartCnt-1)
        } else {
            Alert.alert('Min is 0')
        }
    }

    const pluse = () => {
        if(cartCnt < 3){
            setCartCnt(cartCnt+1)
        } else {
            Alert.alert('Max is 3')
        }
    }

    // if(props.size === 'lg'){
    //     setSizePixel('46px')
    //     setSizeText('25px')
    //     setOffset('39px')
    // }
    // if(props.size === 'xs'){
    //     setSizePixel('20px')
    //     setSizeText('18px')
    //     setOffset('25px')
    // }
    // if(props.size === 'md'){
    //     setSizePixel('20px')
    //     setSizeText('23px')
    //     setOffset('23px')
    // }

    return(
        <View className="flex flex-row">
            <View>
                <TouchableHighlight  onPress={minus} className="justify-center">
                    <Image source={props.size === 'lg' ? minus_lg : minus_xs}></Image>
                </TouchableHighlight >
            </View>
            <View className={props.size === 'lg' ? 'mx-[39px]' : (props.size === 'xs' ? 'mx-[25px]' : 'mx-[23px]')+" justify-center items-center"}>
                <Text className={props.size === 'lg' ? 'text-[25px] leading-[34px]' : (props.size === 'xs' ? 'text-[18px] leading-[25px]' : 'text-[23px] leading-[31px]')}>{cartCnt}</Text>
            </View>
            <View className="">
                <TouchableHighlight  onPress={pluse} className="justify-center">
                    <Image source={props.size === 'lg' ? plus_lg : plus_xs}></Image>
                </TouchableHighlight >
            </View>
        </View>
    )
}

export default Counter