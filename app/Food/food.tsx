import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useContext, useState } from 'react';
import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Counter from '@/components/Counter';
import { COLORS, SIZES } from '@/constants/theme';
import { Food } from '@/constants/uidata';

const Page = () => {
  const { top } = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const foodData: Food = params.foodData
    ? JSON.parse(params.foodData as string)
    : null;
  console.log(foodData);

  const [isChecked, setIsChecked] = useState(false);
  const [additives, setAdditives] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [restaurant, setRestaurant] = useState(1);
  const [count, setCount] = useState(1);
  const [preference, setPreference] = useState('');
  // const {cartCount, setCartCount} = useContext(CartCountContext)

  if (!foodData) {
    return (
      <View style={{ marginTop: top }}>
        <Text>Error: Order data is missing</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View
      style={{
        marginTop: top,
        backgroundColor: COLORS.lightWhite,
        height: SIZES.height,
      }}
    >
      <View>
        <Image
          source={{ uri: foodData.imageUrl[0] }}
          style={{
            width: SIZES.width,
            height: SIZES.height / 4,
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
          }}
        />

        <TouchableOpacity onPress={() => router.back()} style={styles.backbtn}>
          <Ionicons
            name="chevron-back-circle"
            size={30}
            color={COLORS.tertiary}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}} style={styles.sharebtn}>
          <MaterialCommunityIcons
            name="share-circle"
            size={30}
            color={COLORS.tertiary}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <View style={styles.restBtn}>
            <Text style={{ color: COLORS.lightWhite, fontFamily: 'bold' }}>
              Open the Store
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title}>{foodData.title}</Text>
          <Text style={[styles.title, { color: COLORS.primary }]}>
            ₹{(foodData.price + totalPrice) * count}
          </Text>
        </View>
        <Text style={styles.small}>{foodData.description}</Text>

        <FlatList
          data={foodData.foodTags}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item}
          style={{ marginTop: 10 }}
          horizontal
          scrollEnabled
          renderItem={({ item }) => (
            <View style={styles.tags}>
              <Text style={{ paddingHorizontal: 4, color: COLORS.lightWhite }}>
                {item}
              </Text>
            </View>
          )}
        />

        <Text style={[styles.title, { marginBottom: 10, marginTop: 20 }]}>
          Additives and Toppings
        </Text>

        <FlatList
          data={foodData.additives}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          style={{ marginTop: 10 }}
          scrollEnabled
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
                width: '100%',
              }}
            >
              <View style={{ flex: 1 }}>
                <BouncyCheckbox
                  size={20}
                  unFillColor="#FFFFFF"
                  fillColor={COLORS.primary}
                  innerIconStyle={{ borderWidth: 1 }}
                  textStyle={[
                    styles.small,
                    { color: COLORS.primary, textDecorationLine: 'none' },
                  ]}
                  text={item.title}
                />
              </View>
              <Text style={{ paddingHorizontal: 4 }}>₹{item.price}</Text>
            </View>
          )}
        />

        <Text style={[styles.title, { marginBottom: 10, marginTop: 20 }]}>
          Preferences
        </Text>

        <View
          style={{
            height: 50,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 10,
          }}
        >
          <TextInput
            placeholder="Add specific instructions"
            value={preference}
            onChangeText={value => setPreference(value)}
            autoCapitalize="none"
            autoCorrect={false}
            style={{ flex: 1 }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}
        >
          <Text style={[styles.title, { marginBottom: 10 }]}> Quantity</Text>
          <Counter count={count} setCount={setCount} />
        </View>

        <View />
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  backbtn: {
    marginLeft: 12,
    alignItems: 'center',
    zIndex: 999,
    position: 'absolute',
    top: SIZES.xxLarge,
  },
  sharebtn: {
    marginRight: 12,
    alignItems: 'center',
    zIndex: 999,
    right: 0,
    position: 'absolute',
    top: SIZES.xxLarge + 3,
  },
  restBtn: {
    borderColor: COLORS.lightWhite,
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    marginRight: 10,
    position: 'absolute',
    bottom: 25,
    right: 3,
  },
  container: {
    marginHorizontal: 12,
    marginTop: 10,
  },
  title: {
    fontSize: 22,
    fontFamily: 'medium',
    color: COLORS.black,
  },
  small: {
    fontSize: 13,
    fontFamily: 'regular',
    color: COLORS.gray,
    textAlign: 'justify',
  },
  tags: {
    right: 10,
    marginHorizontal: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  input: {
    borderColor: COLORS.primary1,
    borderWidth: 1,
    backgroundColor: COLORS.offwhite,
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
});
