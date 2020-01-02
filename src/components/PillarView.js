import React, { useState, useEffect } from 'react';
import { CheckBox, Modal, StyleSheet, Text, View } from 'react-native';
import { Button, Header } from 'react-native-elements';
import type Pillar from '../types/Pillar';
import {
  getCurrentPillarValue,
  isSubmitted,
  newSubmission,
} from '../logic/PillarHelper';
import type PillarSubmission from '../types/PillarSubmission';
import PillarDescriptionView from './PillarDescriptionView';
import { convertHexToHSL, convertHSLToHex } from '../logic/ColorHelper';

type Props = {
  pillar: Pillar,
  intervalView: string,
  intervalSpan: number,
  submitting: boolean,
  addSubmissionRedux: (PillarSubmission) => void,
  removeSubmissionRedux: () => void,
  editPillarRedux: (Pillar) => void,
  deletePillarRedux: () => void,
};

/**
 * Handles the checking of the visual Pillar while in submitting mode.
 *
 * @param checked
 * @param {Function} addSubmissionRedux
 * @param setChecked
 * @param setConfirmUndoModalOpen
 */
const handlePillarCheck = (checked, addSubmissionRedux, setChecked, setConfirmUndoModalOpen) => {
  if (!checked) {
    // Handle if there is an intense pillar
    addSubmissionRedux(newSubmission(1.0));
    setChecked(true);
  } else {
    // Then always make sure they know
    setConfirmUndoModalOpen(true);
  }
};

/**
 *
 * @param removeSubmissionRedux
 * @param setChecked
 * @param setConfirmModalOpen
 */
const handlePillarUncheckConfirm = (
  removeSubmissionRedux,
  setChecked,
  setConfirmModalOpen,
) => {
  removeSubmissionRedux();
  setChecked(false);
  setConfirmModalOpen(false);
};

/**
 * Gets the color of the shine for the pillar.
 *
 * @param {string} color The color as it appears in the pillar.
 * @returns {string} The color of the shine for the pillar.
 */
const getShineColor = (color) => {
  const hsl = convertHexToHSL(color);
  if (hsl[2] > 50) {
    return convertHSLToHex([hsl[0], hsl[1], Math.max(hsl[2] - 10, 0)]);
  }
  return convertHSLToHex([hsl[0], hsl[1], Math.min(hsl[2] + 10, 100)]);
};

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
 * The view that displays the specific pillar information for a single pillar
 *
 * @param {Pillar} pillar The pillar to show information for
 * @param {string} intervalView The type of interval
 * @param {boolean} submitting Whether the pillar is able to be checked right now.
 * @param {Function} addSubmissionRedux Redux function for
 * @return {*} The jsx for displaying the component
 * @constructor
 */
const PillarView = ({
  pillar,
  intervalView,
  intervalSpan,
  submitting,
  addSubmissionRedux,
  removeSubmissionRedux,
  editPillarRedux,
  deletePillarRedux,
}: Props) => {
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState(0);
  const [shineColor, setShineColor] = useState('white');
  const [confirmUndoModalOpen, setConfirmUndoModalOpen] = useState(false);

  useEffect(() => {
    setChecked(isSubmitted(pillar));
    setValue(getCurrentPillarValue(pillar, intervalView, intervalSpan));
    setShineColor(getShineColor(pillar.color));
  }, [pillar, pillar.submissions, intervalView, intervalSpan, checked]);

  return (
    <View
      style={{
        borderColor: 'rgb(187,187,187)',
        borderStyle: 'solid',
        borderWidth: 'thin',
        borderRadius: 4,
        height: `${(value + 0.01) * 75}%`,
        alignItems: 'center',
        justifyContent: 'center',
        color: getTextColor(pillar.color),
        backgroundColor: `linear-gradient(to bottom right, ${shineColor}, ${pillar.color}, ${pillar.color}, ${shineColor}, ${pillar.color})`,
      }}
      onTouchEnd={() =>
        !submitting && !detailModalOpen && setDetailModalOpen((p) => !p)
      }
    >
      <View
        style={{
          position: 'absolute',
          width: '100%',
          bottom: 2,
        }}
      >
        <View style={styles.pillarView}>
          <Text style={{ color: getTextColor(pillar.color) }}>
            {(value * 100).toFixed(0)}%
          </Text>
          <Text style={{ color: getTextColor(pillar.color) }}>
            {pillar.name}
          </Text>
          <View style={styles.checkingContainer}>
            {submitting && (
              <CheckBox
                toggle
                checked={checked}
                onChange={() =>
                  handlePillarCheck(
                    checked,
                    addSubmissionRedux,
                    setChecked,
                    setConfirmUndoModalOpen,
                  )
                }
              />
            )}
            <Modal
              visible={confirmUndoModalOpen}
              onDismiss={() => setConfirmUndoModalOpen(false)}
            >
              <Text>Are you sure you want to uncheck this pillar?</Text>
              <View>
                <Button
                  title="Confirm Uncheck Pillar Button"
                  onClick={() =>
                    handlePillarUncheckConfirm(
                      removeSubmissionRedux,
                      setChecked,
                      setConfirmUndoModalOpen,
                    )
                  }
                >
                  Uncheck
                </Button>
              </View>
            </Modal>
          </View>
        </View>
      </View>
      <Modal
        visible={detailModalOpen}
        onDismiss={() => setDetailModalOpen(false)}
      >
        <Text>{pillar.name}</Text>
        <View>
          <PillarDescriptionView
            pillar={pillar}
            closeView={() => setDetailModalOpen(false)}
            editPillarRedux={editPillarRedux}
            deletePillarRedux={deletePillarRedux}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  pillarView: {
    flexDirection: 'row',
    flex: 1,
    alignContent: 'center',
  },
  checkingContainer: {},
});

export default PillarView;
