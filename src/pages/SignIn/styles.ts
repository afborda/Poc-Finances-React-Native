import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    justifyContent: "center",
    backgroundColor: "#5636D3",
    flex: 1,
  },
}))``;

export const Header = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  flex: 7;
`;
export const TitleWrapper = styled.View`
  width: 100%;
  height: 45%;
  justify-content: center;
  align-items: center;
`;
export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(24)}px;
  text-align: center;
  margin-top: 25px;
`;
export const SignInTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(16)}px;
  text-align: center;
`;
export const Footer = styled.View`
  width: 100%;
  flex: 3;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const FooterWrapper = styled.View`
  margin-top: ${RFPercentage(2)}px;
  padding: 0 32px;
  flex-direction: row;
  justify-content: space-around;
`;

export const ContainerLogin = styled.View`
  margin-top: ${RFPercentage(3)}px;
  padding: 0 30px;
  width: 100%;
`;

export const ContainerActions = styled.View`
  margin: 0 30px;
`;
