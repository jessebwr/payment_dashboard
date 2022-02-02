import axios from "axios";

const PaymentsService = {
  getPayments: async () => {
    // Minor hack to make this "payments" endpoint always return a list of (max) the past 25 payments
    const payments = globalThis.payments || [];
    const payment = await axios.get("/api/payments").then((res) => res.data);
    const newPayments = [payment.data, ...payments].slice(0, 25);

    globalThis.payments = newPayments;
    return newPayments;
  },
  getUsers: () => axios.get("/api/users").then((res) => res.data),
  makePayment: (id, date, sender, receiver, amount, currency, memo) =>
    axios
      .post("/api/payments", {
        id,
        date,
        sender,
        receiver,
        amount,
        currency,
        memo,
      })
      .then((res) => res.data)
      .catch((res) => {
        // If it's giving us an unavailable, loop until it is
        if (res.response.status === 503) {
          return PaymentsService.makePayment(
            id,
            date,
            sender,
            receiver,
            amount,
            currency,
            memo
          );
        }
        throw res?.response.data.error;
      }),
};

export default PaymentsService;
