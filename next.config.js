/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_URL:
      "mongodb+srv://polok:d2zBoAn2O2VAFgvD@cluster0.qjrhokc.mongodb.net/ecom?retryWrites=true&w=majority",
    SENDER_PASSWORD: "q8YqUvVDmG4Rsdb7YQ",
    SENDER_EMAIL: "lionel61@ethereal.email",
    RECEIVER_EMAIL: "lionel61@ethereal.email",
    SMTP_HOST: "smtp.ethereal.email", // "smtp.gmail.com"
  },
};

module.exports = nextConfig;
