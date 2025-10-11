import { ThemeProvider, DefaultTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

const BeigeTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FAF9F7', // soft beige background
    card: '#F3EDE3', // header or card color
    text: '#3C2E23', // dark brown text
    border: '#E2D6C4', // subtle beige border
    primary: '#5A4634', // dark brown accent
    notification: '#CBBBA0', // beige highlight for notifications
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={BeigeTheme}>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{
            presentation: 'modal',
            title: 'Modal',
            headerStyle: { backgroundColor: '#F3EDE3' },
            headerTintColor: '#3C2E23',
            headerTitleStyle: { fontWeight: '600' },
          }}
        />
      </Stack>

      <StatusBar style="dark" backgroundColor="#FAF9F7" />
    </ThemeProvider>
  );
}
