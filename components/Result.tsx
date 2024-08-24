"use client";
import { useState, useEffect } from "react";
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption,} from "@/components/ui/table"

export default function Result(props: {
    referralFees: any[],
    closingFees: any[],
    shippingFees: any[],
    frm: any
}){

    const {referralFees, closingFees, shippingFees, frm} = props;
    const [referralFee, setReferralFee] = useState(0);
    const [closingFee, setClosingFee] = useState(0);
    const [shippingFee, setShippingFee] = useState(0);


    useEffect(() => {
        /*************#######################################****************/
        // calculate referal fees
        const cat = referralFees.find((cat) => cat._id === frm.categoryId);
        // console.log(cat);
        if (frm.price > 999) {
            if (cat) {
                setReferralFee(
                cat.PriceRanges[cat.PriceRanges.length - 1].ReferralFeePercentage
                );
            }
        } else if (cat) {
            const price = cat.PriceRanges.find((range: any) => range.Range >= frm.price);
            if (price) {
                setReferralFee(price.ReferralFeePercentage);
            }
        }


        /*************#######################################****************/
        // calculate closing fees
        const sType = closingFees.find((type) => type._id === frm.shippingType);
        if (frm.price > 999) {
        if (sType) {
            setClosingFee(sType.PriceRange[sType.PriceRange.length - 1].fixedClosingFee);
        }
        } else if (sType) {
        const price = sType.PriceRange.find((range: any) => range.range >= frm.price);
        if (price) {
            setClosingFee(price.fixedClosingFee);
        }
        }

    /*************#######################################****************/
    // calculate shipping fees

    if (frm.weight && frm.shippingRegion && shippingFees[0]) {
       if (frm.weight < 12000) {
        const region = shippingFees[0].regions.find((fee: any) => fee.name === frm.shippingRegion);
         if (frm.weight < 501) {
           setShippingFee(region.rates.upto500gms);
         } else if (frm.weight < 1001 && frm.weight > 500) {
           setShippingFee(
             region.rates.upto500gms + region.rates.eachAdditional500gmsUpto1kg
           );
         } else if (frm.weight < 5001 && frm.weight > 5000) {
           const mul = Math.floor(frm.weight / 1000);
           setShippingFee(
             region.rates.upto500gms +
               region.rates.eachAdditional500gmsUpto1kg +
               mul * region.rates.eachAdditionalKgAfter1kg
           );
         } else {
           const mul = Math.floor(frm.weight / 1000);
           const x = frm.weight - 5000;
           const mul1 = Math.floor(x / 1000);
           setShippingFee(
             region.rates.upto500gms +
               region.rates.eachAdditional500gmsUpto1kg +
               mul * region.rates.eachAdditionalKgAfter1kg +
               mul1 * region.rates.eachAdditionalKgAfter5kg
           );
         }
       } else {
        const region = frm.shippingFeeObj = shippingFees[1].regions((fee: any) => fee.name === frm.shippingRegion);
         const mul = Math.floor((frm.weight - 12000) / 1000);
         setShippingFee(
           region.rates.eachAdditionalKgAfter12kgs * mul +
             region.rates.first12kgs
         );
       }
     }
    }, [frm, referralFees, closingFees, shippingFees]);
    

     


    return (
        <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Fee Type</TableHead>
                <TableHead>Fee Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>Referral Fees</TableCell>
                <TableCell>₹{referralFee}</TableCell> 
                </TableRow>
                <TableRow>
                <TableCell>Closing Fees</TableCell>
                <TableCell>₹{closingFee}</TableCell> 
                </TableRow>
                <TableRow>
                <TableCell>Shipping Fees</TableCell>
                <TableCell>₹{shippingFee}</TableCell> 
                </TableRow>
                <TableRow>
                <TableCell>Referral+Closing+Shipping Fees</TableCell>
                <TableCell>₹{referralFee + closingFee + shippingFee}</TableCell> 
                </TableRow>
                <TableRow>
                <TableCell>GST on Total Fees</TableCell>
                <TableCell>₹{(0.18 * (referralFee + closingFee + shippingFee)).toFixed(2)}</TableCell> 
                </TableRow>
                <TableRow>
                <TableCell>Total Amazon Charges</TableCell>
                <TableCell>₹{(1.18 * (referralFee + closingFee + shippingFee)).toFixed(2)}</TableCell> 
                </TableRow>
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell>You Make</TableCell>
                    <TableCell>{(frm.price - (1.18 * (referralFee + closingFee + shippingFee))).toFixed(2)}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}