import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

import HighlightCard from "../../components/HighlightCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserContainer,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LoadContainer,
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface highlighProps {
  amount: string;
  lastTransaction: string;
}
interface highlighData {
  entries: highlighProps;
  expensives: highlighProps;
  total: highlighProps;
}

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlighData, setHighlighData] = useState<highlighData>(
    {} as highlighData
  );

  const theme = useTheme();

  function getLastTransactionDate(
    collection: DataListProps[],
    type: "positive" | "negative"
  ) {
    console.log(collection);

    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collection
          .filter((transaction) => transaction.type === type)
          .map((transaction) => new Date(transaction.date).getTime())
      )
    );
    console.log("lastTransaction", lastTransaction);

    // return Intl.DateTimeFormat("pt-BR", {
    //   day: "2-digit",
    //   month: "2-digit",
    //   year: "2-digit",
    // }).format(new Date(lastTransaction));

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      "pt-BR",
      { month: "long" }
    )}`;
  }

  async function loadTransactions() {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];
    let entriesTotal = 0;
    let expensiveTotal = 0;
    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === "positive") {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }
        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        const dateFormatted = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));
        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date: dateFormatted,
        };
      }
    );

    setTransactions(transactionsFormatted);

    //Nao da erro
    const lastTransactionsEntries = getLastTransactionDate(
      transactions,
      "positive"
    );

    const lastTransactionsExpensives = getLastTransactionDate(
      transactions,
      "negative"
    );

    const totalInterval = `01 a ${lastTransactionsExpensives}`;

    console.log("lastTransactionsEntries", lastTransactionsExpensives);
    // console.log("lastTransactionsExpensives", lastTransactionsExpensives);

    const total = entriesTotal - expensiveTotal;

    setHighlighData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Ultima entrada dia ${lastTransactionsEntries}`,
      },
      expensives: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Ultima saida dia ${lastTransactionsExpensives}`,
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `${totalInterval}`,
      },
    });
    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();

    // const dataKey = "@gofinances:transactions";
    // AsyncStorage.removeItem(dataKey);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserContainer>
              <UserInfo>
                <Photo
                  source={{
                    uri: "https://avatars.githubusercontent.com/u/14080449?v=4",
                  }}
                />
                <User>
                  <UserGreeting>Olá, </UserGreeting>
                  <UserName>Abner Fonseca</UserName>
                </User>
              </UserInfo>
              <Icon name="power" />
            </UserContainer>
          </Header>

          <HighlightCards>
            <HighlightCard
              type="up"
              title="Entradas"
              amount={highlighData?.entries?.amount}
              lastTransaction={highlighData?.entries?.lastTransaction}
            />
            <HighlightCard
              type="down"
              title="Saídas"
              amount={highlighData?.expensives?.amount}
              lastTransaction={highlighData?.expensives?.lastTransaction}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlighData?.total?.amount}
              lastTransaction={highlighData?.total?.lastTransaction}
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>
            <TransactionsList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
