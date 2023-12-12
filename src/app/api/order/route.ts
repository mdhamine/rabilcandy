export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Product } from "../product/model";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const orderedProducts = await Product.find({
      slug: { $in: body.products.map((product: any) => product.slug) },
    }).select("name slug price");

    const smtpConfig = {
      host: process.env.SMTP_HOST,
      port: 587, //465,
      //   secure: true,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
      },
    };

    const transporter = nodemailer.createTransport(smtpConfig);

    // const productsOrdered = orderedProducts.map(proudct => {return {name: product.}})

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: process.env.RECEIVER_EMAIL,
      subject: "New order on the website",
      text: `
        You have received a new order on your website.

        Here are the order details:
        -----------------------------------------------

        Fullname: ${body.fullname}
        Phone: ${body.phone}
        Address: ${body.address}
        Delivery Type: ${body.delivery}

        -----------------------------------------------

        Products Ordered:
        ${orderedProducts.map((product: any, index: number) => {
          return `
                Product ${index + 1}
                Name: ${product.name}
                Price: ${product.price}
                Size: ${
                  body.products.find((p: any) => p.slug === product.slug)?.size
                }
                Color: ${
                  body.products.find((p: any) => p.slug === product.slug)?.color
                }
            `;
        })}

        -----------------------------------------------
        Total: ${orderedProducts.reduce((acc, curr) => {
          return acc + curr.price;
        }, 0)}
        Order Received on: ${new Date().toISOString()}
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    // console.log('Message sent: %s', info.messageId);

    return NextResponse.json({
      success: true,
      message: "Order received successfully",
    });
  } catch (error) {
    console.error("Error on order :", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
}
