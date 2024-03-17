"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfirmationEmail = void 0;
function getConfirmationEmail(link) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email de Confirmação</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        background-color: #f4f4f4;
      }
      .container {
        max-width: 600px;
        margin: auto;
        background: #fff;
        padding: 20px;
        text-align: center;
        border-radius: 8px;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 20px;
      }
      .footer {
        margin-top: 20px;
        font-size: 12px;
        color: #666;
      }
    </style>
    </head>
    <body>
    <div class="container">
      <h1>Bem-vindo ao Pocket Guardian!</h1>
      <p>Obrigado por se registrar. Por favor, confirme seu endereço de e-mail clicando no botão abaixo:</p>
      <a href="${link}" class="button">Confirmar Email</a>
      <p class="footer">Se você não criou uma conta no Pocket Guardian, por favor, ignore este e-mail.</p>
    </div>
    </body>
    </html>
    `;
}
exports.getConfirmationEmail = getConfirmationEmail;
