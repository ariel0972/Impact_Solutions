const bodyParser = require('body-parser');
const express = require('express');
const nodemailer = require("nodemailer");

const app = express();
const port = 5501; // Porta do servidor

app.use(bodyParser.json());

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ratosdauninove@gmail.com',
        pass: 'H@m8_s2M6Fn_@t5'
    }
});

app.post('/recuperar-senha', (req, res) => {
    const { email } = req.body;

    const mailOptions = {
        from: 'ratosdauninove@gmail.com',
        to: email,
        subject: 'Recuperação de Senha',
        text: 'Olá! Aqui estão as instruções para redefinir sua senha...'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erro ao enviar e-mail de recuperação de senha');
        } else {
            console.log('E-mail de recuperação de senha enviado: ' + info.response);
            res.send('E-mail de recuperação de senha enviado com sucesso');
        }
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
