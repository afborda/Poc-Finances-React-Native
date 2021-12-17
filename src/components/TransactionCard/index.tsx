import React from "react";
import { View } from "react-native";
import { categories } from "../../Utils/categories";

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

export interface TransactionCardProps {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

export interface Props {
  data: TransactionCardProps;
}

export const TransactionCard = ({ data }: Props) => {
  const [category] = categories.filter((item) => item.key === data.category);

  console.log("data card>>> ", data);

  return (
    <Container>
      <Title>{data?.name}</Title>
      <Amount type={data.type}>
        {data.type === "negative" && "- "}
        {data?.amount}
      </Amount>
      <Footer>
        <Category>
          <Icons name={category.icon} />
          <CategoryName> {category?.name}</CategoryName>
        </Category>
        <Date>{data?.date}</Date>
      </Footer>
    </Container>
  );
};
