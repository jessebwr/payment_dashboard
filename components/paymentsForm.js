import { memo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  useCreatePayment,
  useUsers,
} from "../src/service/paymentsService.hooks";

const generateUniqueId = () => {
  return Math.floor(Math.random() * 100000000000000000);
};

const useHandleNewPaymentSubmit = (handleSubmit) => {
  const { mutate: createPayment } = useCreatePayment();
  const { data: users } = useUsers();
  const paymentSubmit = useCallback(
    ({
      date,
      sender: senderStrId,
      receiver: receiverStrId,
      amount,
      currency,
      memo,
    }) => {
      const sender = users?.data.find(
        (user) => user.id === parseInt(senderStrId)
      );
      const receiver = users?.data.find(
        (user) => user.id === parseInt(receiverStrId)
      );

      const id = `${generateUniqueId()}`;

      createPayment(
        {
          id,
          date,
          sender,
          receiver,
          amount,
          currency,
          memo,
        },
        {
          onSuccess: (res) => {
            toast.success(
              `Successfully added a new payment ${id} from ${sender.name} to ${receiver.name} for ${amount} ${currency}.`
            );
          },
          onError: (e) => {
            toast.error(
              `Failed to make a new payment ${id} from ${sender.name} to ${receiver.name} for ${amount} ${currency}. Reason: ${e}.`
            );
          },
        }
      );
    },
    [createPayment, users]
  );

  return handleSubmit(paymentSubmit);
};

const UserSelect = ({ name, register }) => {
  const { data: users } = useUsers();
  const userList = users?.data || [];

  if (!users) {
    return null;
  }

  return (
    <select
      defaultValue={userList[0].id}
      className="border rounded-sm"
      {...register(name)}
    >
      {userList.map(({ id, name }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
  );
};

const PaymentsForm = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = useHandleNewPaymentSubmit(handleSubmit);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form className="flex flex-col w-full" onSubmit={onSubmit}>
      <label className="pb-3">
        <div className="font-bold">Date:</div>
        <input
          className="border rounded-sm"
          type="datetime-local"
          {...register("date")}
        />
      </label>
      <label>
        <span className="font-bold pr-1">Sender:</span>
        <UserSelect name="sender" register={register} />
      </label>
      <label className="pb-3">
        <span className="font-bold pr-1">Receiver:</span>
        <UserSelect name="receiver" register={register} />
      </label>
      <label>
        <span className="font-bold pr-1">Amount:</span>
        <input
          className="border rounded-sm"
          type="number"
          min="0"
          defaultValue="0"
          {...register("amount")}
        />
      </label>
      <label className="pb-3">
        <span className="font-bold pr-1">Currency:</span>
        <select className="border rounded-sm" {...register("currency")}>
          {["BTC", "GBP", "EUR", "JPY", "USD"].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <label className="w-full">
        <div className="font-bold">Notes:</div>
        <textarea className="border rounded-sm w-full" {...register("memo")} />
      </label>
      <button
        className="bg-blue-300 px-4 py-2 rounded w-40 border shadow-sm active:bg-blue-500 hover:bg-blue-400"
        type="submit"
      >
        Add Payment
      </button>
    </form>
  );
};

export default memo(PaymentsForm);
