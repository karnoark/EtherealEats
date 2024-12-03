import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Page = () => {
    const {top} = useSafeAreaInsets();
  return (
    <View style={{paddingTop: top}}>
      <Text>Home Page</Text>
    </View>
  )
}

export default Page