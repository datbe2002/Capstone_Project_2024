import axios from "axios";
import { useRootNavigation, useRouter, useSegments } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import instance from './axiosConfig';
import { Alert } from "react-native";
import { setUserAuthToken } from './authService'
import { Buffer } from 'buffer';
import AsyncStorage from "@react-native-async-storage/async-storage";
interface SignInResponse {
  data: any; // Update this based on the expected response from your API
  error: Error | undefined;
}

interface SignOutResponse {
  error: any | undefined;
  data: {} | undefined;
}

interface AuthContextValue {
  signIn: (email: string, password: string) => Promise<SignInResponse>;
  signUp: (
    email: string,
    password: string,
    username: string
  ) => Promise<SignInResponse>;
  signOut: () => Promise<SignOutResponse>;
  user: any; // Update this based on the expected user object from your API
  authInitialized: boolean;
}

// Define the Provider component
interface ProviderProps {
  children: React.ReactNode;
}

// Create the AuthContext
const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined
);

const decodeJWT = (token: string) => {
  const base64Url = token.split('.')[1]; // Get the payload part
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Convert to regular base64
  const jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString('binary').split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

export function Provider(props: ProviderProps) {
  const [user, setAuth] = React.useState<any | null>(true); //cho nay ban dau la null
  const [authInitialized, setAuthInitialized] = React.useState<boolean>(false);
  const [isNavigationReady, setNavigationReady] = useState(false);

  const segments = useSegments();
  const router = useRouter();
  const rootNavigation = useRootNavigation();

  const useProtectedRoute = (user: any | null) => {
    useEffect(() => {
      if (!isNavigationReady) {
        return;
      }

      const inAuthGroup = segments[0] === "(auth)";
      if (!authInitialized) return;

      if (!user && !inAuthGroup) {
        router.replace("/introduce");
      } else if (user && inAuthGroup) {
        router.replace("/homepage");
      }
    }, [user, segments, authInitialized, isNavigationReady]);
  };

  useEffect(() => {
    const unsubscribe = rootNavigation?.addListener("state", (event) => {
      setNavigationReady(true);
    });

    return function cleanup() {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [rootNavigation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/get-user");
        const userData = response.data;

        // setAuth(userData);
        setAuthInitialized(true);
        console.log("initialize ", userData);
      } catch (error) {
        console.log("error fetchData", error);
        // setAuth(null);
        setAuthInitialized(true);
      }
    };

    fetchData();
  }, []);

  const logout = async (): Promise<SignOutResponse> => {
    try {
      const response = await axios.post("/api/logout");
      return { error: undefined, data: response.data };
    } catch (error) {
      return { error, data: undefined };
    } finally {
      setAuth(null);
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<SignInResponse> => {
    try {
      console.log(email)
      console.log(password)
      const response = await instance.post("/api/auth/login", { email, password });
      // const userData = response.data;
      // setAuth(userData);
      console.log(response.data)
      const token = response.data.data.accessToken
      const decoded = decodeJWT(token);
      await AsyncStorage.setItem('UserId', JSON.stringify(decoded.UserId));

      setUserAuthToken(token)
      return { data: null, error: undefined };
    } catch (error) {
      console.log(error)
      setAuth(null);
      Alert.alert('Đăng nhập', 'Sai mật khẩu hoặc tài khoản')
      return { error: error as Error, data: undefined };
    }
  };

  const createAccount = async (
    email: string,
    password: string,
    username: string
  ): Promise<SignInResponse> => {
    try {
      const response = await axios.post("/api/register", {
        email,
        password,
        username,
      });
      const userData = response.data;
      // setAuth(userData);
      return { data: userData, error: undefined };
    } catch (error) {
      // setAuth(null);
      return { error: error as Error, data: undefined };
    }
  };

  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        signIn: login,
        signOut: logout,
        signUp: createAccount,
        user,
        authInitialized,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// Define the useAuth hook
export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return authContext;
};
