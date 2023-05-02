import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ message: "Invalid request method" });
    return;
  }

  const { email, foodName, description, availability } = req.body;
  // Check if all required fields are present
  if (!email || !foodName || !description || !availability) {
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

    const productRequest = `
<div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #333;">
   <div style="color: white; background-color: black;">
  <h2 style="font-size: 34px; text-align: center; padding-top: 1rem; padding-bottom: 1rem;">FOODIE</h2>
 </div>
    <h2 style="margin-top: 1em;">Food Request</h2>

    <p><span style="font-weight: bold;">Name</span> : ${foodName}</p>
    <p><span style="font-weight: bold;">Description:</span> ${description}</p>
    <p><span style="font-weight: bold;">Availability:</span> ${availability}</p>
    <p><span style="font-weight: bold;">Email:</span> ${email}</p>
    
</div>
`;

    const productRequest2 = `
<div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #333;">
   <div style="color: white; background-color: black;">
  <h2 style="font-size: 34px; text-align: center; padding-top: 1rem; padding-bottom: 1rem;">FOODIE</h2>
 </div>
    <h2 style="margin-top: 1em;">Food Request</h2>
    <p>Thank you for your request for the unlisted food item. Our team will make sure to attend to it promptly, 
    prepare it to the best of our ability, and add it to our food list.</p>
    
</div>
`;

    const mailOptions = {
      from: "jibola619@gmail.com",
      to: `jibola619@gmail.com`,
      subject: "Foodrequest",
      html: productRequest,
    };

    const mailOptions2 = {
      from: "jibola619@gmail.com",
      to: `${email}`,
      subject: "Food request akwnoledged mail",
      html: productRequest2,
    };

    await transporter.sendMail(mailOptions);
    await transporter.sendMail(mailOptions2);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    -console.error(error);
    res.status(500).json({ message: error });
  }
}
