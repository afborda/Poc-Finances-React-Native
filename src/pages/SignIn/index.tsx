import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Alert, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import User from "../../assets/user.svg";

import Logo from "../../assets/logo.svg";
import SignInSocialButton from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "../../components/Forms/InputForm";
import auth from "@react-native-firebase/auth";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
  ContainerLogin,
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
  password: Yup.string().required("Informe sua senha!"),
});

const SignIn = () => {
  // const data = useAuth();
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

  async function handleLoginUser() {
    navigation.navigate("registerUser");
    reset();
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
          <Logo width={RFValue(120)} height={RFValue(68)} />
        </TitleWrapper>
        <SignInTitle>Faça seu login uma das contas abaixo</SignInTitle>
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
          <Button title="Enviar" onPress={handleSubmit(handleLoginUser)} />
        </ContainerLogin>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            onPress={handleSignInWithGoogle}
            title="Entrar com Google"
            svg={GoogleSvg}
          />
          <SignInSocialButton
            onPress={handleLoginUser}
            title="Criar Conta"
            svg={User}
          />

          {Platform.OS === "ios" && (
            <SignInSocialButton
              onPress={handleSignInWithApple}
              title="Entrar com Apple"
              svg={AppleSvg}
            />
          )}
        </FooterWrapper>

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
