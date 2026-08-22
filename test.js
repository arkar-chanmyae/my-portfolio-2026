const { streamText } = require("ai");
const { google } = require("@ai-sdk/google");
async function run() {
  const result = await streamText({
    model: google("gemini-flash-lite-latest"),
    prompt: "hello",
  });
  console.log(Object.keys(result));
}
run().catch(console.error);
