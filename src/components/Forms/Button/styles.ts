import styled from "styled-components/native";
import { TouchableOpacityProps, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(TouchableOpacity)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(14)}px;
  border-radius: 10px;
  align-items: center;
  min-height: 40px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.shape};
  padding: 18px;
`;
