import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import AssetImage from './AssetImage';
import { COLORS, SIZES } from '../constants/theme';

const ReusableHeader = ({ title, backbtn }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.outerStyle}>
      {backbtn === false ? (
        <View />
      ) : (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backbtn}
        >
          <Ionicons
            name="chevron-back-circle"
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      )}

      <Text style={styles.heading}>{title}</Text>

      <AssetImage
        data={require('@/assets/images/george.jpg')}
        mode={'cover'}
        width={30}
        height={30}
        radius={99}
      />
    </View>
  );
};

export default ReusableHeader;

const styles = StyleSheet.create({
  outerStyle: {
    marginBottom: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerText: {
    marginLeft: 15,
    justifyContent: 'center',
  },

  heading: {
    fontFamily: 'medium',
    fontSize: SIZES.medium,
    color: COLORS.black,
  },

  location: {
    fontFamily: 'regular',
    fontSize: SIZES.small + 2,
    color: COLORS.gray,
  },
  backbtn: {
    marginLeft: 12,
    alignItems: 'center',
    zIndex: 999,
    position: 'absolute',
    top: SIZES.xxLarge,
  },
});
