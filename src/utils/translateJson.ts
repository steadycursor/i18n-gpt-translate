import axios from "axios";

export const translateJson = async (data: any, locale: string, token: string) => {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Please output valid JSON. keys will be keys of translations, those we will not change. We will just translate the values to locale ${locale}. You will basically return same object as you get, but with translated values.`,
        },
        {
          role: "user",
          content: `Here is source data: ${JSON.stringify(data)}`,
        },
      ],
      response_format: { type: "json_object" },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const content = response.data.choices[0].message.content.replace(/\n/g, "");

  return JSON.parse(content);
};
