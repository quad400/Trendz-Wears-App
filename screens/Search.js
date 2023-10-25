import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

const Search = () => {
  const [search, setSearch] = useState("")
  return (
    <View>
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
    </View>
  )
}

export default Search