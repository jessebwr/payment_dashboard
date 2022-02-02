import { useMutation, useQuery, useQueryClient } from "react-query";
import PaymentsService from "./paymentsService";

export const usePayments = () => {
  return useQuery("payments", () => PaymentsService.getPayments(), {
    refetchInterval: 2 * 1000,
  });
};

export const useUsers = () => {
  return useQuery("users", () => PaymentsService.getUsers(), {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};

export const useCreatePayment = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (args) => {
      const { id, date, sender, receiver, amount, currency, memo } = args;
      return PaymentsService.makePayment(
        id,
        date,
        sender,
        receiver,
        amount,
        currency,
        memo
      );
    },
    {
      onSuccess: (res, newPayment) => {
        const payments = globalThis.payments || [];
        const newPayments = [newPayment, ...payments].slice(0, 25);
        globalThis.payments = newPayments;
        queryClient.setQueryData("payments", newPayments);
      },
    }
  );
};
