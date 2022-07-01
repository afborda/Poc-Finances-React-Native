import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";

import { Button, ImageContainer, Text } from "./styles";

interface Props extends RectButtonProps {
  title?: string;
  svg: React.FC<SvgProps>;
  size?: string;
}

const SignInSocialButton = ({
  title = "",
  svg: Svg,
  size = "small",
  ...rest
}: Props) => {
  return (
    <Button size={size} {...rest}>
      <ImageContainer>
        <Svg width={30} height={30} />
      </ImageContainer>
      <Text>{title}</Text>
    </Button>
  );
};

export default SignInSocialButton;
