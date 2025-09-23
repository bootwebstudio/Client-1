  import axios from "axios";

  export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") return res.status(200).end();

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { name, email, phone, age, referral, paymentId } = req.body;

    try {
      const text = `📩 New User Data:\n👤 Name: ${name}\n📧 Email: ${email}\n📞 Phone: ${phone}\n🎂 Age: ${age}\n📢 Referral: ${referral}\n💳 Payment ID: ${paymentId}`;

      await axios.post(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          chat_id: process.env.TELEGRAM_DATABASE_CHAT_ID,
          text,
        }
      );

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error sending to Telegram:", error.message);
      return res.status(500).json({ error: "Failed to send data to Telegram" });
    }
  }
