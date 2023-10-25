
import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons'

const TextButton = ({label, onPress, disabled=false, prependIcon=false}) => {

  return (
    <Pressable className={`flex flex-row justify-center items-center ${disabled ? "#A36D3E50": "bg-primary"} w-[100%] rounded-md`} onPress={onPress}>
        <Text className="font-interregular text-white text-center text-[14px] py-2">{label}</Text>
        {prependIcon && <Feather name="chevrons-right" size={24} color="white" />}
    </Pressable>
  )
}

export default TextButton