"use client";
import { useState, useEffect } from "react";
import Result from "@/components/Result";
import Loader from "@/components/Loader";
import Chart from "@/components/Chart";

import Calculator from "@/components/Calculator";
import Records from "@/components/Records";
import DataTableDemo from "@/components/TempRecords";

export default function Home() {
  const [referralFees, setReferralFees] = useState([]);
  const [shippingFees, setShippingFees] = useState([]);
  const [closingFees, setClosingFees] = useState([]);

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
  let isReady: boolean =
    referralFees.length > 0 &&
    closingFees.length > 0 &&
    shippingFees.length > 0;
  return !isReady ? (
    <div className="flex justify-center items-center h-screen w-screen">
      <Loader />
    </div>
  ) : (
    <main className="flex flex-col min-h-screen p-10 gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 w-full">
          <Calculator
            frm={frm}
            setFrm={setFrm}
            referralFees={referralFees}
            closingFees={closingFees}
            shippingFees={shippingFees}
          />
          <Chart
            referralFees={referralFees}
            closingFees={closingFees}
            shippingFees={shippingFees}
            frm={frm}
          />
        </div>
        <Records />
        {/* <DataTableDemo /> */}
      </div>
    </main>
  );
}
