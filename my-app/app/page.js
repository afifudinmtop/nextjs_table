"use client";

import React, { useState } from "react";
import Tabel from "./tabel";

const Page = () => {
  const [data, setData] = useState([
    { col1: "Hello", col2: "World", col3: "10" },
    { col1: "react-table", col2: "rocks", col3: "9" },
    { col1: "whatever", col2: "you want", col3: "30" },
  ]);

  // Menggunakan useState untuk kolom
  const [columns, setColumns] = useState([
    { Header: "Kolom 1", accessor: "col1" },
    { Header: "Kolom 2", accessor: "col2" },
    { Header: "Kolom 3", accessor: "col3" },
  ]);

  // Fungsi untuk menambah baris baru
  const addRow = () => {
    const newRow = { col1: "New Row", col2: "New Data", col3: "6" };
    setData([...data, newRow]);
  };

  return (
    <Tabel addRow={addRow} data={data} columns={columns} id="uniqueTableId" />
  );
};

export default Page;
