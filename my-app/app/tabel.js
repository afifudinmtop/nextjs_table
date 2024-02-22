import React, { useState } from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
} from "react-table";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const Tabel = ({ data, columns, id }) => {
  const [searchInput, setSearchInput] = useState("");

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // Fungsi untuk menghandle perubahan input pencarian
  const handleSearchChange = (e) => {
    const value = e.target.value || undefined;
    setGlobalFilter(value); // Gunakan setGlobalFilter untuk menerapkan pencarian
    setSearchInput(value);
  };

  // Excel Export
  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "tableData.xlsx");
  };

  // PDF Export
  const handleExportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, { html: `#${id}` });
    doc.save("tableData.pdf");
  };

  // Copy to Clipboard
  const handleCopy = () => {
    const el = document.createElement("textarea");
    el.value = page
      .map((row) => {
        return columns.map((col) => row.values[col.accessor]).join("\t");
      })
      .join("\n");
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  return (
    <div className="w-[90%] mx-auto p-5 rounded bg-white">
      <div className="mb-4 flex justify-between">
        {/* control */}
        <div>
          {/* Excel */}
          <button
            onClick={handleExportExcel}
            className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 ml-2 rounded"
          >
            <div className="flex">
              <img src="/excel.png" className="w-[25px] h-[25px]" />
              <span className="my-auto ms-3">Excel</span>
            </div>
          </button>

          {/* PDF */}
          <button
            onClick={handleExportPDF}
            className="bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 ml-2 rounded"
          >
            <div className="flex">
              <img src="/pdf.png" className="w-[25px] h-[25px]" />
              <span className="my-auto ms-3">PDF</span>
            </div>
          </button>

          {/* Copy */}
          <button
            onClick={handleCopy}
            className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 ml-2 rounded"
          >
            <div className="flex">
              <img src="/copy.png" className="w-[25px] h-[25px]" />
              <span className="my-auto ms-3">Copy</span>
            </div>
          </button>
        </div>

        {/* Search */}
        <div className="flex">
          <div className="my-auto me-2">Search:</div>
          <input
            value={searchInput}
            onChange={handleSearchChange}
            className="px-4 py-2 border border-black rounded my-auto"
          />
        </div>
      </div>

      <table {...getTableProps()} className="table-auto w-full" id={id}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())} // Step 3: Add sorting props to column headers
                  className="px-4 py-2 border"
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            const rowClass = index % 2 === 0 ? "bg-gray-100" : "";
            return (
              <tr {...row.getRowProps()} className={rowClass}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="border px-4 py-2">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-4 pagination flex justify-between">
        <div className="flex my-auto">
          <div className="relative w-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 bottom-0 w-5 h-5 my-auto text-gray-400 right-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            {/* show */}
            <select
              value={pageSize === data.length ? "all" : pageSize}
              onChange={(e) => {
                const value = e.target.value;
                setPageSize(value === "all" ? data.length : Number(value));
              }}
              className="w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"
            >
              {[5, 10, 20].map((pageSizeOption) => (
                <option key={pageSizeOption} value={pageSizeOption}>
                  {pageSizeOption}
                </option>
              ))}
              <option value="all">Show All</option>
            </select>
          </div>

          <div className="my-auto ms-2">entries per page</div>
        </div>

        <div>
          {/* << */}
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="p-2 rounded cursor-pointer hover:bg-gray-400 hover:text-white"
          >
            {"<<"}
          </button>

          {/* < */}
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="py-2 px-3 rounded cursor-pointer hover:bg-gray-400 hover:text-white"
          >
            {"<"}
          </button>

          {/* page of */}
          <span className="mx-4">
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>

          {/* > */}
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="py-2 px-3 rounded cursor-pointer hover:bg-gray-400 hover:text-white"
          >
            {">"}
          </button>

          {/* >> */}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="p-2 rounded cursor-pointer hover:bg-gray-400 hover:text-white"
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tabel;
