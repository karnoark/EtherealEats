import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import CategoryItem from '@/components/CategoryItem';
import uidata, { Category } from '@/constants/uidata';

const CategoryList = ({
  setSelectedCategory,
  setSelectedSection,
  setSelectedValue,
}: {
  setSelectedCategory: Dispatch<SetStateAction<string | null>>;
  setSelectedSection: Dispatch<SetStateAction<string | null>>;
  setSelectedValue: Dispatch<SetStateAction<string | null>>;
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const categories = [1, 2, 3, 4, 5];

  const handleSelectedCategory = (item: Category) => {
    if (selected === item.value) {
      setSelectedCategory(null);
      setSelectedSection(null);
      setSelectedValue(null);
      setSelected(null);
    } else {
      setSelectedCategory(item._id);
      setSelected(item.value);
      setSelectedSection('category');
      setSelectedValue(item.title);
    }
  };

  return (
    <FlatList
      data={uidata.categories}
      showsHorizontalScrollIndicator={false}
      horizontal
      style={{ marginTop: 5 }}
      keyExtractor={item => item._id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleSelectedCategory(item)}>
          <CategoryItem selected={selected} category={item} />
        </TouchableOpacity>
      )}
    />
  );
};

export default CategoryList;

const styles = StyleSheet.create({});
