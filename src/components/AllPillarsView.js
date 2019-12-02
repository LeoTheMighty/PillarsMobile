import React from 'react';
import _ from 'lodash';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import type Pillar from '../types/Pillar';
import PillarView from './PillarView';
import type PillarSubmission from '../types/PillarSubmission';

type Props = {
  pillars: [Pillar],
  intervalView: string,
  intervalSpan: number,
  submitting: boolean,
  addSubmissionRedux: (number, PillarSubmission) => void,
  removeSubmissionRedux: (number) => void,
  editPillarRedux: (number, Pillar) => void,
  deletePillarRedux: (number) => void,
};

/**
 * The view for displaying all of the pillars.
 *
 * @param {[Pillar]} pillars The pillar objects to display
 * @param {string} intervalView The type of interval type for the values
 * @param {boolean} editing Whether the pillars are currently being submitted or not.
 * @param {Function} addSubmissionRedux Redux function for adding submission.
 * @param {Function} removeSubmissionRedux Redux function for removing submission.
 * @param {Function} deletePillarRedux Redux function for deleting a Pillar.
 * @return {*} The jsx for the component
 * @constructor
 */
const AllPillarsView = ({
  pillars,
  intervalView,
  intervalSpan,
  submitting,
  addSubmissionRedux,
  removeSubmissionRedux,
  editPillarRedux,
  deletePillarRedux,
}: Props) => {
  // Have the view that contains every single one of the pillars
  return (
    <ScrollView horizontal>
      <View
        columns={pillars.length}
        style={{
          height: '80vh',
        }}
      >
        {pillars.length > 0 ? (
          _.times(pillars.length, (i) => (
            <View key={i}>
              <PillarView
                pillar={pillars[i]}
                intervalView={intervalView}
                intervalSpan={intervalSpan}
                submitting={submitting}
                addSubmissionRedux={(s) => addSubmissionRedux(i, s)}
                removeSubmissionRedux={() => removeSubmissionRedux(i)}
                editPillarRedux={(p) => editPillarRedux(i, p)}
                deletePillarRedux={() => deletePillarRedux(i)}
              />
            </View>
          ))
        ) : (
          <View key={1} verticalAlign="middle">
            <Text>
              No Pillars Yet! Press the {<Icon name="plus" />}Button to Start!
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {},
});

export default AllPillarsView;
