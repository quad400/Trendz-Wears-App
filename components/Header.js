import { View, Text } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const Header = ({lable}) => {

    const navigation = useNavigation()

  return (
    <View className="flex flex-row items-center justify-start m-3">
      <Feather onPress={()=> navigation.goBack()} name="arrow-left-circle" size={22} color="#40404060" />
      <Text className="text-textColor text-[18px] font-intermedium flex-1 text-center">{lable}</Text>
    </View>
  )
}

export default Header