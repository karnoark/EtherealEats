import { Redirect } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useLoginContext } from '@/context/LoginContext';

const Page = () => {
  const { top } = useSafeAreaInsets();
  const { login, setLogin } = useLoginContext();

  if (!login) {
    return <Redirect href={'/login'} />;
  }

  return (
    <View style={{ paddingTop: top }}>
      <Text>Page</Text>
    </View>
  );
};

export default Page;
