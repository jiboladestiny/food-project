import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ message: "Invalid request method" });
    return;
  }

  const { customer, address, telephone, product ,mail} = req.body;

  // Check if all required fields are present
  if (!customer || !address || !telephone) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "jibola619@gmail.com",
        pass: process.env.MAIL,
      },
    });

const productsTable = `
<div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #333;">
   <div style="color: white; background-color: black;">
  <h2 style="font-size: 34px; text-align: center; padding-top: 1rem; padding-bottom: 1rem;">FOODIE</h2>
 </div>
  <h2 style="margin-top: 1em; color: #009688; font-size: 24px;">New Order</h2>

  <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
    <thead>
      <tr>
        <th style="border: 1px solid #ddd; padding: 10px; text-align: left; background-color: #f5f5f5;">Product Name</th>
        <th style="border: 1px solid #ddd; padding: 10px; text-align: left; background-color: #f5f5f5;">Quantity</th>
        <th style="border: 1px solid #ddd; padding: 10px; text-align: left; background-color: #f5f5f5;">Price</th>
      </tr>
    </thead>
    <tbody>
      ${product.products
        .map(
          (p) => `
          <tr>
            <td style="border: 1px solid #ddd; padding: 10px;">${p.title}</td>
            <td style="border: 1px solid #ddd; padding: 10px;">${p.quantity}</td>
            <td style="border: 1px solid #ddd; padding: 10px;">${p.price}</td>
          </tr>
        `
        )
        .join("")}
    </tbody>
  </table>

  <p style="margin: 0; font-weight: bold;">Total: ${product.total}</p>

  <h3 style="margin-top: 1em; color: #009688; font-size: 18px;">Customer Information:</h3>
  <ul style="list-style: none; margin: 0; padding: 0;">
    <li style="margin-bottom: 10px;"><strong style="color: #009688;">Name:</strong> ${customer}</li>
    <li style="margin-bottom: 10px;"><strong style="color: #009688;">Address:</strong> ${address}</li>
    <li style="margin-bottom: 10px;"><strong style="color: #009688;">Telephone:</strong> ${telephone}</li>
  </ul>
</div>
`;


    const mailOptions = {
      from: "jibola619@gmail.com",
      to: `jibola619@gmail.com,${mail}`,
      subject: "New Order",
      html: productsTable,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
}
