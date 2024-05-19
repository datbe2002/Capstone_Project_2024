import axios from "axios";
import { useRootNavigation, useRouter, useSegments } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import instance from "./axiosConfig";
import { Alert } from "react-native";
import { setUserAuthToken } from "./authService";
import { Buffer } from "buffer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AddressData, UserData } from "../../constants/types/normal";
import { useAddressChange, useLoadingStore, useMeasurement, useUserIDStore, useUserStore } from "../store/store";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import * as SecureStore from 'expo-secure-store';
import { TOKEN_KEY } from "../../constants/fakeInf";
interface SignInResponse {
  data: UserData | undefined;
  error: Error | undefined;
}

interface SignOutResponse {
  error: any | undefined;
  data: {} | undefined;
}

interface AuthContextValue {
  signIn: (email: string, password: string) => Promise<SignInResponse>;
  // signUp: (
  //   data: AddressData
  // ) => Promise<any>;
  signOut: () => Promise<SignOutResponse>;
  authInitialized: boolean;
  userState: any;
}

// Define the Provider component
interface ProviderProps {
  children: React.ReactNode;
}

// Create the AuthContext
const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined
);

export const decodeJWT = (token: string) => {
  const base64Url = token.split(".")[1]; // Get the payload part
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Convert to regular base64
  const jsonPayload = decodeURIComponent(
    Buffer.from(base64, "base64")
      .toString("binary")
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export function Provider(props: ProviderProps) {
  // const [user, setAuth] = React.useState<any | null>(null); //cho nay ban dau la null
  const { setUserState, userState } = useUserStore();
  const { setUserId } = useUserIDStore()
  const { setLoadingState } = useLoadingStore();
  const { setSelectedMesurement } = useMeasurement();
  const { setSelectedAddress } = useAddressChange()
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
        let result = await SecureStore.getItemAsync(TOKEN_KEY);
        if (result) {
          const decoded = decodeJWT(result);
          const userID = decoded.UserId;
          const secondRes = await instance.get(
            `/api/user/profile/${userID}`
          );
          const userData = secondRes.data.data;
          setUserId(userID);
          setUserState(userData);
          setUserAuthToken(result);
          setAuthInitialized(true);
        } else {
          throw new Error('No token found')
        }
      } catch (error) {
        console.log("error fetchData", error);
        setAuthInitialized(true);
      }
    };

    fetchData();
  }, []);



  const logout = async (): Promise<SignOutResponse> => {
    try {
      await GoogleSignin.signOut();
      return { error: undefined, data: undefined };
    } catch (error) {
      return { error, data: undefined };
    } finally {
      await SecureStore.deleteItemAsync(TOKEN_KEY)
      setUserAuthToken();
      setUserState(null);
      setSelectedMesurement({
        height: null,
        weight: null
      })
      setSelectedAddress({
        userId: null,
        recipientName: null,
        recipientPhone: null,
        province: null,
        provinceId: null,
        district: null,
        disctrictId: null,
        ward: null,
        wardCode: null,
        street: null,
        isDefault: null,
        id: null,
        isDeleted: null,
        createAt: null,
        updateAt: null,
        updateBy: null,
        createBy: null,
      })

      router.replace("/(auth)/login");
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<SignInResponse> => {
    setLoadingState(true);

    try {
      const response = await instance.post("/api/auth/login", {
        email,
        password,
      });
      let userData: UserData;

      const token = response.data.data.accessToken;
      //Set token to secure store *important
      await SecureStore.setItemAsync(TOKEN_KEY, token);
      const decoded = decodeJWT(token);
      const userID = decoded.UserId;
      const secondRes = await instance.get(`/api/user/profile/${userID}`);
      setUserId(userID);
      userData = secondRes.data.data;
      setLoadingState(false);
      setUserState(userData);
      setUserAuthToken(token);
      return { data: userData, error: undefined };
    } catch (error: any) {
      // console.log(error.response)
      if (error.response && error.response.status === 400) {
        const msg = error.response.data.message;
        // Handle the response data for status code 400
        console.log(msg);
        Alert.alert("Error", msg);
      }
      setLoadingState(false);
      setUserState(null);
      return { error: error as Error, data: undefined };
    }
  };

  useProtectedRoute(userState);

  return (
    <AuthContext.Provider
      value={{
        signIn: login,
        signOut: logout,
        // signUp: registerQuery,
        authInitialized,
        userState,
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
