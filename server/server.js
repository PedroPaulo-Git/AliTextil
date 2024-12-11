import express from 'express';
import bodyParser from 'body-parser';
import mercadopago from 'mercadopago';
import dotenv from 'dotenv';
import { Payment, MercadoPagoConfig } from 'mercadopago';

dotenv.config();
const app = express();
const PORT = 3000;
const token = process.env.TOKEN_MERCADOPAGO;
mercadopago.accessToken = process.env.TOKEN_MERCADOPAGO; // Substitua pelo seu token de acesso



const client = new MercadoPagoConfig({ accessToken: process.env.TOKEN_MERCADOPAGO });
const payment = new Payment(client);


// Middleware
app.use(bodyParser.json());

// Route to create a preference

app.get('/qrcode', (req, res) => {
    res.send('QRCODE : MAKE YOUR PAYMENT');
});

app.post('/criar-pix', (req, res) => {
    
    res.send('Criando PIX');
    console.log("token : ",token)
    payment.create({
        body: { 
            transaction_amount: req.transaction_amount,
            description: req.description,
            payment_method_id: req.paymentMethodId,
                payer: {
                email: req.email,
                identification: {
            type: req.identificationType,
            number: req.number
        }}},
        requestOptions: { idempotencyKey: '<SOME_UNIQUE_VALUE>' }
    })
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
    console.log(req)
    
    
});

app.get('/success', (req, res) => {
    res.send('Payment Successful!');
});

app.get('/failure', (req, res) => {
    res.send('Payment Failed.');
});

app.get('/pending', (req, res) => {
    res.send('Payment Pending.');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
