import express from 'express';
import bodyParser from 'body-parser';
import mercadopago from 'mercadopago';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = 3000;

mercadopago.accessToken = process.env.TOKEN_MERCADOPAGO; // Substitua pelo seu token de acesso

// mercadopago.configure({
//     access_token: process.env.TOKEN_MERCADOPAGO, // Replace with your Mercado Pago Access Token
// });

// Middleware
app.use(bodyParser.json());

// Route to create a preference
app.post('/create_preference', async (req, res) => {
    const { items, payer } = req.body;

    const preference = {
        items,
        payer,
        back_urls: {
            success: 'http://localhost:3000/success',
            failure: 'http://localhost:3000/failure',
            pending: 'http://localhost:3000/pending',
        },
        auto_return: 'approved',
    };

    try {
        const response = await mercadopago.preferences.create(preference);
        res.status(200).json({
            id: response.body.id,
            init_point: response.body.init_point,
        });
    } catch (error) {
        console.error('Error creating preference:', error);
        res.status(500).json({ error: 'Failed to create preference' });
    }
});

app.get('/qrcode', (req, res) => {
    res.send('QRCODE : MAKE YOUR PAYMENT');
});

app.post('criar-pix', (req, res) => {
    res.send('QRCODE : MAKE YOUR PAYMENT');
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
