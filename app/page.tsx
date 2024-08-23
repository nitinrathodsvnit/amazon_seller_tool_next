"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dropdown } from "@/components/Dropdown";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption,} from "@/components/ui/table"
import { validateHeaderName } from "http";
import Form from "@/components/Form";
import Result from "@/components/Result";



export default function Home() {
  const [referralFees, setReferralFees] = useState([]);
  const [shippingFees, setShippingFees] = useState([]);
  const [closingFees, setClosingFees] = useState([]);
  
  const [frm, setFrm] = useState({
    categoryId: "",
    price: 999,
    shippingType: "",
    shippingFeesObj: "",
    weight: 200,
    shippingRegion: "",
    weightType: "",
  });

  useEffect(()=>{
    const getQuery = async (query:string)=>{
      const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL+query);
      const data = await res.json();
      return data;
    }
    getQuery("referralfees").then((data)=> setReferralFees(data));
    getQuery("closingfees").then((data)=> setClosingFees(data));
    getQuery("shippingfees").then((data)=> setShippingFees(data));
  },[])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card className="w-auto">
        <CardHeader>
          <CardTitle>Amazon Seller Margin Calculator</CardTitle>
        </CardHeader>
        <CardContent>
        <Form referralFees={referralFees} closingFees={closingFees}  frm={frm} setFrm={setFrm} />
        <Result referralFees={referralFees} closingFees={closingFees} shippingFees={shippingFees} frm={frm}/>
        </CardContent>
      </Card>
    </main>
  );
}
