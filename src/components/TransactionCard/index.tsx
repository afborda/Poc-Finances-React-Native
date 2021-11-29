import React from "react";
import { View } from "react-native";

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icons,
  CategoryName,
  Date,
} from "./styles";

interface CategoryProps {
  name: string;
  icon: string;
}

export interface TransactionCardProps {
  type: "positive" | "negative";
  title: string;
  amount: string;
  category: CategoryProps;
  date: string;
}

export interface Props {
  data: TransactionCardProps;
}

export const TransactionCard = ({ data }: Props) => {
  return (
    <Container>
      <Title>{data?.title}</Title>
      <Amount type={data.type}>
        {data.type === "negative" && "- "}
        {data?.amount}
      </Amount>
      <Footer>
        <Category>
          <Icons name={data.category.icon} />
          <CategoryName>{data?.category?.name}</CategoryName>
        </Category>
        <Date>{data?.date}</Date>
      </Footer>
    </Container>
  );
};
