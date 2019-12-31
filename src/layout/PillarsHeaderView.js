import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Alert, Modal, StyleSheet, Text, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import PillarCreator from '../components/PillarCreator';
import type { FlowReducer } from '../redux/reducers/flowReducer';
import {
  setAdminModalOpen,
  setInfoModalOpen,
  setIntervalView,
  setIntervalSpan,
  setIsChecking,
} from '../redux/actions/flowActions';
import { isDevelopment } from '../logic/AppVariables';
import PillarIntervalViewEditor from '../components/PillarIntervalViewEditor';

type Props = {
  flow: FlowReducer,
  setIsCheckingRedux: (boolean) => void,
  setInfoModalOpenRedux: (boolean) => void,
  setAdminModalOpenRedux: (boolean) => void,
  setIntervalViewRedux: (string) => void,
  setIntervalSpanRedux: (number) => void,
};

/**
 * The view for the header of the pillars main view, which shows the actions to take.
 *
 * @returns {*} The jsx to display the component
 * @constructor
 */
const PillarsHeaderView = ({
  flow,
  setIsCheckingRedux,
  setInfoModalOpenRedux,
  setAdminModalOpenRedux,
  setIntervalViewRedux,
  setIntervalSpanRedux,
}: Props) => {
  const [creatorIsOpen, setCreatorIsOpen] = useState(false);
  const [intervalViewChangerIsOpen, setIntervalViewChangerIsOpen] = useState(
    false,
  );
  return (
    <View style={styles.main}>
      <View style={styles.intervalEditorColumn}>
        <Button
          title="Interval Editor Button"
          icon={<Icon name="arrow right" />}
          onPress={() =>
            intervalViewChangerIsOpen || setIntervalViewChangerIsOpen(true)
          }
        />
        <Modal
          visible={intervalViewChangerIsOpen}
          onDismiss={() => setIntervalViewChangerIsOpen(false)}
        >
          <Text style={styles.header}>Choose the Pillar View</Text>
          <View>
            <PillarIntervalViewEditor
              flow={flow}
              setIntervalViewRedux={setIntervalViewRedux}
              setIntervalSpanRedux={setIntervalSpanRedux}
            />
          </View>
        </Modal>
      </View>
      <View style={styles.pillarCreatorColumn}>
        <Button
          title="Pillar Creator Button"
          icon={<Icon name="plus" />}
          onPress={() => creatorIsOpen || setCreatorIsOpen(true)}
        />
        <Modal
          visible={creatorIsOpen}
          onDismiss={() => setCreatorIsOpen(false)}
        >
          <Text style={styles.header}>Pillar Creator</Text>
          <View>
            <PillarCreator closeView={() => setCreatorIsOpen(false)} />
          </View>
        </Modal>
      </View>
      <View style={styles.pillarCheckerColumn}>
        <Button
          title="Pillar Checker Button"
          icon={<Icon name="check-square" />}
          onPress={() => setIsCheckingRedux(!flow.isChecking)}
        />
      </View>
      <View style={styles.infoColumn}>
        <Button
          title="Info Button"
          icon={<Icon name="info" />}
          onPress={() => setInfoModalOpenRedux(true)}
        />
      </View>
      {isDevelopment && (
        <View style={styles.adminColumn}>
          <Button
            title="Admin Button"
            icon={<Icon name="arrow right" />}
            onPress={() => setAdminModalOpenRedux(true)}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    // House all the flex-box stuff in here! Replacement for Grids.
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  intervalEditorColumn: {},
  pillarCreatorColumn: {},
  pillarCheckerColumn: {},
  infoColumn: {},
  adminColumn: {},
  header: {},
});

export default connect(
  (state) => ({
    flow: state.flow,
  }),
  (dispatch) => {
    return {
      setIsCheckingRedux: (isChecking) => {
        dispatch(setIsChecking(isChecking));
      },
      setInfoModalOpenRedux: (infoModalOpen) =>
        dispatch(setInfoModalOpen(infoModalOpen)),
      setAdminModalOpenRedux: (adminModalOpen) =>
        dispatch(setAdminModalOpen(adminModalOpen)),
      setIntervalSpanRedux: (intervalSpan) =>
        dispatch(setIntervalSpan(intervalSpan)),
      setIntervalViewRedux: (intervalView) =>
        dispatch(setIntervalView(intervalView)),
    };
  },
)(PillarsHeaderView);
