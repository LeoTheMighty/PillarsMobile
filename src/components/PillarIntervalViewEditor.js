import React from 'react';
import { Picker, StyleSheet, Text, TextInput, View } from 'react-native';
import type { FlowReducer } from '../redux/reducers/flowReducer';

type Props = {
  flow: FlowReducer,
  setIntervalViewRedux: (string) => void,
  setIntervalSpanRedux: (number) => void,
};

/**
 * Shows the view for the editor for the Pillar Interval View so that the user
 * can view pillars at different time spans.
 *
 * @return {*} The jsx to show the component.
 * @constructor
 */
const PillarIntervalViewEditor = ({
  flow,
  setIntervalViewRedux,
  setIntervalSpanRedux,
}: Props) => {
  return (
    <View>
      <View columns="equal">
        <View>
          <Picker
            label="Type of interval"
            value={flow.currentIntervalView}
            selection
            options={[
              { key: 'day', value: 'day', text: 'Daily View' },
              { key: 'week', value: 'week', text: 'Weekly View' },
              { key: 'month', value: 'month', text: 'Monthly View' },
              {
                key: 'start',
                value: 'start',
                text: 'Since Pillar Start',
              },
            ]}
            onChange={(e, { value }) => {
              setIntervalViewRedux(value);
              setIntervalSpanRedux(1);
            }}
          />
        </View>
        <View>
          {flow.currentIntervalView === 'start' || [
            <Text
              key="1"
              color="black"
            >{`How many ${flow.currentIntervalView}s`}</Text>,
            <TextInput
              key="2"
              value={flow.currentIntervalSpan.toString(10)}
              onChange={(e) =>
                e.target.value > 0 && setIntervalSpanRedux(e.target.value)
              }
              type="number"
            />,
          ]}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {},
});

export default PillarIntervalViewEditor;
