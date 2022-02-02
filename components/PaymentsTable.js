/* eslint-disable react/jsx-key */
import { useMemo, useState } from "react";
import { useTable, useGlobalFilter, useAsyncDebounce } from "react-table";
import { usePayments } from "../src/service/paymentsService.hooks";

/*
 {
    "data": {
        "id": "stringified long number",
        "date": "stringified ISO-8601 timestamp",
        "sender": {
            "id": "number",
            "name": "string"
        },
        "receiver": {
            "id": "number",
            "name": "string"
        },
        "amount": "stringified decimal number",
        "currency": "stringified ISO-4217 currency code",
        "memo": "string"
    }
}
 */

const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  setGlobalFilterSearch,
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
    setGlobalFilterSearch(value || undefined);
  }, 200);

  return (
    <span className="w-full flex flex-row">
      Search:
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        className="border-0 flex-grow pl-2"
      />
    </span>
  );
};

const PaymentsTable = () => {
  const [globalFilterSearch, setGlobalFilterSearch] = useState(undefined);
  const { data: payments, isLoading } = usePayments();

  const data = useMemo(() => {
    if (!payments) {
      return [];
    }

    return payments.map(
      ({ id, date, sender, receiver, amount, currency, memo }) => ({
        id,
        date,
        sender: sender.name,
        receiver: receiver.name,
        amount: `${currency} ${amount}`,
        memo,
      })
    );
  }, [payments]);

  const columns = useMemo(
    () => [
      {
        Header: "Payment Id",
        accessor: "id",
      },
      {
        Header: "Payment Date",
        accessor: "date",
      },
      {
        Header: "Sender",
        accessor: "sender",
      },
      {
        Header: "Receiver",
        accessor: "receiver",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Payment Notes",
        accessor: "memo",
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      data,
      columns,
      initialState: {
        globalFilter: globalFilterSearch,
      },
    },
    useGlobalFilter
  );

  if (payments) {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      visibleColumns,
      setGlobalFilter,
      preGlobalFilteredRows,
      state,
    } = tableInstance;

    return (
      // apply the table props
      <table className="shadow-lg bg-white rounded" {...getTableProps()}>
        <thead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <th
                      className="bg-blue-100 border text-center px-10 py-4"
                      {...column.getHeaderProps()}
                    >
                      {
                        // Render the header
                        column.render("Header")
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: "left",
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
                setGlobalFilterSearch={setGlobalFilterSearch}
              />
            </th>
          </tr>
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr className="border px-20 py-4" {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td className="text-center" {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
  return <div>moo</div>;
};

export default PaymentsTable;
