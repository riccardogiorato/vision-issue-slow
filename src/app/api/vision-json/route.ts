import zodToJsonSchema from "zod-to-json-schema";
import { roomAnalysisSchema } from "./schemas";
import { togetherBaseClient } from "./clients";

const ROOM_ANALYSIS_PROMPT = `
You are an expert interior designer analyzing a room from an uploaded image. Provide a JSON assessment with five categories: mood, personality, energy, functionality, and lighting. For each, include a title (less than or equal to 3 words only mood title should be single word) and description (max 10-12 words) based on visible elements like colors, furniture, lighting, layout, and decor. Avoid generic responses—use specific, image-based details. Add a boolean 'isPositive' value for each category. Also define if the image picture is a room or not. Finally, suggest four improvements for the room based on the analysis with max 10-12 words.
`;

const imageUrl =
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format";

export async function GET(request: Request) {
  const start = new Date();
  const jsonSchema = zodToJsonSchema(roomAnalysisSchema, {
    target: "openAi",
  });

  // console.log("starting to generate room json");

  const extract = await togetherBaseClient.chat.completions.create({
    //model: "Qwen/Qwen2-VL-72B-Instruct", // qwen seems mostly fine 10 seconds runs
    model: "meta-llama/Llama-4-Scout-17B-16E-Instruct",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: ROOM_ANALYSIS_PROMPT },
          {
            type: "image_url",
            image_url: {
              url: imageUrl,
            },
          },
        ],
      },
    ],
    // @ts-ignore
    response_format: { type: "json_object", schema: jsonSchema },
  });

  const end = new Date();
  const timeTakenSeconds = (end.getTime() - start.getTime()) / 1000;

  console.log(
    "time taken to generate room JSON: ",
    timeTakenSeconds,
    " seconds"
  );

  if (extract?.choices?.[0]?.message?.content) {
    const output = JSON.parse(extract?.choices?.[0]?.message?.content);
    return Response.json({
      timeTakenSeconds: timeTakenSeconds,
      schema: output,
    });
  }

  return Response.json({
    error: "impossible parsing or generating room json",
  });
}
