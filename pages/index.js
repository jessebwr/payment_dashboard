/* eslint-disable react/jsx-key */
import PaymentsForm from "../components/paymentsForm";
import PaymentsTable from "../components/PaymentsTable";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-row px-4 pt-2 gap-2 flex-wrap">
      <div>
        <div className="text-xl pb-2 font-bold">
          List of current payments in the system:
        </div>
        <PaymentsTable />
      </div>
      <div className="flex-grow">
        <div className="text-xl pb-2 font-bold">Add a new payment:</div>
        <div>
          <PaymentsForm />
        </div>
      </div>
    </div>
  );
}
