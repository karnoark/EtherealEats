import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { COLORS } from '@/constants/theme';
import uidata, { Choice } from '@/constants/uidata';

interface ChoicesListRenderProps {
  setSelectedChoice: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedSection: React.Dispatch<React.SetStateAction<string | null>>;
}

const ChoicesList = ({
  setSelectedChoice,
  setSelectedSection,
}: ChoicesListRenderProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handlePress = (item: Choice) => {
    if (selected === item.value) {
      setSelected(null);
      setSelectedChoice(null);
      setSelectedSection(null);
    } else {
      setSelected(item.value);
      setSelectedChoice(item.value);
      setSelectedSection('restaurants');
    }
  };

  return (
    <View>
      <Text
        style={{
          marginLeft: 16,
          marginVertical: 12,
          fontSize: 18,
          fontFamily: 'bold',
        }}
      >
        Pick Restaurants
      </Text>

      <FlatList
        data={uidata.choicesList}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        horizontal
        scrollEnabled
        style={{ marginTop: 5 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePress(item)}
            style={{
              backgroundColor:
                selected === item.value ? COLORS.secondary : COLORS.lightWhite,
              height: 40,
              borderRadius: 12,
              marginHorizontal: 8,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                marginHorizontal: 10,
                fontFamily: 'regular',
                fontSize: 13,
                color:
                  item.value === selected ? COLORS.lightWhite : COLORS.gray,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ChoicesList;

const styles = StyleSheet.create({});
