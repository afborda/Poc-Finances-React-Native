interface DateTypes {
  date?: {
    _seconds: number;
    _nanoseconds: number;
  };
}

export const EditDate = (date: DateTypes) => {
  const dateFormatted = Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(new Date(date.toDate()));

  return dateFormatted;
};

export function getLastTransactionDate(
  collection: any[],
  type: "positive" | "negative"
) {
  const collectionFiltered = collection.filter(
    (transaction) => transaction.type === type
  );

  if (collectionFiltered.length === 0) return 0;

  const lastTransaction = new Date(
    Math.max.apply(
      Math,
      collectionFiltered.map((transaction) => transaction.date.toDate())
    )
  );
  return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
    "pt-BR",
    { month: "long" }
  )}`;
}
