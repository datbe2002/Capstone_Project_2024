import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { Provider, useAuth } from './context/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BackButton from '../components/BackButton';
import { COLORS } from '../assets';
import { View } from 'react-native';
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};
const queryClient = new QueryClient()
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'mon': require('../assets/fonts/Montserrat-Regular.ttf'),
    'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'mon-b': require('../assets/fonts/Montserrat-Bold.ttf')
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <RootLayoutNav />
      </Provider>
    </QueryClientProvider>
  )
}

function RootLayoutNav() {
  const { authInitialized, userState } = useAuth();

  if (!authInitialized && !userState) return null;
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="introduce" options={{ headerShown: false }} />
      <Stack.Screen name="success_payment" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/register" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/forgot_password" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/change_password" options={{ headerShown: false }} />
      <Stack.Screen name="payment" options={{
        headerShown: true,
        title: 'Thanh toán',
        headerTitleAlign: 'center',
        headerLeft: BackButton,
        // headerRight: UserProfileButton,
        headerTitleStyle: {
          fontFamily: 'mon-b',
          fontSize: 25
        },
        headerTintColor: COLORS.primary,
      }} />
      <Stack.Screen name="addresspayment" options={{
        headerShown: true,
        title: 'Chọn địa chỉ nhận hàng',
        headerTitleAlign: 'center',
        headerLeft: BackButton,
        headerTitleStyle: {
          fontFamily: 'mon-b',
          fontSize: 25
        },
        headerTintColor: COLORS.primary,
      }} />
      <Stack.Screen name="voucher" options={{
        headerShown: true,
        title: 'Chọn mã giảm giá',
        headerTitleAlign: 'center',
        headerLeft: BackButton,
        headerTitleStyle: {
          fontFamily: 'mon-b',
          fontSize: 25
        },
        headerTintColor: COLORS.primary,
      }} />
      <Stack.Screen name="addaddress" options={{
        headerShown: true,
        title: 'Thêm địa chỉ',
        headerTitleAlign: 'center',
        headerLeft: BackButton,
        headerTitleStyle: {
          fontFamily: 'mon-b',
          fontSize: 25
        },
        headerTintColor: COLORS.primary,
      }} />
      <Stack.Screen name='order' options={{
        headerShown: true,
        title: 'Đơn đặt hàng',
        headerTitleAlign: 'center',
        headerLeft: BackButton,
        headerTitleStyle: {
          fontFamily: 'mon-b',
          fontSize: 25
        },
        headerTintColor: COLORS.primary,
      }} />
      <Stack.Screen name="addnewaddress" options={{
        headerShown: true,
        title: 'Thêm địa chỉ',
        headerTitleAlign: 'center',
        headerLeft: BackButton,
        headerTitleStyle: {
          fontFamily: 'mon-b',
          fontSize: 25
        },
        headerTintColor: COLORS.primary,
      }} />
      <Stack.Screen name="(auth)/verifyemail"
        options={{
          headerShown: true,
          title: 'Xác thực Email',
          headerTitleAlign: 'center',
          headerLeft: BackButton,
          headerTitleStyle: {
            fontFamily: 'mon-b',
            fontSize: 25
          },
          headerTintColor: COLORS.primary,
        }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
