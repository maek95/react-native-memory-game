import { FontAwesome } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function GameDetail() {

  const local = useLocalSearchParams();

  console.log(local);

  if (!local.sequenceLength) { /* not needed, but maybe if I forget */
    return (
      <View style={styles.container}>
        <Text>Loading difficulty...</Text>
     
      </View>
    )
  }
  const sequenceLength = local.sequenceLength;
 
  /* const { title, amount } = router.params; */

  return (
    <View style={styles.container}>
      <View style={styles.startButtonContainer}>
      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startButtonText}>Start
          
        </Text>
        <FontAwesome name='play' size={32}></FontAwesome>
      </TouchableOpacity>
      </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'teal',
  },
  startButtonContainer: {
    width: "100%",
    /* backgroundColor: "red", */
    padding: 10,
    alignItems: "center",
  },
  startButton: {
    backgroundColor: "gray",
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: 280,
    height: 100,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 16,
    
  },
  startButtonText: {
    lineHeight: 36, /* had to use this to center it with the play-icon... */
    textAlign: "center",
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
});
