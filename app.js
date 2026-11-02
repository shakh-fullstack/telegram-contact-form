const contactForma = document.getElementById("contact-form");
const statusDiv = document.getElementById("status");

const BOT_TOKEN = "YOUR_BOT_TOKEN";
const CHAT_ID = "YOUR_CHAT_ID";

contactForma.addEventListener("submit", async (event) => {
  event.preventDefault();

  const userName = document.getElementById("name").value;
  const userMessage = document.getElementById("message").value;

  const formattedMessage = `🚀 Yangi Xabar!\n\n👤 Ism: ${userName} \n💬 Xabar: ${userMessage}`;

  statusDiv.textContent = "Yuborilmoqda...";

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: formattedMessage,
          parse_mode: "Markdown",
        }),
      },
    );
    const data = await response.json();
    if (data.ok) {
      statusDiv.textContent = "✅ Xabar muvaffaqiyatli yuborildi!";
      contactForma.reset();
    } else {
      throw new Error(data.description || "Xabar yuborilmadi");
    }
  } catch (error) {
    statusDiv.textContent = `❌ Xatolik  yuz berdi: ${error.message}`;
  }
});
