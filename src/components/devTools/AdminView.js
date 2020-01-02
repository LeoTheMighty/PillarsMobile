import React from 'react';
import { Text, View } from 'react-native';

/**
 * This is the administrative view for the app, which lets you do a lot of things
 * special.
 *
 * @return {*}
 * @constructor
 * @return {*} JSX for the component.
 */
const AdminView = () => {
  return (
    <View style={styles.main}>
      <Text>ADMIN VIEW</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {},
});

export default AdminView;
