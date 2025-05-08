import Together from "together-ai";

const options: ConstructorParameters<typeof Together>[0] = {
  apiKey: process.env.TOGETHER_API_KEY,
};

export const togetherBaseClient = new Together(options);
