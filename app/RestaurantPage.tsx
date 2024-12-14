import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import Directions from '@/components/Directions';
import Menu from '@/components/Menu';
import New from '@/components/New';

// const FirstRoute = () => {
//   return <Menu />;
// };

// const SecondRoute = () => {
//   return <Directions />;
// };

// const ThirdRoute = () => {
//   return <New />;
// };

const renderScene = SceneMap({
  first: Menu,
  second: Directions,
  third: New,
});

const routes = [
  { key: 'first', title: 'Menu' },
  { key: 'second', title: 'Directions' },
  { key: 'third', title: 'New' },
];

export default function Page() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}
