import { Box, Card, Dialog, Slide, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import moment from "moment";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const InvoiceView = (props: any) => {
  console.log(props);
  const Data = props?.submitData;
  return (
    <Dialog
      open={props?.openModel}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => props?.setOpenModel(false)}
      aria-describedby="alert-dialog-slide-description"
      fullWidth={true}
      maxWidth="md"
    >
      <Card sx={{ padding: "40px 30px", marginRight: "20px" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }} gap={"10px"}>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent="space-between"
            marginBottom={2}
          >
            <Box sx={{ justifyContent: "space-between" }}>
              <Typography>Invoice Number: {Data?.invoiceNumber}</Typography>
              <Typography>
                Due Date: {moment(Data?.dueDate).format("DD/MM/YYYY")}
              </Typography>
              <Typography>
                Current Date: {moment(Data?.currentDate).format("DD/MM/YYYY")}
              </Typography>
              <Typography marginRight={3}>
                Invoice Due: {Data?.total}
              </Typography>
            </Box>

            <Box display={"flex"} flexDirection={"column"}>
              <Typography variant="h4" marginBottom={2}>
                Invoice Template
              </Typography>

              <img
                src={require("../Assets/2.png")}
                height="50px"
                width={"230px"}
                alt="image"
              />
            </Box>
          </Box>
        </Box>

        <Box marginTop={5} display={"flex"} justifyContent="space-between">
          <Box>
            <Typography sx={{ fontWeight: 800 }}>Bill To:</Typography>
            <Typography>{Data?.billToUserName}</Typography>
            <Typography>{Data?.billToUserEmail}</Typography>
            <Typography>{Data?.billToUserBillingAddress}</Typography>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 800 }}>Bill From:</Typography>
            <Typography marginRight={15}>{Data?.billFromUserName}</Typography>
            <Typography>{Data?.billFromUserEmail}</Typography>
            <Typography>{Data?.billFromUserBillingAddress}</Typography>
          </Box>
        </Box>

        <Box>
          <Box sx={{ marginTop: "30px" }}>
            <hr />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>ITEM</Typography>
              <Typography
                marginLeft={7}
                sx={{ fontWeight: 600, maxWidth: "50px" }}
              >
                QTY
              </Typography>
              <Typography sx={{ fontWeight: 600, marginRight: "2px" }}>
                PRICE/RATE
              </Typography>
            </Box>
            <hr />
            <Box>
              {Data?.invoiceItem?.map((v, i) => (
                <>
                  <Box
                    key={i}
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
                      }}
                    >
                      <Typography maxWidth={"50px"}>{v.itemName}</Typography>
                      <Typography maxWidth={"50px"}>{v.itemDesc}</Typography>
                    </Box>
                    <Typography maxWidth={"50px"}>{v.qty}</Typography>
                    <Typography maxWidth={"50px"} sx={{ marginRight: "35px" }}>
                      {v.price}
                    </Typography>
                  </Box>
                  <hr />
                </>
              ))}
            </Box>
          </Box>
        </Box>

        <Box>
          <Box
            sx={{
              gap: "20px",
              marginTop: "30px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Box
              marginRight={3}
              sx={{ display: "flex", gap: "20px", flexDirection: "column" }}
            >
              <Typography sx={{ fontWeight: 600 }}>Sub Total:</Typography>
              <Typography sx={{ fontWeight: 600 }}>Discount:</Typography>
              <Typography sx={{ fontWeight: 600 }}>Tax:</Typography>
              <Typography sx={{ fontWeight: 600 }}>Total:</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "20px",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Typography>${Data?.subTotal}</Typography>
              <Typography>${Data?.discount}</Typography>
              <Typography>${Data?.tax}</Typography>
              <Typography>${Data?.total} </Typography>
            </Box>
          </Box>
        </Box>

        <Box>
          <Typography marginTop={5} variant={"h5"}>
            Signature: {Data?.notes}
          </Typography>
        </Box>
      </Card>
    </Dialog>
  );
};

export default InvoiceView;
