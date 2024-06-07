import { Stack, useGlobalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

export default function GameLayout() {

/*   const global = useGlobalSearchParams();

  console.log(global);

  const [difficultyName, setDifficultyName] = useState("");

  useEffect(() => {
    if (global.difficulty) {

      setDifficultyName(global.difficulty)
    }

  }, [global]) */
 

  return <Stack screenOptions={{
    /* title: 'Game', */
    headerStyle: {backgroundColor: "teal",
      borderWidth: 0,
      elevation: 0, // Remove shadow on Android
      shadowOpacity: 0, // Remove shadow on iOS
      shadowColor: 'transparent'
    },
    headerTintColor: "white"
  }} 
    
    >
      <Stack.Screen name='selectdifficulty' options={{
        title: 'Game',
       /*  headerStyle: {backgroundColor: "teal",
          borderWidth: 0,
          elevation: 0, // Remove shadow on Android
          shadowOpacity: 0, // Remove shadow on iOS
        }, */
      }}>

      </Stack.Screen>

      <Stack.Screen
        name="game/[difficulty]"
        options={({ route }) => ({
          title: `${route.params?.difficulty || '[difficulty]'} Difficulty`,
        })}
      />

    </Stack>;
}
