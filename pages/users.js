/* eslint-disable react/jsx-key */
import { useMemo } from "react";
import { useTable } from "react-table";
import { useUsers } from "../src/service/paymentsService.hooks";

export default function Home() {
  const { data: users, isLoading } = useUsers();
  const data = useMemo(() => {
    if (!users) {
      return [];
    }
    return users.data.map(({ id, name }) => ({ id, name }));
  }, [users]);

  const columns = useMemo(
    () => [
      {
        Header: "User Id",
        accessor: "id",
      },
      {
        Header: "User Name",
        accessor: "name",
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  let body = null;

  if (!isLoading) {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      tableInstance;

    body = (
      // apply the table props
      <table className="shadow-lg bg-white w-2/3" {...getTableProps()}>
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
                      className="bg-blue-100 border text-center px-8 py-4 w-2/5"
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
                <tr className="border px-8 py-4" {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td
                          className="text-center w-2/5"
                          {...cell.getCellProps()}
                        >
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
  } else {
    body = "Loading users please wait...";
  }

  return (
    <div className="w-full px-4 pt-2">
      <div className="text-lg pb-2">
        These are the current users in the payment system, you can view the name
        of each user and their id here. These are the only users you are allowed
        to use when creating a new payment.
      </div>
      {body}
    </div>
  );
}
