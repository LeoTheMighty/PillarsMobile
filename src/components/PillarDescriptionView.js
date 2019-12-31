import React, { useState } from 'react';
import { ColorPicker } from 'react-native-color-picker';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, Header } from 'react-native-elements';
import type Pillar from '../types/Pillar';
import { LOADING_TIME } from '../logic/Constants';
import { deepCopyPillar } from '../logic/PillarHelper';
import { convertHexToHSL, convertHSVToHex } from '../logic/ColorHelper';

type Props = {
  pillar: Pillar,
  closeView: () => void,
  editPillarRedux: (Pillar) => void,
  deletePillarRedux: () => void,
};

const generateField = (label, placeholder, value, setValue, editing) => (
  <View>
    {!editing ? (
      [<Header as="h5">{label}</Header>, <Header as="h2">{value}</Header>]
    ) : (
      <Header as="h4">
        <TextInput
          fluid
          value={value}
          type="text"
          label={label}
          name={label}
          placeholder={placeholder}
          onChange={(v) => setValue(v.target.value)}
        />
      </Header>
    )}
  </View>
);

/**
 * Gets the color for the text identifying the Pillar.
 *
 * @param {string} color The hex string for the color of the Pillar.
 * @return {string} The color for the text of the pillar.
 */
const getTextColor = (color) => {
  const hsl = convertHexToHSL(color);
  if (hsl[2] > 50) {
    return 'black';
  }
  return 'white';
};

/**
 * This view displays the actual details of the specified pillar. These details include both editable attributes and the
 * specific actions that one can take on the pillar.
 *
 * @param {Pillar} pillar The pillar to display the information with.
 * @param {Function} closeView Callback function to close the view with.
 * @param {Function} editPillarRedux The redux function to edit this pillar.
 * @param {Function} deletePillarRedux The redux function to delete this specific pillar.
 * @returns {*} The jsx to display the view.
 * @constructor
 */
const PillarDescriptionView = ({
  pillar,
  closeView,
  editPillarRedux,
  deletePillarRedux,
}: Props) => {
  const [currentPillar, setCurrentPillar] = useState(deepCopyPillar(pillar));
  const [isEditing, setIsEditing] = useState(false);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

  const setPillarValue = (n, v) =>
    setCurrentPillar((p) => {
      const c = deepCopyPillar(p);
      c[n] = v;
      return c;
    });

  return (
    <View rows="equal" stretched>
      {generateField(
        'Name',
        'Name For The Pillar',
        currentPillar.name,
        (v) => setPillarValue('name', v),
        isEditing,
      )}
      {generateField(
        'Description',
        'Description For The Pillar',
        currentPillar.description,
        (v) => setPillarValue('description', v),
        isEditing,
      )}
      <View>
        <Text>Color:</Text>
        {isEditing ? (
          <ColorPicker
            defaultColor={currentPillar.color}
            color={currentPillar.color}
            onColorChange={(c) => setPillarValue('color', convertHSVToHex([c.h, c.s, c.v]))}
            onColorSelected={(c) => setPillarValue('color', convertHSVToHex([c.h, c.s, c.v]))}
          />
        ) : (
          <View
            style={{
              background: pillar.color,
              textAlign: 'center',
              color: getTextColor(pillar.color),
            }}
          >
            {pillar.color}
          </View>
        )}
      </View>
      <View>
        <Button
          primary={!isEditing}
          // icon={isEditing ? 'save' : 'pencil'}
          onClick={() => {
            isEditing && editPillarRedux(currentPillar);
            setIsEditing((p) => !p);
          }}
        />
      </View>
      <View>
        <Button
          primary
          negative
          loading={deleteIsLoading}
          onClick={() => {
            setDeleteIsLoading(true);
            setTimeout(() => {
              deletePillarRedux();
              closeView();
              setDeleteIsLoading(false);
            }, LOADING_TIME);
          }}
        >
          Delete
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {},
});

export default PillarDescriptionView;
