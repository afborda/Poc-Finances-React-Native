import React, { useState } from "react";
import { View, TouchableOpacityProps } from "react-native";

import { Container, Icon, Title } from "./styles";

interface Props extends TouchableOpacityProps {
  title: string;
  type: "up" | "down";
  isActive: boolean;
}

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

const TransactionTypeButton = ({ title, type, isActive, ...rest }: Props) => {
  return (
    <Container isActive={isActive} type={type} {...rest}>
      <Icon name={icons[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  );
};

export default TransactionTypeButton;
