import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import Form from "./Form";
import Result from "./Result";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function Calculator(props: {
  frm: any;
  setFrm: (frm: any) => void;
  referralFees: any[];
  closingFees: any[];
  shippingFees: any[];
  records: any[];
  setRecords: any;
}) {
  const [totalFees, setTotalFees] = useState(0);
  const {
    frm,
    setFrm,
    referralFees,
    closingFees,
    shippingFees,
    records,
    setRecords,
  } = props;
  const { isSignedIn, user } = useUser();
  return (
    <Card className="w-auto h-full">
      <CardHeader>
        <CardTitle>Amazon Seller Margin Calculator</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Form
          referralFees={referralFees}
          closingFees={closingFees}
          frm={frm}
          setFrm={setFrm}
        />
        <Result
          referralFees={referralFees}
          closingFees={closingFees}
          shippingFees={shippingFees}
          frm={frm}
          totalFees={totalFees}
          setTotalFees={setTotalFees}
        />
        <div className="flex flex-row justify-end itmes-center gap-4">
          <ResetConfirm setFrm={setFrm} />
          ]
          <AddRecordBox
            frm={frm}
            records={records}
            setRecords={setRecords}
            totalFees={totalFees}
            user={user}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function ResetConfirm(props: { setFrm: (frm: any) => void }) {
  const { setFrm } = props;
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="outline">Reset</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              setFrm({
                categoryId: "",
                price: 0,
                shippingType: "",
                shippingFeesObj: "",
                weight: 200,
                shippingRegion: "",
                weightType: "",
              });
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
function AddRecordBox(props: {
  frm: any;
  user: any;
  records: any;
  setRecords: (records: any[]) => void;
  totalFees: number;
}) {
  const { frm, user, records, setRecords, totalFees } = props;
  const { isSignedIn } = useUser();
  const [name, setName] = useState("");
  const [listed, setListed] = useState("No");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={!isSignedIn || frm.shippingType === ""}>
          Add Record
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Record</DialogTitle>
          <DialogDescription>
            Please add calulated product name. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Product Name
            </Label>
            <Input
              id="name"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
            <Label htmlFor="" className="text-right">
              Product listed on amazon ?
            </Label>
            <RadioGroup
              defaultValue="No"
              value={listed}
              onValueChange={(value) => setListed(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Yes" id="r1" />
                <Label htmlFor="r1">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No" id="r2" />
                <Label htmlFor="r2">No</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={name == ""}
            type="submit"
            onClick={() => {
              addRecord({
                productName: name,
                price: frm.price,
                shippingType: frm.shippingType,
                profit: (frm.price - 1.18 * totalFees).toFixed(2),
                status: listed == "Yes" ? "Listed" : "Unlisted",
                createdBy: user.id,
              }).then((data) => {
                console.log(data);
                setRecords([...records, data]);
              });
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

async function addRecord(record: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}records`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(record),
  });
  const data = await res.json();
  return data;
}
