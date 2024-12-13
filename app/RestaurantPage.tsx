import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

const FirstRoute = () => {
  return <View style={{ flex: 1, backgroundColor: '#ff4081' }} />;
};

const SecondRoute = () => {
  return <View style={{ flex: 1, backgroundColor: '#ff4' }} />;
};

const ThirdRoute = () => {
  return <View style={{ flex: 1, backgroundColor: '#8389' }} />;
};

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
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
