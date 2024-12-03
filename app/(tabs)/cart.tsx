import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Page = () => {
    const {top} = useSafeAreaInsets();

  return (
    <View style={{paddingTop: top}}>
      <Text>Page</Text>
    </View>
  )
}

export default Page