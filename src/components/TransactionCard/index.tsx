import React from "react";
import { View } from "react-native";
import { categories } from "../../Utils/categories";
import { EditDate } from "../Utils/DateUtils/Index";
import { MoneyFormat } from "../Utils/MoneyUtils";

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
  const [category] = categories.filter(
    (item) => item.key === data.item.category
  );

  return (
    <Container>
      <Title>{data?.item.name}</Title>
      <Amount type={data.item.type}>
        {data.item.type === "negative" && "- "}
        {MoneyFormat(data?.item.amount)}
      </Amount>
      <Footer>
        <Category>
          <Icons name={category.icon} />
          <CategoryName> {category.name}</CategoryName>
        </Category>
        <Date>{EditDate(data?.item.date)}</Date>
      </Footer>
    </Container>
  );
};
