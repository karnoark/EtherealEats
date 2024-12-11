import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS } from '@/constants/theme';

interface HeadingProps {
  heading: string;
  onPress: () => void;
}

const Heading = ({ heading, onPress }: HeadingProps) => {
  return (
    <View style={styles.heading}>
      <Text style={styles.text}>{heading}</Text>

      <TouchableOpacity onPress={onPress}>
        <Ionicons name="grid" size={20} color={COLORS.secondary} />
      </TouchableOpacity>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 7,
    marginRight: 16,
    justifyContent: 'space-between',
  },
  text: {
    marginLeft: 16,
    fontSize: 18,
    fontFamily: 'bold',
  },
});
