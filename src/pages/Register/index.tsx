import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";
import Button from "../../components/Forms/Button";
import CategorySelectButton from "../../components/Forms/CategorySelectButton";
import InputForm from "../../components/Forms/InputForm";

import TransactionTypeButton from "../../components/Forms/TransactionTypeButton";
import { categories } from "../../Utils/categories";
import CategorySelect from "../CategorySelect";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from "./styles";
import { useEffect } from "react";

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é Obrigatorio!"),
  amount: Yup.number()
    .typeError("Informe um valor númerico")
    .positive("Valor não pode ser negativo!")
    .required("Valor é Obrigatorio!"),
});

const Register = () => {
  const [transactionTypeClick, setTransactionTypeClick] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleTransactionsTypeSelect(type: "positive" | "negative") {
    setTransactionTypeClick(type);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  async function handleRegister(form: FormData) {
    if (!transactionTypeClick) {
      return Alert.alert("Selecione o tipo de transação");
    }

    if (category.key === "category") {
      return Alert.alert("Selecione a categoria");
    }
    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionTypeClick,
      category: category.key,
      date: new Date(),
    };

    try {
      const dataKey = "@gofinances:transactions";
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [...currentData, newTransaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionTypeClick("");
      setCategory({
        key: "category",
        name: "Categoria",
      });

      navigation.navigate("Listagem");
    } catch (error) {
      Alert.alert("Não foi possivel salvar =/");
    }
  }

  useEffect(() => {
    async function loadData() {
      const dataKey = "@gofinances:transactions";

      const data = await AsyncStorage.getItem(dataKey);
    }
    loadData();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title> Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              placeholder="Nome"
              name="name"
              control={control}
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              placeholder="Preço"
              name="amount"
              control={control}
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
            <TransactionTypes>
              <TransactionTypeButton
                type="up"
                title="Income"
                onPress={() => handleTransactionsTypeSelect("positive")}
                isActive={transactionTypeClick === "positive"}
              />
              <TransactionTypeButton
                type="down"
                title="Outcome"
                onPress={() => handleTransactionsTypeSelect("negative")}
                isActive={transactionTypeClick === "negative"}
              />
            </TransactionTypes>
            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>
          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>
        <Modal visible={categoryModalOpen} animationType="slide">
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Register;
