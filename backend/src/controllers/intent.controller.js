import { CohereClient } from "cohere-ai";

const cohere = new CohereClient({ token: "OAjFvbtZ8qQDM1y6UIx49VgxXltggPWsQWMg9dMM" });

export const detectIntent = async (req, res) => {
  try {
    const { message } = req.body;
    console.log(message)
    const response = await cohere.chat({
      model: "command-r", // or use "command-r-plus" if you want
      message: `Classify the following user message into one of the intents: reminder, urgent, casual,abusive or toxic. Only respond with the intent name.\nMessage: "${message}"`,
      temperature: 0.3,
    });

    const intent = response.text?.trim().toLowerCase();
    console.log(intent)
    res.json({ intent });
  } catch (error) {
    console.error("Cohere intent error:", error);
    res.status(500).json({ error: "Failed to detect intent" });
  }
};
