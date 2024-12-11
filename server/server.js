import express from "express";
import bodyParser from "body-parser";
import mercadopago from "mercadopago";
import dotenv from "dotenv";
import { Payment, MercadoPagoConfig } from "mercadopago";

dotenv.config();
const app = express();
const PORT = 3000;
const token = process.env.TOKEN_MERCADOPAGO;
mercadopago.accessToken = process.env.TOKEN_MERCADOPAGO; // Substitua pelo seu token de acesso

const client = new MercadoPagoConfig({
  accessToken: process.env.TOKEN_MERCADOPAGO,
});
const payment = new Payment(client);

// Middleware
app.use(bodyParser.json());

// Route to create a preference

app.get("/qrcode", (req, res) => {
  res.send("QRCODE : MAKE YOUR PAYMENT");
});

app.post("/criar-pix", (req, res) => {
  res.send("Criando PIX");
  console.log("token : ", token);
  const body = {
    transaction_amount: req.body.transactionAmount,  
    description: req.body.description,
    payment_method_id: req.body.paymentMethodId,
    payer: {
      email: req.body.email,
      identification: {
        type: req.body.identificationType,
        number: req.body.identificationNumber,  
      },
    },
  };
  const requestOptions = {
    idempotencyKey: "<IDEMPOTENCY_KEY>",
  };
  payment.create({ body, requestOptions }).
  then((result)=>{console.log(result)}).catch(console.log);
  console.log(req);
});

app.get("/success", (req, res) => {
  res.send("Payment Successful!");
});

app.get("/failure", (req, res) => {
  res.send("Payment Failed.");
});

app.get("/pending", (req, res) => {
  res.send("Payment Pending.");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
