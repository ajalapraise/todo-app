"use client";
import React from "react";
import Head from "next/head";
import { Layout } from "@/components/Layout/layout";
import { Calendar } from "@/components/calender/Calendar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Todo-App</title>
        <meta name="description" content="Todo-app" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout>
        <Calendar />
      </Layout>
    </>
  );
}
