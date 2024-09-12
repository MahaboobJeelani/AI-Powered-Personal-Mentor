const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEN_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generate = async (prompt) => {
    try {
        const result = await model.generateContent(prompt);
        let data = result.response.text();

        data = data.replace(/\*/g, '').trim();

        return data;
    } catch (error) {
        console.log(error.message);
    }
};

const chatWithAi = async (req, resp) => {
    try {
        const prompt = req.body.question;
        const result = await generate(prompt);
        resp.status(200).send(result);
    } catch (error) {
        resp.status(500).send("Error while getting the data from Gemini AI: " + error.message);
    }
};

module.exports = chatWithAi;
