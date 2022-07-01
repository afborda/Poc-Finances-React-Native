import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import theme from "../../global/styles/theme";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const Main = styled.SafeAreaView`
  height: 100%;
`;

export const Header = styled.View`
  width: 100%;
  height: 35%;
  background-color: ${({ theme }) => theme.colors.secondary};
  justify-content: center;
  align-items: center;
`;

export const ContainerLogin = styled.ScrollView`
  margin-top: ${RFPercentage(3)}px;
  padding: 0 30px;
  width: 100%;
`;

export const TitleRegister = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(24)}px;
  margin-bottom: 20px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;
