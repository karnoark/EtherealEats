import React, { useContext, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CategoryList from '@/components/CategoryList';
import ChoicesList from '@/components/ChoicesList';
import HomeHeader from '@/components/HomeHeader';
import { useLocationContext } from '@/context/UserLocationContext';
import { UserReversedGeoCode } from '@/context/UserReversedGeoCode';
import pages from '@/styles/page.style';

//? Should I use SafeAreaView?

const Page = () => {
  const { top } = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  return (
    <View style={[{ paddingTop: top }, pages.viewOne]}>
      <View style={pages.viewTwo}>
        <HomeHeader />

        <ScrollView showsVerticalScrollIndicator={false} style={{}}>
          <CategoryList
            setSelectedCategory={setSelectedCategory}
            setSelectedSection={setSelectedSection}
            setSelectedValue={setSelectedValue}
          />
          <ChoicesList />
        </ScrollView>
      </View>
    </View>
  );
};

export default Page;
