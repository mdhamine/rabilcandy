/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_URL:
      "mongodb+srv://test:mangotest@cluster0.wk291zy.mongodb.net/ecom?retryWrites=true&w=majority",
    SENDER_PASSWORD: "wuip jfxb bmgh twcv",
    SENDER_EMAIL: "cyn.webservices@gmail.com",
    RECEIVER_EMAIL: "wasape4325@getmola.com",
    SMTP_HOST: "smtp.gmail.com", // "smtp.ethereal.email", //
  },
};

module.exports = nextConfig;
