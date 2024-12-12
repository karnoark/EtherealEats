import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  Image,
  ScrollView,
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
import { Additive, Food } from '@/constants/uidata';

const Page = () => {
  const { top } = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const foodData: Food = params.foodData
    ? JSON.parse(params.foodData as string)
    : null;
  // console.log(foodData);

  const [isChecked, setIsChecked] = useState(false);
  const [additives, setAdditives] = useState<Additive[] | null>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [restaurant, setRestaurant] = useState(1);
  const [count, setCount] = useState(1);
  const [preference, setPreference] = useState('');
  // const {cartCount, setCartCount} = useContext(CartCountContext)
  console.log('additives: ', additives);

  const addToCart = async () => {};

  const handlePress = item => {
    const cartItem = {
      productId: item._id,
      additives,
      quantity: count,
      totalPrice: (item.price + totalPrice) * count,
    };
    addToCart(cartItem);
  };

  const sendToOrderPage = {
    orderItem: {
      foodId: foodData._id,
      additives,
      quantity: count,
      price: (foodData.price + totalPrice) * count,
      instructions: preference,
    },
    title: foodData.title,
    description: foodData.description,
    imageUrl: foodData.imageUrl[0],
    restaurant: foodData.restaurant,
  };

  const calculatePrice = useCallback(() => {
    const total = additives?.reduce((sum, additive) => {
      return sum + parseFloat(additive.price);
    }, 0);
    setTotalPrice(total ?? 0);
  }, [additives]);

  useEffect(() => {
    calculatePrice();
  }, [calculatePrice]);

  if (!foodData) {
    return (
      <View style={{ marginTop: top }}>
        <Text>Error: Order data is missing</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  const handleAdditives = (newAdditive: Additive) => {
    setAdditives(prevAdditives => {
      if (!prevAdditives) return [newAdditive];
      const exists =
        prevAdditives &&
        prevAdditives.some(additive => additive.id === newAdditive.id);
      if (exists) {
        return prevAdditives.filter(additive => additive.id !== newAdditive.id);
      } else {
        return [...prevAdditives, newAdditive];
      }
    });
  };

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
                  onPress={() => {
                    handleAdditives(item);
                  }}
                />
              </View>
              <Text style={{ paddingHorizontal: 4 }}>₹{item.price}</Text>
            </View>
          )}
        />

        {/* {foodData.additives.map(item => (
            <View
              key={item.id}
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
                  onPress={() => {
                    handleAdditives(item);
                  }}
                />
              </View>
              <Text style={{ paddingHorizontal: 4 }}>₹{item.price}</Text>
            </View>
          ))} */}

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

      <View style={{ left: 10, top: 40 }}>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View style={styles.suspended}>
            <View style={styles.cart}>
              <View style={styles.cartRow}>
                <TouchableOpacity onPress={() => {}} style={styles.cartbtn}>
                  <AntDesign
                    name="pluscircleo"
                    size={24}
                    color={COLORS.lightWhite}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    router.push({
                      pathname: '/Food/order',
                      params: {
                        foodData: JSON.stringify(sendToOrderPage),
                      },
                    });
                  }}
                  style={{
                    backgroundColor: COLORS.primary,
                    paddingHorizontal: 80,
                    borderRadius: 30,
                  }}
                >
                  <Text
                    style={[
                      styles.title,
                      {
                        color: COLORS.lightWhite,
                        marginTop: 4,
                        alignItems: 'center',
                      },
                    ]}
                  >
                    Order{' '}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cartbtn}>
                  <Text
                    style={[
                      styles.title,
                      {
                        color: COLORS.lightWhite,
                        marginTop: 4,
                        alignItems: 'center',
                      },
                    ]}
                  >
                    {count}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
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
  suspended: {
    position: 'absolute',
    zIndex: 999,
    bottom: 50,
    width: '100%',
    alignItems: 'center',
  },
  cart: {
    width: SIZES.width - 24,
    height: 60,
    justifyContent: 'center',
    backgroundColor: COLORS.primary1,
    borderRadius: 30,
  },
  cartRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
  },
  cartbtn: {
    width: 40,
    height: 40,
    borderRadius: 99,
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
});
