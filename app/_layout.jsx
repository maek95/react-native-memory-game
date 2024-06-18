import { Stack } from 'expo-router/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ContextProvider } from '../context';

export default function Layout() {
  return (
    <SafeAreaProvider> 
      <ContextProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      </ContextProvider>
    </SafeAreaProvider>
  );
}
