import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Header } from '../components'

const Search = () => {
  const [search, setSearch] = useState("")
  return (
    <SafeAreaView className="bg-white w-full h-full">
   
        <Header lable="Search" />
            <View className="mx-3 flex border h-10 px-3 border-gray-100 rounded-[5px]  flex-row justify-start items-center space-x-2">
        <AntDesign name="search1" size={20} color="#A36D3E" />
        <TextInput
            cursorColor="black"
            placeholder="Search"
            autoCorrect={false}
            autoComplete="off"
            value={search}
            onChangeText={(e)=>setSearch(e)}
            autoCapitalize="none"
            className={`text-[12px] w-[90%] font-intermedium outline-none`}
        />
      </View>
    </SafeAreaView>
  )
}

export default Search