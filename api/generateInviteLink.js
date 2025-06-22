import axios from "axios";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/createChatInviteLink`,
      {
        chat_id: process.env.TELEGRAM_INVITE_LINK_CHAT_ID,
        expire_date: Math.floor(Date.now() / 1000) + 86400, // expires in 24 hours
        member_limit: 1,
      }
    );

    const inviteLink = response.data.result?.invite_link || null;
    if (!inviteLink) throw new Error("Invite link not returned");

    return res.status(200).json({ inviteLink });
  } catch (error) {
    console.error("Telegram invite error:", error.message);
    return res.status(500).json({ error: "Failed to generate invite link" });
  }
}
