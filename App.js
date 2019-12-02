import React, { useState } from 'react';
import {
  Button,
  FlatList,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import { TabView, SceneMap } from 'react-native-tab-view';
import MainView from './src/layout/MainView';
import store from './src/redux/store';
import IntroView from './src/layout/IntroView';

const routes = [
  {
    key: 'first',
    title: 'First',
  },
  {
    key: 'second',
    title: 'Second',
  },
  {
    key: 'test',
    title: 'Test',
  },
];

const items = Array(...Array(60)).map((v, i) => {
  return { id: i, src: `http://placehold.it/200x200?text=${i + 1}` };
});

const Test = () => (
  <View
    style={{
      justifyContent: 'center',
      flex: 1,
      paddingTop: 30,
    }}
  >
    <FlatList
      data={items}
      renderItem={({ item }) => (
        <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
          <Image
            source={{ uri: item.src }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 100,
            }}
          />
        </View>
      )}
      numColumns={3}
      keyExtractor={(item, index) => String(index)}
    />
  </View>
);

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar hidden />
        <Button title="Open" onPress={() => setModalIsOpen(true)}>
          Open
        </Button>
        <Modal visible={modalIsOpen}>
          <TabView
            navigationState={{ index, routes }}
            onIndexChange={(i) => setIndex(i)}
            renderScene={SceneMap({
              first: () => <IntroView />,
              second: () => <MainView />,
              test: Test,
            })}
            tabBarPosition="bottom"
          />
        </Modal>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default App;
