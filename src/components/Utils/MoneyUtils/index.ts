interface MoneyProps {
  amount: number;
}

export const MoneyFormat = (amount: MoneyProps) => {
  const amoutFormat = Number(amount).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return amoutFormat;
};
