import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { name, email, inviteLink, paymentId } = req.body;

  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          email: "youthphilosophy544@gmail.com",
          name: "YOUTH PHILOSOPHY",
        },
        to: [{ email, name }],
        subject: `Your Favorite Poison Ebook for ${name}!`,
        htmlContent: `
          <p><strong>Hello ${name},</strong></p>
          <p>Welcome to a life-changing experience! 🚀 You've successfully purchased, and your journey starts now.</p>
          <p>Here's your exclusive ebook access:</p>
          <p><a href="${inviteLink}">Download Now</a></p>
          <p>Payment ID: <strong>${paymentId}</strong></p>
          <p>If you face any issues, we're here to help! Just reach out, and we'll make it right.</p>
          <p>Best regards,<br><strong>Youth Philosophy</strong></p>
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error.message);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
