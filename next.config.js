/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_URL:
      "mongodb+srv://test:mangotest@cluster0.wk291zy.mongodb.net/ecom?retryWrites=true&w=majority",
    SENDER_PASSWORD: "q8YqUvVDmG4Rsdb7YQ",
    SENDER_EMAIL: "lionel61@ethereal.email",
    RECEIVER_EMAIL: "lionel61@ethereal.email",
    SMTP_HOST: "smtp.ethereal.email", // "smtp.gmail.com"
  },
};

module.exports = nextConfig;
