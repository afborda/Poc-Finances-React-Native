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
