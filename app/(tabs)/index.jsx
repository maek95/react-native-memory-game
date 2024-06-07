import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import globalStyles from "../globalStyles";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Tab() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [welcomeMessage, setWelcomeMessage] = useState("");
  /* 
  useEffect(() => {

    fetchMockMessage();

  }, [])

  async function fetchMockMessage() {
    try {
      const response = await fetch("https://run.mocky.io/v3/573146a5-0749-48f6-bbd0-6815adc97adc", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Origin': '*', // Replace 'your-app-origin' with the appropriate origin
        },
      });
      const data = await response.json();

      if (data.messages) {
        console.log("succesful fetch of mock data");
        setWelcomeMessage(data.messages[0]);
      } else {
        console.log("no data.message?");
      }

    } catch (error) {
      console.error("Failed fetching mock messages: ", error);
    }
  }
 */
  //console.log(welcomeMessage);

  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <View style={globalStyles.mainTitleContainer}>
        <Text style={globalStyles.mainTitle}>CHAS MEMORY</Text>
      </View>
      {welcomeMessage !== "" && <Text>{welcomeMessage}</Text>}
      <View style={styles.buttonContainer}>
        {!isLoggedIn && (
          <>
            <TouchableOpacity style={styles.loginAndCreateButton}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginAndCreateButton}>
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <View style={styles.socialsContainer}>
        <FontAwesome name="github" size={30} color="white" />
      </View>
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
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
   /*  backgroundColor: "red", */
    padding: 10,
    alignItems: "center",
    gap: 16,
  },
  loginAndCreateButton: {
    backgroundColor: "gray",
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: 280,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  socialsContainer: {
    position: "absolute",
    bottom: 0,
    paddingBottom: 16, /* was removed by bottom: 0 ? */
    width: "100%",
    justifyContent: "start",

  }
});
