import React, { useState, useEffect, SyntheticEvent, BaseSyntheticEvent } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import WalletIcon from "@mui/icons-material/Wallet";
import { accountdetails } from "../../store/apiPaths";
import { getaccountdetails } from "../../store/apiPaths";

export const BusinessPayment = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const userid = localStorage.getItem("user_id");
  const [loading, setLoading] = useState(false);
  const [isPasswordSet, setIsPasswordSet] = useState(false);

  const [accountDetails, setAccountDetails] = useState({
    account_number: "",
    upi: "",
    ifsc: "",
    mici: "",
    user_id: userid,
    balance: ""
  });

  const walletHistory = [
    {
      id: 6419,
      date: "25 Dec 2016",
      amount: "-350.00",
      status: "Applied",
      color: "text-red-500",
    },
    {
      id: 1234,
      date: "25 Dec 2016",
      amount: "-180.00",
      status: "Applied",
      color: "text-red-500",
    },
    {
      id: 1299,
      date: "22 Dec 2016",
      amount: "-1999.00",
      status: "Applied",
      color: "text-red-500",
    },
    {
      id: 8888189159,
      date: "20 Dec 2016",
      amount: "+500.00",
      status: "Pending",
      color: "text-green-500",
    },
    {
      id: 5895,
      date: "15 Dec 2016",
      amount: "-4999.00",
      status: "Applied",
      color: "text-red-500",
    },
  ];

  const handleInputChange = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target;
    setAccountDetails({ ...accountDetails, [name]: value });
  };

  useEffect(() => {
    // Fetch the influencer profile on component mount
    const fetchaccountdetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(getaccountdetails + "/" + userid, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("data", data);
          if (data) {
            setAccountDetails((prevFields: any) => ({
              ...prevFields,
              account_number: data.account_number || "",
              upi: data.upi || "",
              ifsc: data.ifsc || "",
              mici: data.mici || "",
              password: data.password || "",
              balance: data.balance || "0.00",
            }));
          }
        } else {
          console.error("Error fetching accountdetails:", response.status);
        }
      } catch (error) {
        console.error("Failed to fetch account details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchaccountdetails();
  }, [userid]);

  const handleSubmit = async () => {
    try {
      const response = await fetch(accountdetails, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(accountDetails),
      });
      const result = await response.json();
      if (response.ok) {
        console.log("Details saved:", result.message);
        alert("Account Details Added Successfully!");
      } else {
        console.error("Error saving details:", result.error);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };
  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleAddMoney = () => {
    console.log("Adding money:", amount);
    setIsDialogOpen(false);
    // Add your logic here to update the wallet balance
  };

  if (loading) {
    return (
      <div className="mt-[100px] ml-[250px] text-xl font-bold">
        Loading Account Details...
      </div>
    );
  }

  return (
    <Box className="p-4 mt-[50px] flex flex-col items-center min-h-screen ml-[100px]">
      {/* Header */}
      <div className="flex gap-4">
        <Typography
          variant="h4"
          className="font-bold mb-4 mt-4"
          sx={{ color: "primary.main" }}
        >
          My Wallet
        </Typography>
        <WalletIcon
          className="ml-4 mt-4"
          sx={{ color: "primary.main", fontSize: 40 }}
        />
      </div>

      {/* Balance Section */}
      <Card className="my-6 text-center w-[30%] bg-violet-100">
        <CardContent>
          <Typography className="text-gray-500 text-sm">
            Available Balance
          </Typography>
          <Typography variant="h3" className="font-bold mb-2">
            {accountDetails.balance}
          </Typography>
          <Button
            variant="contained"
            className="mt-4 text-white capitalize"
            onClick={handleDialogOpen}
          >
            + Withdraw Money
          </Button>
        </CardContent>
      </Card>
      <Divider className="my-6 w-full" />

      {/* Dialog for Adding Money */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add Money</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Enter Amount"
            type="number"
            fullWidth
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddMoney} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Bank Details Section */}
      <Typography
        variant="h5"
        className="font-bold mb-6"
        sx={{ color: "primary.main" }}
      >
        Bank Account Details
      </Typography>

      <Box className="w-full max-w-lg grid grid-cols-2 gap-4">
        <Typography className="text-gray-600 text-sm font-semibold flex items-center">
          Account Number
        </Typography>
        <TextField
          name="account_number"
          fullWidth
          variant="outlined"
          className="mb-4"
          value={accountDetails.account_number}
          onChange={handleInputChange}
        />
        <Typography className="text-gray-600 text-sm font-semibold flex items-center">
          UPI ID
        </Typography>
        <TextField
          name="upi"
          fullWidth
          variant="outlined"
          className="mb-4"
          value={accountDetails.upi}
          onChange={handleInputChange}
        />
        <Typography className="text-gray-600 text-sm font-semibold flex items-center">
          IFSC Code
        </Typography>
        <TextField
          name="ifsc"
          fullWidth
          variant="outlined"
          className="mb-4"
          value={accountDetails.ifsc}
          onChange={handleInputChange}
        />
        <Typography className="text-gray-600 text-sm font-semibold flex items-center">
          MICI Number
        </Typography>
        <TextField
          name="mici"
          fullWidth
          variant="outlined"
          className="mb-4"
          value={accountDetails.mici}
          onChange={handleInputChange}
        />
      </Box>
      <Button
        variant="contained"
        className="mt-4 text-white capitalize w-[30%]"
        onClick={handleSubmit}
      >
        Submit
      </Button>

      <Divider className="my-8 w-full" />

      {/* Wallet History Section */}
      <Typography
        variant="h5"
        className="font-bold mb-4"
        sx={{ color: "primary.main" }}
      >
        Wallet History
      </Typography>

      <Box className="w-full max-w-xl">
        {walletHistory.map((item, index) => (
          <Box
            key={index}
            className="flex justify-between items-center py-3 border-b last:border-0"
          >
            <Box>
              <Typography className="text-gray-800 font-medium">
                {item.id.toString().length > 4
                  ? `Ref: ${item.id}`
                  : `Order ID: ${item.id}`}
              </Typography>
              <Typography className="text-gray-500 text-sm">
                {item.date}
              </Typography>
            </Box>
            <Box className="text-right">
              <Typography className={`font-medium ${item.color}`}>
                ${item.amount}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
