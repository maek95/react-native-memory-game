import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  mainTitle: {
    fontSize: 60,
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  mainTitleContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    /* backgroundColor: "black",  */
    padding: 10,
   /*  marginTop: 30, */ /* not needed with header shown */
    /* alignItems: "center",
    justifyContent: "center", */
  }
  
});

export default globalStyles;