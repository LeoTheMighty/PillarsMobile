import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, StyleSheet, View } from 'react-native';
import { Button, Header } from 'react-native-elements';
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
    <View fluid>
      <View columns="equal">
        <View>
          <Button
            primary
            icon="eye"
            onClick={() =>
              intervalViewChangerIsOpen || setIntervalViewChangerIsOpen(true)
            }
          />
          <Modal
            open={intervalViewChangerIsOpen}
            onClose={() => setIntervalViewChangerIsOpen(false)}
            closeIcon
          >
            <Header>Choose the Pillar View</Header>
            <View>
              <PillarIntervalViewEditor
                flow={flow}
                setIntervalViewRedux={setIntervalViewRedux}
                setIntervalSpanRedux={setIntervalSpanRedux}
              />
            </View>
          </Modal>
        </View>
        <View>
          <Button
            icon="plus"
            primary
            onClick={() => creatorIsOpen || setCreatorIsOpen(true)}
          />
          <Modal
            closeIcon
            open={creatorIsOpen}
            onClose={() => setCreatorIsOpen(false)}
          >
            <Header>Pillar Creator</Header>
            <View>
              <PillarCreator closeView={() => setCreatorIsOpen(false)} />
            </View>
          </Modal>
        </View>
        <View>
          <Button
            primary={!flow.isChecking}
            icon="check circle"
            onClick={() => setIsCheckingRedux(!flow.isChecking)}
          />
        </View>
        <View>
          <Button
            primary
            icon="info circle"
            onClick={() => setInfoModalOpenRedux(true)}
          />
        </View>
        {isDevelopment && (
          <View>
            <Button
              primary
              icon="adn"
              onClick={() => setAdminModalOpenRedux(true)}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {},
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
