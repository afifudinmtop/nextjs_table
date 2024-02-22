"use client";

import React, { useState } from "react";
import Tabel from "./tabel";

const Page = () => {
  const [data, setData] = useState([
    {
      name: "Michael Silva",
      position: "Marketing Designer",
      age: "66",
    },
    {
      name: "Paul Byrd",
      position: "Chief Financial Officer (CFO)",
      age: "64",
    },
    {
      name: "Gloria Little",
      position: "Systems Administrator",
      age: "59",
    },
    {
      name: "Bradley Greer",
      position: "Software Engineer",
      age: "41",
    },
    {
      name: "Dai Rios",
      position: "Personnel Lead",
      age: "35",
    },
    {
      name: "Jenette Caldwell",
      position: "Development Lead",
      age: "30",
    },
    {
      name: "Yuri Berry",
      position: "Chief Marketing Officer (CMO)",
      age: "40",
    },
    {
      name: "Caesar Vance",
      position: "Pre-Sales Support",
      age: "21",
    },
    {
      name: "Doris Wilder",
      position: "Sales Assistant",
      age: "23",
    },
    {
      name: "Angelica Ramos",
      position: "Chief Executive Officer (CEO)",
      age: "47",
    },
    {
      name: "Linda Wong",
      position: "Software Engineer",
      age: "29",
    },
    {
      name: "Raj Patel",
      position: "Data Analyst",
      age: "35",
    },
    {
      name: "Emily Johnson",
      position: "Human Resources Manager",
      age: "42",
    },
    {
      name: "Carlos Hernandez",
      position: "Sales Manager",
      age: "38",
    },
    {
      name: "Aisha Khan",
      position: "Product Manager",
      age: "31",
    },
    {
      name: "Alex Smith",
      position: "Graphic Designer",
      age: "27",
    },
    {
      name: "Natasha Romanoff",
      position: "Cybersecurity Specialist",
      age: "34",
    },
    {
      name: "Bruce Wayne",
      position: "Operations Director",
      age: "45",
    },
    {
      name: "Clark Kent",
      position: "Editor",
      age: "37",
    },
    {
      name: "Diana Prince",
      position: "Public Relations Manager",
      age: "32",
    },
    {
      name: "Oliver Jones",
      position: "IT Support Specialist",
      age: "30",
    },
    {
      name: "Sophia Lee",
      position: "Digital Marketing Specialist",
      age: "28",
    },
    {
      name: "Ethan Brown",
      position: "Business Analyst",
      age: "40",
    },
    {
      name: "Mia Wilson",
      position: "Customer Service Representative",
      age: "26",
    },
    {
      name: "Noah Garcia",
      position: "Web Developer",
      age: "33",
    },
    {
      name: "Isabella Martinez",
      position: "Content Writer",
      age: "29",
    },
    {
      name: "Liam Rodriguez",
      position: "SEO Specialist",
      age: "34",
    },
    {
      name: "Emma Hernandez",
      position: "Account Manager",
      age: "36",
    },
    {
      name: "Jacob Lopez",
      position: "Project Manager",
      age: "39",
    },
  ]);

  // Menggunakan useState untuk kolom
  const [columns, setColumns] = useState([
    { Header: "Nama", accessor: "name" },
    { Header: "Position", accessor: "position" },
    { Header: "Age", accessor: "age" },
  ]);

  return (
    <div className="w-screen h-screen overflow-auto bg-gray-100 pt-7">
      <Tabel data={data} columns={columns} id="uniqueTableId" />
    </div>
  );
};

export default Page;
