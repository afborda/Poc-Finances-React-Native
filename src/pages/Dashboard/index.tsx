import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

import HighlightCard from "../../components/HighlightCard";
import firestore from "@react-native-firebase/firestore";

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
  LogoutButton,
} from "./styles";
import { useAuth } from "../../hooks/auth";
import { getLastTransactionDate } from "../../components/Utils/DateUtils/Index";
import { getListTransactions } from "../../service/Firebase";

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
  const [isLoading, setIsLoading] = useState(false);
  const [transactionsData, setTransactionsData] = useState<any>([]);
  const [highlighData, setHighlighData] = useState<highlighData>(
    {} as highlighData
  );

  const theme = useTheme();

  const { signOut, user, userFirebase } = useAuth();

  async function loadTransactions() {
    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: any[] = transactionsData?.map((item: any) => {
      if (item.type === "positive") {
        entriesTotal += Number(item.amount);
      } else {
        expensiveTotal += Number(item.amount);
      }
      const amount = Number(item.amount).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
      };
    });

    console.log(transactionsFormatted);

    const lastTransactionsEntries = getLastTransactionDate(
      transactionsData,
      "positive"
    );

    const lastTransactionsExpensives = getLastTransactionDate(
      transactionsData,
      "negative"
    );

    const totalInterval =
      lastTransactionsExpensives === 0
        ? `Não ha transações`
        : `01 a ${lastTransactionsExpensives}`;

    const total = entriesTotal - expensiveTotal;

    setHighlighData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          lastTransactionsEntries === 0
            ? `Não ha transações`
            : `Ultima entrada dia ${lastTransactionsEntries}`,
      },
      expensives: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          lastTransactionsExpensives === 0
            ? `Não ha transações`
            : `Ultima saida dia ${lastTransactionsExpensives}`,
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `${totalInterval}`,
      },
    });
  }

  const handleGetValue = () => {
    setIsLoading(true);

    firestore()
      .collection("transaction")
      .where("idUser", "==", userFirebase?.uid || user.id)
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot?.docs?.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        const sortedActivities = data.sort(
          (a: any, b: any) =>
            new Date(b.date.toDate()) - new Date(a.date.toDate())
        );
        console.log("sortedActivities>>>>", sortedActivities);

        setTransactionsData(sortedActivities);
        loadTransactions();
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handleGetValue();
    loadTransactions();
  }, []);

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
                    uri:
                      user.picture ||
                      user.photo ||
                      "https://cdn-icons-png.flaticon.com/512/6966/6966268.png",
                  }}
                />
                <User>
                  <UserGreeting>Olá, </UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={signOut}>
                <Icon name="log-out" />
              </LogoutButton>
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
              data={transactionsData}
              keyExtractor={(item) => item.id}
              renderItem={(item) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
