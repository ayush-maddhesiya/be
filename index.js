import { GoogleGenerativeAI } from "@google/generative-ai";
import { BASE_PROMPT, getSystemPrompt } from "./promt.js";
import express from "express";
import dotenv from "dotenv";
import { basePrompt as reactBasePrompt } from "./defaults/react.js";
import { basePrompt as nodeBasePrompt } from "./defaults/node.js";
import fs from "fs";
import cors from "cors";
import googleTrends from "google-trends-api";

const app = express();
dotenv.config({
  path: "./.env"
});
app.use(express.json());

app.use(cors());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });


const context = "For all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.\n\nBy default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.\n\nUse icons from lucide-react for logos.\n\nUse stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags."

// const prompt = "create a todo list app with a feature to add, delete, and update tasks";
// const image = {
//   inlineData: {
//     data: Buffer.from(fs.readFileSync("cookie.png")).toString("base64"),
//     mimeType: "image/png",
//   },
// };

// const result = await model.generateContent({
//   contents: [
//     {
//       role: "user",
//       parts: [
//         {
//           text: `Context: ${context}\n\nPrompt: ${prompt}`, 
//         }
//       ],
//     }
//   ],
//   generationConfig: {
//     maxOutputTokens: 2000,
//     temperature: 0.1,
//   },
// });

var resultss = null;
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/template", async (req, res) => {
  console.log("response.body: ", req.body);
  const name = req.body.company;

  if (!name) {
    res.status(400).send("Prompt is required.");
    return;
  }



  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Context:\n\nI need a template that includes the following fields: categories and brand name list of competitors. I will provide the name for the brand, people, or product.\n this is templete in which i need to fill the details of the company but in short only\n\n${getSystemPrompt}\n
            \n\nPrompt: ${name}`,
          },
        ],
      },
    ],
    generationConfig: {
      maxOutputTokens: 2000,
      temperature: 0.1,
    },
  });

  // console.log("result.response.text(): ", result.response.text());

  // const answer = result.response.text().trim();  // Trim any excess whitespace or newline characters

  // console.log("answer after trim: ", answer); // To verify the trimmed response
  
  // if (answer === "react") {  // Strict equality check after trimming
  //   res.json({
  //     prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
  //     uiPrompts: [reactBasePrompt]
  //   });
  //   return;
  // }
  
  // if (answer === "node") {  // Strict equality check after trimming
  //   res.json({
  //     prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
  //     uiPrompts: [nodeBasePrompt]
  //   });
  //   return;
  resultss = result.response.text();
  return resultss;

  });

  
app.post("/trands", async (req, res) => {
  const analyzeForAds = async (req, res) => {
    try {
      const { keyword, startDate, endDate, geo } = req.query;
  
      // Validate input
      if (!keyword) {
        return res.status(400).json({ error: 'Keyword is required.' });
      }
  
      // Configure the parameters for Google Trends API
      const options = {
        keyword,
        startTime: startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Default to last 30 days
        endTime: endDate ? new Date(endDate) : new Date(),
        geo: geo || 'US', // Default to US
      };
  
      // Fetch interest over time
      const trendsData = await googleTrends.interestOverTime(options);
      const parsedTrends = JSON.parse(trendsData);
  
      // Process interest over time
      const timeInsights = parsedTrends.default.timelineData.map((dataPoint) => ({
        time: new Date(dataPoint.time * 1000),
        value: dataPoint.value[0],
      }));
  
      // Calculate peak interest time
      const peakTime = timeInsights.reduce((max, current) => (current.value > max.value ? current : max), timeInsights[0]);
  
      // Fetch related queries
      const relatedData = await googleTrends.relatedQueries({ keyword, geo: geo || 'US' });
      const parsedRelated = JSON.parse(relatedData);
  
      const relatedQueries = parsedRelated.default.rankedList[0].rankedKeyword.map((item) => ({
        query: item.query,
        value: item.value,
      }));
  
      // Fetch trending categories
      const trendingCategories = await googleTrends.autoComplete({ keyword });
      const parsedCategories = JSON.parse(trendingCategories);
  
      const suggestedCategories = parsedCategories.default.topics.map((topic) => topic.title);
  
      // Response with insights for ads
      res.status(200).json({
        keyword,
        insights: {
          timeInsights,
          peakInterestTime: peakTime,
          relatedQueries,
          suggestedCategories,
        },
      });
    } catch (error) {
      console.error('Error analyzing Google Trends data for ads:', error);
      res.status(500).json({ error: 'An error occurred while analyzing Google Trends data.' });
    }

    return analyzeForAds;
  };
});
app.post("/generate", async (req, res) => {
  const data = resultss.json();

  const anay = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Context:\n\nNow i want that ffomr the  data give me insight of ads that i can use improve my design this is data ${data}\n\n Prompt: data that use to make dashboard`,
          },
        ],
      },
    ],
    generationConfig: {
      maxOutputTokens: 2000,
      temperature: 0.7,
    },
  });

  res.json(anay);
});

app.post("/chat", async (req, res) => {

  //link 1:38:37 sec
  const message = req.body.message;
  console.log("message form FE ::: ", req.body);



  const response = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Context:\n\n${getSystemPrompt}\n\n Prompt: ${message}`,
          },
        ],
      },
    ],
    generationConfig: {
      maxOutputTokens: 1200,
      temperature: 0.1,
    },
  });
  
  console.log("response.response.text(): ", response.response.text());
  const TextBlock =  response.response.text()
  res.json({
    message: TextBlock,
  });

});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});



// for await (const chunk of result.stream) {
//   const chunkText = chunk.text();
//   process.stdout.write(chunkText);
// }

// console.log(result.response.text());