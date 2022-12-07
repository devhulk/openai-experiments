const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

const makeCall = async () => {
    const response = await openai.createImage({
      prompt: "A cute baby sea otter",
      n: 2,
      size: "1024x1024",
    });
    console.log(response.data)

    return response
}

makeCall()
