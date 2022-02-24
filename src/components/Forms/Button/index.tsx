import React from "react";
import { TouchableOpacityProps, ActivityIndicator } from "react-native";

import { Container, Title } from "./styles";

interface Props extends TouchableOpacityProps {
  title: string;
  loading: boolean;
}

const Button = ({ title, loading, disabled, ...rest }: Props) => {
  return (
    <Container disabled={disabled} {...rest}>
      {loading ? <ActivityIndicator size="small" /> : <Title>{title}</Title>}
    </Container>
  );
};

export default Button;
