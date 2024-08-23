"use client";
import { Dropdown } from "@/components/Dropdown";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react";

const shippingRegionList = [
    {
      value: "Local",
      label: "Local",
    },
    {
      value: "Regional",
      label: "Regional",
    },
    {
      value: "National",
      label: "National",
    }
  ]

export default function Form(props:{
    referralFees: any[],
    closingFees: any[],
    setFrm: any,
    frm: any
}){
    const {referralFees, closingFees, setFrm, frm} = props;
    const [categoryId, setCategoryId] = useState("");
    // const [price, setPrice] = useState(999);
    const [shippingType, setShippingType] = useState("");
    const [shippingRegion, setShippingRegion] = useState("Local");

    useEffect(()=>{
        setFrm({
          ...frm,
          categoryId: categoryId,
          shippingType: shippingType,
          shippingRegion: shippingRegion
        })
      }, [categoryId, shippingType, shippingRegion])

    return (
        <>
        <Dropdown items={referralFees.map((item:any) => {
          return {
            label: item.name,
            value: item._id
          }
        })} setItem={setCategoryId} item={categoryId} />
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="price">Price</Label>
            <Input type="number" id="price" min={1} defaultValue={frm.price} 
              onChange={(e) => setFrm( {...frm, price: parseInt(e.target.value)})}  placeholder="Price" value={frm.price}  />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="shippingType">Shipping Type</Label>
            <Dropdown items={closingFees.map((item:any) =>{
              return {
                label: item.name,
                value: item._id
              }
            })} setItem={setShippingType} item={shippingType} />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="shippingRegion">Shipping Region</Label>
            <Dropdown items={shippingRegionList} setItem={setShippingRegion} item={shippingRegion} />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="weight">Weight (in grams)</Label>
            <Input type="number" min={1} defaultValue={frm.weight} onChange={(e) => setFrm( {...frm, weight: parseInt(e.target.value)})}/>
          </div>
        </>
    )
}