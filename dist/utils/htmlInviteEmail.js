"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInviteEmail = void 0;
function getInviteEmail({ link, name, group }) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Convite para Pocket Guardian</title>
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
        background-color: #4CAF50;
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
      <p><strong>${name}</strong> te convidou para se juntar ao grupo <strong>${group}</strong> na plataforma Pocket Guardian.</p>
      <p>Pocket Guardian é uma ferramenta de gestão financeira que te ajuda a controlar suas despesas e receitas de forma colaborativa. Junte-se ao seu grupo para começar a planejar e gerenciar suas finanças juntos!</p>
      <a href=${link} class="button">Aceitar Convite</a>
      <p class="footer">Se você não esperava receber este e-mail, por favor, ignore-o.</p>
    </div>
    </body>
    </html>
    `;
}
exports.getInviteEmail = getInviteEmail;
