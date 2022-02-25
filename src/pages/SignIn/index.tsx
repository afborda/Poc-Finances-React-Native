import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Alert, Platform, Text } from "react-native";
import { useTheme } from "styled-components";
import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import User from "../../assets/user.svg";

import SignInSocialButton from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "../../components/Forms/InputForm";
import auth from "@react-native-firebase/auth";
import LottieView from "lottie-react-native";

import {
  Container,
  Header,
  TitleWrapper,
  Footer,
  FooterWrapper,
  ContainerLogin,
  ContainerActions,
} from "./styles";
import Button from "../../components/Forms/Button";
import { useNavigation } from "@react-navigation/native";

interface LoginData {
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Informe um e-mail valido!")
    .required("Informe seu e-mail!"),
  password: Yup.string(),
});

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth();
  const theme = useTheme();
  const navigation = useNavigation();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);

      Alert.alert("Não foi possivel conectar a conta Google");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      return await signInWithApple();
    } catch (error) {
      console.log(error);

      Alert.alert("Não foi possivel conectar a conta Apple");
    } finally {
      setIsLoading(false);
    }
  }

  function handleLoginUser(form: LoginData) {
    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then(() => {
        Alert.alert("Logado com sucesso");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));

    reset();
  }

  function handleRegisterUser() {
    navigation.navigate("registerUser");
  }

  function handleForgotPassword(form: LoginData) {
    auth()
      .sendPasswordResetEmail(form.email)
      .then(() =>
        Alert.alert("Redefinir Senha", "Enviamos um e-mail para você")
      )
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LottieView
            source={require(`../../assets/finance.json`)}
            autoPlay
            loop
          />
        </TitleWrapper>

        <ContainerLogin>
          <InputForm
            placeholder="E-mail"
            name="email"
            control={control}
            keyboardType="email-address"
            autoCompleteType="email"
            autoCapitalize="none"
            error={errors.email && errors.email.message}
          />
          <InputForm
            placeholder="Senha"
            name="password"
            control={control}
            secureTextEntry
            error={errors.password && errors.password.message}
          />
          <Button
            loading={isLoading}
            title="Enviar"
            onPress={handleSubmit(handleLoginUser)}
          />
        </ContainerLogin>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            onPress={handleSignInWithGoogle}
            svg={GoogleSvg}
          />
          <SignInSocialButton onPress={handleRegisterUser} svg={User} />

          {Platform.OS === "ios" && (
            <SignInSocialButton
              onPress={handleSignInWithApple}
              svg={AppleSvg}
            />
          )}
        </FooterWrapper>
        <ContainerActions>
          <SignInSocialButton
            onPress={handleSubmit(handleForgotPassword)}
            title="Esqueci minha senha"
            svg={User}
            size="large"
          />
        </ContainerActions>

        {isLoading && (
          <ActivityIndicator
            style={{ marginTop: 18 }}
            color={theme.colors.shape}
            size="large"
          />
        )}
      </Footer>
    </Container>
  );
};

export default SignIn;
