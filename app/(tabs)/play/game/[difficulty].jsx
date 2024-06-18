import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Context } from "../../../../context";
import { Path, Svg } from "react-native-svg";

export default function GameDetail() {
  const [gameIsStarted, setGameIsStarted] = useState(false);
  const [activeSlice, setActiveSlice] = useState(0);
  const [pattern, setPattern] = useState([]);
  const [sequenceComplete, setSequenceComplete] = useState(false);
  const [pressedSlice, setPressedSlice] = useState(null); // State for tracking pressed slice
  const { count, setCount } = useContext(Context);
  const local = useLocalSearchParams();
  const [animatedColor, setAnimatedColor] = useState("purple");
  const [clickCount, setClickCount] = useState(0);
  const [timer, setTimer] = useState(5.0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timerReady, setTimerReady] = useState(true); 
  const [isWinner, setIsWinner] = useState(false);

  // time penalty if click wrong slice, how update the timer that is already running?
  useEffect(() => {
    if (sequenceComplete === true && timerReady) {
      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => Math.max(prevTimer - 0.1, 0).toFixed(1));
      }, 100);

      return () => clearInterval(timerInterval);
    }
  }, [sequenceComplete, timerReady]);

  useEffect(() => {
    if (correctCount == sequenceLength) {
      setTimerReady(false); // Stop the timer when all sequences are correct
      setIsWinner(true);
      setGameIsStarted(false);
    }
  }, [correctCount, sequenceLength]);

  /* const animatedOpacity1 = useRef(new Animated.Value(0)).current;
  const animatedOpacity2 = useRef(new Animated.Value(0)).current;
  const animatedOpacity3 = useRef(new Animated.Value(0)).current;
  const animatedOpacity4 = useRef(new Animated.Value(0)).current; */

  const animatedOpacities = [];
  for (let i = 0; i < 4; i++) {
    animatedOpacities.push(useRef(new Animated.Value(0)).current);
  }

  if (!local.sequenceLength) {
    return (
      <View style={styles.container}>
        <Text>Loading difficulty...</Text>
      </View>
    );
  }
  const sequenceLength = local.sequenceLength;

  const handlePress = (event) => {
    if (sequenceComplete && clickCount < sequenceLength) {
      const { locationX, locationY } = event.nativeEvent;
      const centerX = 150; // Half of the SVG height and width (300/2)
      const centerY = 150; // Half of the SVG height and width (300/2)
      const dx = locationX - centerX;
      const dy = locationY - centerY;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 180;

      let slice = 0;
      if (angle >= 0 && angle < 90) {
        slice = 4;
      } else if (angle >= 90 && angle < 180) {
        slice = 1;
      } else if (angle >= 180 && angle < 270) {
        slice = 2;
      } else {
        slice = 3;
      }

      // setPressedSlice(slice); /* just for console log, dont rly need it...? */
      console.log(`Pressed slice: ${slice}`);
      setClickCount((prevClickCount) => prevClickCount + 1);

      console.log("pattern[clickCount]: ", pattern[clickCount]);
      /* console.log("slice: ", slice); */

      if (slice === pattern[clickCount]) {
        console.log("correct!");
        /*  setActiveSlice(slice); */
        setCorrectCount(prevCorrectCount => prevCorrectCount + 1);
        setAnimatedColor("green");

        const animatedOpacity =
          animatedOpacities[slice - 1]; /* slice  of the circle */
        animatedOpacity.setValue(1);

        Animated.timing(animatedOpacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      } else {
        console.log("wrong!");
        setClickCount(
          (prevClickCount) => prevClickCount - 1
        ); /* e.g. if the first slice is 1 and you click 2, you still have to click 1 to get "correct" until you can guess the next slice in the pattern */

        setAnimatedColor("red");

        const animatedOpacity =
          animatedOpacities[slice - 1]; /* slice  of the circle */
        animatedOpacity.setValue(1);

        Animated.timing(animatedOpacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      }
    } else if (!sequenceComplete) {
      console.log("Can't click before sequence is complete!");
    } else {
      console.log("Game is finished, no more clicking!");
    }
  };

  const getRandomSlice = () => {
    return Math.floor(Math.random() * 4) + 1;
  };

  useEffect(() => {
    if (gameIsStarted) {
      console.log("sequence length: ", sequenceLength);
      setCorrectCount(0);
      setAnimatedColor("purple");
      setPattern([]);
      setClickCount(0);
      setPressedSlice(null);
      setSequenceComplete(false);
      setTimer(5.0);
      setTimerReady(true);
      let count = 0;
      const interval = setInterval(() => {
        if (count >= sequenceLength) {
          clearInterval(interval);
          setActiveSlice(0);
          setSequenceComplete(true);
          console.log("sequenceComplete: ", sequenceComplete);
          return;
        }

        const slice = getRandomSlice();
        setActiveSlice(slice);
        setPattern((prevPattern) => [...prevPattern, slice]); // save which slices blinked

        // Reset all animated opacities, if for some reason it wasnt already
        /*  animatedOpacity1.setValue(0);
        animatedOpacity2.setValue(0);
        animatedOpacity3.setValue(0);
        animatedOpacity4.setValue(0); */
        animatedOpacities.forEach((animatedOpacity) =>
          animatedOpacity.setValue(0)
        );

        // Animate the opacity of the active slice
        if (slice >= 1 && slice <= 4) {
          const animatedOpacity =
            animatedOpacities[slice - 1]; /* slice  of the circle */
          animatedOpacity.setValue(1);

          Animated.timing(animatedOpacity, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }).start();
        }

        // actually this does nothing?
        /* setTimeout(() => { 
          setActiveSlice(300); // set to something outside the 1-4 range, (4 slices in the circle)
         }, 1000);  */ // "cooldown" between the blinking, why is this the same as  setActivSlice above if-statement?

        count++;
      }, 1300); // 2000 - animated duration will be the cooldown between the animations...?

      /* if (count === sequenceLength) {
        setSequenceComplete(true);
      } */

      return () => clearInterval(interval);
    }
  }, [gameIsStarted]);

  /* if (sequenceComplete) {
    console.log(`Pressed slice: ${pressedSlice}`);
  } */

  // TODO: timer ticking down

  /*  console.log("pattern:" , pattern);
  console.log("clickCount: ", clickCount); */

  return (
    <View style={styles.container}>
      {(timer == 0 || correctCount == sequenceLength) && ( 
        <View style={styles.gameFinishedView}>
         {/*  <Text style={[{ color: "white" }, styles.gameFinishedText]}>Game Finished</Text> */}
          {isWinner ? <Text style={[{ color: "green" }, styles.gameFinishedText]}>Winner!</Text> : <Text style={[{ color: "red" }, styles.gameFinishedText]}>You Lost!</Text>}

          <TouchableOpacity
              onPress={() => {
                setSequenceComplete(false);
                setGameIsStarted(true);
              }}
              style={styles.startButton}
            >
              <Text style={styles.startButtonText}>Play Again</Text>
              <FontAwesome name="play" color={"white"} size={32} />
            </TouchableOpacity>
        </View>
      )}
      {gameIsStarted ? (
        <View
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            gap: 36,
          }}
        >
          <View style={{ height: 80 }}>
            {sequenceComplete ? (
              <Text style={styles.sequenceCompleteMessage}>
                Click in correct order!
                {/*  pressed slice: {pressedSlice} */}
              </Text>
            ) : (
              <Text style={styles.sequenceCompleteMessage}>
                Remember the pattern!
              </Text>
            )}
          </View>

          <Svg
            onPressIn={handlePress}
            height="300"
            width="300"
            viewBox="0 0 100 100"
          >
            {/* First slice */}
            <Path d="M50 50 L50 1 A49 49 0 0 1 99 50 Z" fill={"lightblue"} />
            <AnimatedPath
              d="M50 50 L50 1 A49 49 0 0 1 99 50 Z"
              fill={`${animatedColor}`}
              style={{ opacity: animatedOpacities[0] }}
            />

            {/* Second slice */}
            <Path d="M50 50 L99 50 A49 49 0 0 1 50 99 Z" fill={"lightblue"} />
            <AnimatedPath
              d="M50 50 L99 50 A49 49 0 0 1 50 99 Z"
              fill={`${animatedColor}`}
              style={{ opacity: animatedOpacities[1] }}
            />

            {/* Third slice */}
            <Path d="M50 50 L50 99 A49 49 0 0 1 1 50 Z" fill={"lightblue"} />
            <AnimatedPath
              d="M50 50 L50 99 A49 49 0 0 1 1 50 Z"
              fill={`${animatedColor}`}
              style={{ opacity: animatedOpacities[2] }}
            />

            {/* Fourth slice */}
            <Path d="M50 50 L1 50 A49 49 0 0 1 50 1 Z" fill={"lightblue"} />
            <AnimatedPath
              d="M50 50 L1 50 A49 49 0 0 1 50 1 Z"
              fill={`${animatedColor}`}
              style={{ opacity: animatedOpacities[3] }}
            />

            {/* Add strokes for the dividing lines, border between the slices */}
            <Path d="M50 50 L50 1" stroke="black" strokeWidth={1} />
            <Path d="M50 50 L99 50" stroke="black" strokeWidth={1} />
            <Path d="M50 50 L50 99" stroke="black" strokeWidth={1} />
            <Path d="M50 50 L1 50" stroke="black" strokeWidth={1} />
          </Svg>

          <Text style={styles.timerText}>
            {/* Time remaining:  */}
            {timer}s
          </Text>
        </View>
      ) : (
        <View style={styles.startButtonContainer}>
          <Text style={styles.sequenceCompleteMessage}>
            Remember the pattern!
          </Text>
          <View
            style={{
              display: "flex",
              height: 300,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setSequenceComplete(false);
                setGameIsStarted(true);
              }}
              style={styles.startButton}
            >
              <Text style={styles.startButtonText}>Start</Text>
              <FontAwesome name="play" color={"white"} size={32} />
            </TouchableOpacity>
          </View>
          <View style={{}}>
            <Text>{""}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "teal",
  },
  sequenceCompleteMessage: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  startButtonContainer: {
    display: "flex",
    flex: 1,
    gap: 36,
    width: "100%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
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
    lineHeight: 36,
    textAlign: "center",
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
  circleContainer: {
    width: 300,
    height: 300,
    borderRadius: 100,
    position: "relative",
    overflow: "hidden",
  },
  timerText: {
    color: "white",
    fontSize: 48,
  },
  gameFinishedView: {
    display: "flex",
    flex: 1,
    gap: 32,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 50,
    position: "absolute",
    height: 420,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.95)", // Apply opacity to the background color only
    /* backgroundColor: "black", */
    /* opacity: 0.5, */
  },
  gameFinishedText: {
   /*  zIndex: 60, */
    /* opacity: 1, */
    textAlign: "center",
    fontSize: 48,
    fontWeight: "bold",
    /* color: "white", */
  }
});
