import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ message: "Invalid request method" });
    return;
  }

  const { customer, address, telephone, product } = req.body;

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
        pass: "kdyligpqmjwjmzon",
      },
    });

    const productsTable = `
      <h2 style="margin-top: 1em;">New Order</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 1em 0;">
        <thead>
          <tr>
            <th style="border: 1px solid black; padding: 8px; background-color: #eee; font-weight: bold;">Product Name</th>
            <th style="border: 1px solid black; padding: 8px; background-color: #eee; font-weight: bold;">Quantity</th>
            <th style="border: 1px solid black; padding: 8px; background-color: #eee; font-weight: bold;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${product.products.map(
            (p) => `
              <tr>
                <td style="border: 1px solid black; padding: 8px; text-align: left;">${p.title}</td>
                <td style="border: 1px solid black; padding: 8px; text-align: left;">${p.quantity}</td>
                <td style="border: 1px solid black; padding: 8px; text-align: left;">${p.price}</td>
              </tr>
            `
          )}
        </tbody>
      </table>

      <p style="margin: 0;">Total: ${product.total}</p>

      <h3 style="margin-top: 1em;">Customer Information:</h3>
      <ul style="list-style: none; margin: 0; padding: 0;">
        <li style="margin: 0;"><strong>Name:</strong> ${customer}</li>
        <li style="margin: 0;"><strong>Address:</strong> ${address}</li>
        <li style="margin: 0;"><strong>Telephone:</strong> ${telephone}</li>
      </ul>
    `;

    const mailOptions = {
      from: "jibola619@gmail.com",
      to: "jibola619@gmail.com",
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
