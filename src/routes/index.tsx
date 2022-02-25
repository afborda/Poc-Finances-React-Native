import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";
import { useAuth } from "../hooks/auth";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

function Routes() {
  // const [userFirebase, setUserFirebase] =
  //   useState<FirebaseAuthTypes.User | null>();
  const { user, userFirebase } = useAuth();

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(setUserFirebase);

  //   return subscriber;
  // }, []);

  return (
    <NavigationContainer>
      {user.id || userFirebase ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}

export default Routes;
