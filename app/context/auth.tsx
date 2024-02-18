import axios from "axios";
import { useRootNavigation, useRouter, useSegments } from "expo-router";
import React, { useContext, useEffect, useState } from "react";

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
  loginTest: any;
}

// Define the Provider component
interface ProviderProps {
  children: React.ReactNode;
}

// Create the AuthContext
const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined
);

export function Provider(props: ProviderProps) {
  const [user, setAuth] = React.useState<any | null>(null); //cho nay ban dau la null
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
        console.log("error", error);
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
      const response = await axios.post("/api/login", { email, password });
      const userData = response.data;
      // setAuth(userData);
      return { data: userData, error: undefined };
    } catch (error) {
      // setAuth(null);
      return { error: error as Error, data: undefined };
    }
  };

  const loginTest = async (test: string): Promise<any> => {
    setAuth(true);
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
        loginTest: loginTest,
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
