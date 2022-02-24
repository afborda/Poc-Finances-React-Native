import React, { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { Text, Alert } from "react-native";
import InputForm from "../../components/Forms/InputForm";
import { useForm } from "react-hook-form";
import auth from "@react-native-firebase/auth";
import * as Yup from "yup";

import {
  Container,
  Main,
  Header,
  ContainerLogin,
  TitleRegister,
} from "./styles";
import Button from "../../components/Forms/Button";

interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Informe um e-mail valido!")
    .required("Informe um e-mail!"),
  password: Yup.string().required("Informe sua senha!"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Senhas não são iguais."
  ),
});

const RegisterUser = () => {
  const [isLoading, setIsLoading] = useState(false);

  function handleRegisterUser(form: RegisterData) {
    setIsLoading(true);
    // navigation.navigate("registerUser");

    const validatePassword = auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(() => Alert.alert("Conta", "Cadastrado com sucesso!"))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));

    reset();
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  return (
    <Container>
      <Main>
        <Header>
          <Text>Abner Fonseca</Text>
        </Header>
        <ContainerLogin>
          <TitleRegister>{`Bem vindo!\n Mais um passo para seu\n controle financeiro`}</TitleRegister>
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
          <InputForm
            placeholder="Confirmar senha"
            name="confirmPassword"
            control={control}
            secureTextEntry
            error={errors.confirmPassword && errors.confirmPassword.message}
          />
          <Button
            loading={isLoading}
            title="Cadastrar"
            onPress={handleSubmit(handleRegisterUser)}
          />
        </ContainerLogin>
      </Main>
    </Container>
  );
};

export default RegisterUser;
