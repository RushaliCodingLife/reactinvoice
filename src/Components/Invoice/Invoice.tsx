import {
  Autocomplete,
  Button,
  Card,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Box } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InvoiceView from "./InvoiceView";

const Invoice = () => {
  const currencyList = [
    {
      label: "Dollar",
      value: "dollar",
    },
    {
      label: "Australian dollar",
      value: "AUD",
    },
    {
      label: "Indian Rupee",
      value: "rupee",
    },
  ];

  const [dueDate, setDueDate] = useState(null);
  const [subTotalVal, setSubTotalVal] = useState(0);
  const [openModel, setOpenModel] = useState(false);
  const [submitData, setSubmitData] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const { register, handleSubmit, control, watch } = useForm({
    shouldUseNativeValidation: true,
  });
  const { fields, append, remove } = useFieldArray({
    name: "invoiceItem",
    control,
  });
  const values = watch();

  const handleChangeDueDate = (event: any) => {
    setDueDate(event?._d);
  };

  const onSubmit = (data: any) => {
    setSubmitData({
      currentDate,
      dueDate,
      invoiceNumber: data?.invoice,
      billToUserName: data?.billToUserName,
      billToUserEmail: data?.billToUserEmail,
      billToUserBillingAddress: data?.billToUserBillingAddress,
      billFromUserName: data?.billFromUserName,
      billFromUserEmail: data?.billFromUserEmail,
      billFromUserBillingAddress: data?.billFromUserBillingAddress,
      invoiceItem: data?.invoiceItem,
      subTotal: subTotalVal,
      discount: (subTotalVal - (data?.discount / 100) * subTotalVal).toFixed(2),
      tax: (
        (subTotalVal - (data?.discount / 100) * subTotalVal) /
        data?.tax
      ).toFixed(2),
      total:
        subTotalVal -
        (data?.discount / 100) * subTotalVal +
        (subTotalVal - (data?.discount / 100) * subTotalVal) / data?.tax,
      notes: data?.notes,
    });
    setOpenModel(true);
  };

  useEffect(() => {
    let subTotal = values.invoiceItem?.reduce(
      (total: any, curr: any) => total + curr.price * curr.qty,
      0
    );
    setSubTotalVal(subTotal);
  }, [values.invoiceItem]);

  const hanldeAppend = () => {
    append({
      itemName: "",
      itemDesc: "",
      qty: 0,
      price: 0,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", justifyContent: "center", margin: "20px" }}>
          <Box>
            <Card
              sx={{
                padding: "40px 30px",
                marginRight: "20px",
                width: "1000px",
              }}
            >
              <Box className="row" mb="10px">
                <Box className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-6">
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box>
                      <Box sx={{ marginBottom: "20px" }}>
                        <DatePicker
                          label="Current Date"
                          renderInput={(params) => <TextField {...params} />}
                          value={currentDate}
                          {...register("currentDate")}
                          inputFormat="DD/MM/YYYY"
                          disabled={true}
                          onChange={(e: any) => setCurrentDate(e?._d)}
                        />
                      </Box>
                      <Box sx={{ marginBottom: "20px" }}>
                        <DatePicker
                          label="Due Date"
                          renderInput={(params) => <TextField {...params} />}
                          value={dueDate}
                          {...register("dueDate")}
                          inputFormat="DD/MM/YYYY"
                          onChange={handleChangeDueDate}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Box className="col-xl-5 col-lg-4 col-md-4 col-sm-6 col-xs-6"></Box>

                <Box className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-6">
                  {" "}
                  <Box>
                    <TextField
                      type="number"
                      label="Invoice Number"
                      {...register("invoice")}
                    />
                  </Box>
                </Box>
              </Box>
              <hr/>

              <Box className="row">
                <Box className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      // marginRight: "20px",
                      gap: "10px",
                
                    }}
                  >
                    <Typography>Bill To:</Typography>
                    <TextField
                      type="text"
                      label="Who is this invoice to?"
                      {...register("billToUserName")}
                    />
                    <TextField
                      type="email"
                      label="Email Address"
                      {...register("billToUserEmail")}
                    />
                    <TextField
                      type="text"
                      label="Bill Address"
                      {...register("billToUserBillingAddress")}
                    />
                  </Box>
                </Box>

                <Box className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                  
                    }}
                  >
                    <Typography>Bill From:</Typography>
                    <TextField
                      type="text"
                      label="Who is this invoice from?"
                      {...register("billFromUserName")}
                    />
                    <TextField
                      type="email"
                      label="Email Address"
                      {...register("billFromUserEmail")}
                    />
                    <TextField
                      type="text"
                      label="Bill Address"
                      {...register("billFromUserBillingAddress")}
                    />
                  </Box>
                </Box>
              </Box>

              <Box sx={{ marginTop: "30px" }}>
                <hr />

                <Box className="row">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      
                    }}
                  >
                    <Box className="col-xl-5 col-lg-7 col-md-7 col-sm-12 col-xs-12">
                      <Typography>ITEM</Typography>
                    </Box>


                    <Box className="col-xl-2 col-lg-1 col-md-1 col-sm-12 col-xs-12">
                      <Typography>QTY</Typography>
                    </Box>

                    <Box className="col-xl-2 col-lg-1 col-md-1 col-sm-12 col-xs-12">
                      <Typography>PRICE/RATE</Typography>
                    </Box>

                    <Box className="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-xs-12">
                      <Typography>ACTION</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <hr />
              <Box>
                {fields.map((v, i) => (
                  <>
                    <Box
                      key={v.id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "10px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                          width: "50%",
                        }}
                      >
                        <TextField
                          type="text"
                          label="Item Name"
                          {...register(`invoiceItem[${i}].itemName`)}
                        />
                        <TextField
                          type="text"
                          label="Item Description"
                          {...register(`invoiceItem[${i}].itemDesc`)}
                        />
                      </Box>
                      <TextField
                        type="number"
                        label="QTY"
                        {...register(`invoiceItem[${i}].qty`)}
                      />
                      <TextField
                        type="number"
                        label="PRICE/RATE"
                        {...register(`invoiceItem[${i}].price`)}
                      />
                      <Box>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => remove(i)}
                        >
                          <DeleteOutlineIcon />
                        </Button>
                      </Box>
                    </Box>
                    <hr />
                  </>
                ))}
                <Button variant="contained" onClick={hanldeAppend}>
                  Add Item
                </Button>
              </Box>

              <Box
                sx={{
                  gap: "20px",
                  marginTop: "30px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Box
                  sx={{ display: "flex", gap: "20px", flexDirection: "column" }}
                >
                  <Typography>Sub Total:</Typography>
                  <Typography>Discount:</Typography>
                  <Typography>Tax:</Typography>
                  <Typography>Total:</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: "20px",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <Typography>${subTotalVal}</Typography>
                  <Typography>
                    ({values?.discount ? values.discount : 0}%)${" "}
                    {values?.discount
                      ? (
                          subTotalVal -
                          (values?.discount / 100) * subTotalVal
                        ).toFixed(2)
                      : 0}
                  </Typography>
                  <Typography>
                    ({values?.tax ? values.tax : 0}%)${" "}
                    {values?.tax
                      ? (
                          (subTotalVal -
                            (values?.discount / 100) * subTotalVal) /
                          values.tax
                        ).toFixed(2)
                      : 0}
                  </Typography>
                  <Typography>
                    ${" "}
                    {subTotalVal -
                      (values?.discount / 100) * subTotalVal +
                      (subTotalVal - (values?.discount / 100) * subTotalVal) /
                        values.tax}
                  </Typography>
                </Box>
              </Box>
              <hr />
              <TextField
                id="filled-multiline-static"
                label="signature"
                multiline
                rows={2}
                sx={{ width: "100%" }}
                {...register(`notes`)}
              />
            </Card>
          </Box>

          <Box
            sx={{
              width: "300px",
              gap: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button variant="contained" type="submit" sx={{ width: "100%" }}>
              Review Invoice
            </Button>
            <hr />
            <Autocomplete
              disablePortal
              options={currencyList}
              renderInput={(params) => (
                <TextField {...params} label="Currency" />
              )}
              {...register(`currency`)}
            />
            <TextField
              label="Tax Rate"
              id="outlined-start-adornment"
              sx={{ width: "100%" }}
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              {...register(`tax`)}
            />
            <TextField
              label="Discount Rate"
              id="outlined-start-adornment"
              sx={{ width: "100%" }}
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              {...register(`discount`)}
            />
          </Box>
        </Box>
      </form>

      <InvoiceView
        submitData={submitData}
        setOpenModel={setOpenModel}
        openModel={openModel}
      />
    </>
  );
};

export default Invoice;
