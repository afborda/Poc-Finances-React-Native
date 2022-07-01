import firestore from "@react-native-firebase/firestore";
import { useAuth } from "../hooks/auth";

export const getListTransactions = async (data) => {
  firestore()
    .collection("transaction")
    .where("idUser", "==", `${data?.uid || data?.id}`)
    .onSnapshot((querySnapshot) => {
      const data = querySnapshot?.docs?.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      console.log("data>>>", data);

      return data;
    });
};
