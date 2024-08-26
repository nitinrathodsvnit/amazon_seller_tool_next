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

    return (
        <div className="flex flex-col gap-4">
        <Dropdown items={referralFees.map((item:any) => {
          return {
            label: item.name,
            value: item._id
          }
        })} setItem={(categoryId:string) => setFrm( {...frm, categoryId: categoryId})} item={frm.categoryId} />
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="price">Price</Label>
            <Input type="number" id="price" min={1}
              onChange={(e) => setFrm( {...frm, price: parseInt(e.target.value)})}  placeholder="Price" value={frm.price} disabled={!frm.categoryId} />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="shippingType">Shipping Type</Label>
            <Dropdown items={closingFees.map((item:any) =>{
              return {
                label: item.name,
                value: item._id
              }
            })} setItem={(shippingType:string) => setFrm({...frm, shippingType: shippingType})} item={frm.shippingType} inputDisabled={!frm.price}/>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="shippingRegion">Shipping Region</Label>
            <Dropdown items={shippingRegionList} setItem={(region:string) => {
              setFrm({...frm, shippingRegion: region})
            }} item={frm.shippingRegion} inputDisabled={!frm.shippingType}/>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="weight">Weight (in grams)</Label>
            <Input type="number" min={1} value={frm.weight} onChange={(e) => setFrm( {...frm, weight: parseInt(e.target.value)})} disabled={!frm.shippingRegion}/>
          </div>
        </div>
    )
}