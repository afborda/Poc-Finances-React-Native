import React from "react";
import { Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AppleSvg from "../../assets//apple.svg";
import GoogleSvg from "../../assets/google.svg";
import Logo from "../../assets/logo.svg";
import SignInSocialButton from "../../components/SignInSocialButton";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";

const SignIn = () => {
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <Logo width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Constrole suas {"\n"} finanças de forma {"\n"} muito simples
          </Title>
        </TitleWrapper>
        <SignInTitle>Faça seu login uma das contas abaixo</SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton title="Entrar com Google" svg={GoogleSvg} />
          <SignInSocialButton title="Entrar com Apple" svg={AppleSvg} />
        </FooterWrapper>
      </Footer>
    </Container>
  );
};

export default SignIn;
