import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ChromePicker } from 'react-color';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, Divider, Header } from 'react-native-elements';
import { addPillar } from '../redux/actions/userActions';
import { newPillar } from '../logic/PillarHelper';
import type Pillar from '../types/Pillar';
import { LOADING_TIME } from '../logic/Constants';

type Props = {
  closeView: () => void,
  // Directly From Redux
  addPillarRedux: (Pillar) => void,
};

/**
 * Creates a pillar and adds it to the redux and component state.
 *
 * @param {string} name The name of pillar to the make.
 * @param {string} description The description for the pillar to make.
 * @param {string} color The color of the pillar to create.
 * @param {Function} closeView Parent function to close the current view.
 * @param {Function} addPillarRedux The redux function to add a pillar to the user.
 * @param {Function} setSuccess Sets the success state
 * @param {Function} setIsLoading Sets the is loading state
 * @param {Function} setError Sets the error state
 * @returns {void}
 */
const createPillar = (
  name,
  description,
  color,
  closeView,
  addPillarRedux,
  setSuccess,
  setIsLoading,
  setError,
) => {
  setIsLoading(true);
  setTimeout(() => {
    if (name && color) {
      const pillar = newPillar(name, description, color);
      addPillarRedux(pillar);
      setSuccess(true);
      closeView();
    } else {
      setSuccess(false);
      setError(new Error(''));
    }
    setIsLoading(false);
  }, LOADING_TIME);
};

/**
 * Shows a success label based on the given info.
 *
 * @param {boolean} show Whether the User has successfully created a Challenge or not.
 * @return {*} The React JSX to display the success label or null if not applicable.
 */
export const createSuccessLabel = (show) => {
  if (show) {
    return (
      <Text positive>
        <Header>Success!</Header>
        <View>You just created a new Challenge!</View>
      </Text>
    );
  }
  return null;
};

/**
 * Displays an error message if applicable.
 *
 * @param {Error} error The error message string.
 * @return {*} The React JSX to show the error message.
 */
export const displayError = (error) => {
  if (error) {
    return (
      <Text negative>
        <Header>Sorry!</Header>
        <View>{error.message}</View>
      </Text>
    );
  }
  return null;
};

/**
 * The view in charge of creating a new pillar for User.
 *
 * @param {PillarsUser} user The redux user currently using the app
 * @param {Function} addPillarRedux The redux function responsible for adding a new pillar
 * @return {*} The jsx to display the component
 * @constructor
 */
const PillarCreator = ({ closeView, addPillarRedux }: Props) => {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [color, setColor] = useState('#5fcdff');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <View align="center">
      <View>
        <Header as="h4">
          <TextInput
            fluid
            type="text"
            name="name"
            placeholder="Name of the Pillar"
            onChange={(value) => setName(value.target.value)}
          />
        </Header>
        <Header as="h5">
          <TextInput
            fluid
            type="text"
            name="description"
            placeholder="Description for how to complete"
            onChange={(value) => setDescription(value.target.value)}
          />
        </Header>
      </View>
      <Header as="h5">Choose the Color</Header>
      <ChromePicker
        color={color}
        onChangeComplete={(c) => setColor(c.hex)}
        disableAlpha
      />
      <View align="center">
        <View align="center">
          <View centered>
            <View centered>
              <View>
                <View>
                  {displayError(error)}
                  {createSuccessLabel(success)}
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Divider />
      <View>
        <Button
          loading={isLoading}
          disabled={isLoading}
          primary
          size="big"
          type="button"
          onClick={() =>
            createPillar(
              name,
              description,
              color,
              closeView,
              addPillarRedux,
              setSuccess,
              setIsLoading,
              setError,
            )
          }
        >
          Submit
        </Button>
      </View>
      {createSuccessLabel(success)}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {},
});

export default connect(
  () => ({}),
  (dispatch) => {
    return {
      addPillarRedux: (pillar, index) => {
        dispatch(addPillar(pillar, index));
      },
    };
  },
)(PillarCreator);
