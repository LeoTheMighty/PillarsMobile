import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Header, Image } from 'react-native-elements';
import { connect } from 'react-redux';
import { updateUser } from '../redux/actions/userActions';
import Logo from '../img/pillars.png';

/**
 * The view for showing the loading splash screen of the app.
 *
 * @return {*} The jsx for displaying the component
 */
const loadingScreen = () => (
  <View style={{ textAlign: 'center' }}>
    <View>
      <View
        raised
        padded
        inverted
        style={{
          minWidth: 340,
          maxWidth: 800,
          marginBottom: -60,
          marginTop: 120,
        }}
      >
        <View basic>
          <Image source={Logo} size="tiny" centered />
          <Header as="h2" inverted textAlign="center">
            Loading...
          </Header>
        </View>
      </View>
    </View>
  </View>
);

/**
 * The controlled view for showing the app given if the add is loading.
 *
 * @param {[*]} children The children of the component to render if not loading
 * @param {Function} updateUserRedux The function in charge of updating the user from storage
 * @return {*} The jsx for displaying the component
 * @constructor
 */
const SplashScreen = ({ children, updateUserRedux }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    updateUserRedux(() => {
      setIsLoading(false);
    });
  });

  return isLoading ? loadingScreen() : children;
};

export default connect(() => ({}), {
  updateUserRedux: (successHandler) => updateUser(successHandler),
})(SplashScreen);
