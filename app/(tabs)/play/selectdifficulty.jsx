import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
/* import globalStyles from '../../globalStyles'; */
import React from 'react';
import { Link, router } from 'expo-router';

const difficulties = [
  {
    id: 1,
    title: "Easy",
    sequenceLength: 3
  },
  {
    id: 2,
    title: "Medium",
    sequenceLength: 4
  },
  {
    id: 3,
    title: "Hard",
    sequenceLength: 5
  },
  /* custom */
]

// React.memo... less jumpy/flickering when scrolling?
const DifficultyItem = React.memo(({title, sequenceLength}) => {

  /* const dynamicItemStyle = {
    backgroundColor: isDone ? "green" : "black",
  }
 */
  const dynamicItemStyle = {
    backgroundColor: title === "easy" ? "green" : "black",
  }

  return (
    
  <TouchableOpacity onPress={() => router.push({
    pathname: `play/game/${title}`,
    params: { title, sequenceLength }
  })} style={[styles.item, /* {backgroundColor: isDone ? "green" : "black"} */ , {backgroundColor: title === "Easy" ? "green" : title === "Medium" ? "yellow" : title === "Hard" ? "red" : "black" /* black for custom */} ] }> 
    
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={styles.itemSequenceLength}>Length: {sequenceLength}</Text> 
    
    
    {/* <TouchableOpacity onPress={() => {
      navigation.navigate("Details", { title: title, descriptionText: descriptionText, isDone: isDone, id: id})
      }}><FontAwesome name="chevron-right" size={30} color="white" /></TouchableOpacity> */}
  </TouchableOpacity>
  
  )}
);


export default function PlayTab() { /* start by selecting difficulty, after that we route to game/[difficulty] */
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
       

          <Text style={styles.title}>Select Difficulty</Text>

          <FlatList contentContainerStyle={{}} data={difficulties} renderItem={({item}) => <DifficultyItem title={item.title} sequenceLength={item.sequenceLength}/>} keyExtractor={item => item.id.toString()} />
        
       
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "teal",
    flex: 1,
    padding: 16,
    justifyContent: "start",
    alignItems: "center",
    gap: 48,
  },
  title: {
    marginTop: 32, /* 48margintop - 16padding from container above */
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  titleContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    /* backgroundColor: "black",  */
    padding: 10,
   /*  marginTop: 30, */ /* not needed with header shown */
    /* alignItems: "center",
    justifyContent: "center", */
  }, 
  flatlist: {
    alignItems: "center",
    justifyContent: "center", 
    flex: 1, /* flatlist does not inherit flex from parent or something */
  },
  item: {
   /*  flex: 1, */
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: 'gray',
    padding: 20,
   // marginVertical: 8,
    marginBottom: 16, // TODO: change to flex gap somehow?
  },
  itemTitle: {
    fontSize: 24, 
    fontWeight: "bold",
    color: "black",
  },
  itemSequenceLength: {
    fontSize: 20, 
    fontWeight: "bold",
    color: "black",
  }
});