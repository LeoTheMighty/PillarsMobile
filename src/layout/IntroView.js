import React from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import CheckBox from 'react-native-check-box';

/**
 * Displays information about how to use the app and what its purpose is.
 *
 * @return {*} Jsx to display the component.
 * @constructor
 */
const IntroView = () => {
  return (
    <View
      style={{
        textAlign: 'center',
      }}
    >
      <ScrollView>
        <Header as="h1">
          <Text>Welcome to Pillars!</Text>
        </Header>
        <Text style={styles.header}> Overview </Text>
        <Text style={styles.text}>
          <Text>This is an app that&apos;s dedicated to the</Text>
          <Text style={styles.italic}>consistency</Text>
          <Text>of living life in this modern age.</Text>
        </Text>
        <Text style={styles.text}>
          This app keeps track of the habits you wish to maintain throughout
          your life and helps make sure that you both are trying to continue to
          accomplish these things everyday and also are aware about the
          analytics of how well you have been accomplishing them.
        </Text>
        <Text style={styles.text}>
          Each <Text style={styles.italic}>pillar</Text> indicates a different
          daily habit to accomplish. These can be anything from{' '}
          <Text style={styles.italic}>exercising</Text> to{' '}
          <Text style={styles.italic}>meditating</Text> and even to maintaining
          a strong <Text style={styles.italic}>connection</Text> to loved ones.
          It&amp;&apos;s in my personal opinion that keeping track of these and
          committing to the process of accomplishing them will help you have a
          more fulfilling and engaging life.
        </Text>
        <Text style={styles.header}> How To Use: </Text>
        <Text style={styles.text}>
          To use this app, you first have to figure out the things that you want
          to keep track of in your day-to-day life. These will make up the
          Pillars of your day and will be a frame of reference for your day
          went. These can be everything from going to bed early, to meditating,
          to eating healthy, even to maintaining a strong relationship with
          friends or family.
        </Text>
        <Text style={styles.text}>
          For each one of your pillars, you click the + button at the top of the
          screen, which looks like this:
        </Text>
        <Button title="PLUS" onPress={() => {}} primary icon="plus" />
        <Text />
        <Text style={styles.text}>
          This will get you to the Pillar creation step.
        </Text>
        <Text style={styles.header}>Creating a Pillar</Text>
        <Text style={styles.header}>Name</Text>
        <Text style={styles.text}>
          The name indicates what the Pillar will be called and what it will
          show up as.
        </Text>
        <Text style={styles.header}>Description</Text>
        <Text style={styles.text}>
          The description should basically describe what needs to be done to
          accomplish the Pillar each day, along with metrics about how to do it
          and why it is important to accomplish.
        </Text>
        <Text style={styles.header}>Color</Text>
        <Text style={styles.text}>
          This will determine the color of the pillar as it shows up in the
          view.
        </Text>
        <Text style={styles.header}>Tracking your Progress</Text>
        <Text style={styles.text}>
          The Pillars are based on a once-a-day checking system. Every day, as
          you complete the Pillars, you will use the app in order to check off
          and say that you have completed the Pillar goal. Then, at the end of
          the day, the switch for the Pillar will reset and allow you to check
          it off for the next day.
        </Text>
        <Text style={styles.text}>
          In order to check off each Pillar for the day, first switch the app
          into the checking mode by pressing the check button:
        </Text>
        <Button
          title="CHECK CIRCLE"
          onPress={() => {}}
          primary
          icon="check circle"
        />
        <Text />
        <Text style={styles.text}>
          Then, you check off each one by clicking on the switch at the bottom
          of the Pillar that looks like:
        </Text>
        <CheckBox toggle checked={false} onClick={() => {}} />
        <Text />
        <Text style={styles.text}>
          After you check it off, it will be in the checked position like:
        </Text>
        <CheckBox toggle checked onClick={() => {}} />
        <Text />
        <Text style={styles.header}>Thank You!</Text>
        <Text style={styles.text}>
          Enjoy using my app and I hope you gain something out of it :)
        </Text>
        <Text />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {},
  text: {},
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
});

export default IntroView;
