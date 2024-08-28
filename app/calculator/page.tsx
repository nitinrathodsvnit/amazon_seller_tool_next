"use client";
import { useState, useEffect } from "react";
import Result from "@/components/Result";
import Loader from "@/components/Loader";
import Chart from "@/components/Chart";

import Calculator from "@/components/Calculator";
import Records from "@/components/Records";
import Navbar from "@/components/Navbar";
import { useUser } from "@clerk/nextjs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";

export default function Home() {
  const { user, isSignedIn } = useUser();
  const [referralFees, setReferralFees] = useState([]);
  const [shippingFees, setShippingFees] = useState([]);
  const [closingFees, setClosingFees] = useState([]);
  const [records, setRecords] = useState([]);

  const [frm, setFrm] = useState({
    categoryId: "",
    price: 0,
    shippingType: "",
    shippingFeesObj: "",
    weight: 200,
    shippingRegion: "",
    weightType: "",
  });

  useEffect(() => {
    const getQuery = async (query: string) => {
      const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + query);
      const data = await res.json();
      return data;
    };
    getQuery("referralfees").then((data) => setReferralFees(data));
    getQuery("closingfees").then((data) => setClosingFees(data));
    getQuery("shippingfees").then((data) => setShippingFees(data));
  }, []);

  useEffect(() => {
    if (user) {
      const getRecords = async (query: string) => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}records?userid=${user.id}`
        );
        const data = await res.json();
        return data;
      };
      getRecords("records").then((data) => setRecords(data));
    }
  }, [user]);

  useEffect(() => {
  }, [records]);

  let isReady: boolean =
    referralFees.length > 0 &&
    closingFees.length > 0 &&
    shippingFees.length > 0;
  return !isReady ? (
    <div className="flex justify-center items-center h-screen w-screen">
      <Loader />
    </div>
  ) : (
    <main className="flex flex-col min-h-screen gap-4 px-4 pt-24">
      <Navbar />
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 w-full">
          <Calculator
            frm={frm}
            setFrm={setFrm}
            referralFees={referralFees}
            closingFees={closingFees}
            shippingFees={shippingFees}
            records={records}
            setRecords={setRecords}
          />
          <Chart
            referralFees={referralFees}
            closingFees={closingFees}
            shippingFees={shippingFees}
            frm={frm}
          />
        </div>
        {isSignedIn ? (
          <Records records={records} setRecords={setRecords} />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Records</CardTitle>
              </CardHeader>
            <CardDescription >
              <h1 className="text-4xl font-extrabold lg:text-5xl text-center">
                Sign In to see your records
              </h1>
            </CardDescription>
          </Card>
        )}
      </div>
    </main>
  );
}
