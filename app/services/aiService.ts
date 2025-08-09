import { Board, Direction } from "../types/game";

export interface AIAdvice {
    suggestedMove: Direction;
    reasoning: string;
    confidence: number;
}

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

const formatBoardForAI = (board: Board): string => {
    return board
        .map((row) =>
            row.map((cell) => (cell === null ? "0" : cell.toString())).join(" ")
        )
        .join("\n");
};

export const getAIAdvice = async (
    board: Board,
    apiKey: string
): Promise<AIAdvice> => {
    if (!apiKey) {
        throw new Error("OpenAI API key is required");
    }

    const boardString = formatBoardForAI(board);

    const prompt = `You are an expert 2048 game AI. Analyze this board state and suggest the best move.

Board (0 = empty):
${boardString}

Rules:
- Tiles slide and merge when moved
- Goal is to create 2048 tile and maximize score
- Avoid filling the board completely

Respond with JSON only:
{
  "suggestedMove": "up|down|left|right",
  "reasoning": "Brief explanation (max 50 words)",
  "confidence": a number between 0 and 1 base on the confidence of the move
}`;

    try {
        const response = await fetch(OPENAI_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
                max_tokens: 150,
                temperature: 0.1,
            }),
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status}`);
        }

        const data = await response.json();
        const content = data.choices[0]?.message?.content;

        if (!content) {
            throw new Error("No response from AI");
        }

        const advice: AIAdvice = JSON.parse(content);

        if (!["up", "down", "left", "right"].includes(advice.suggestedMove)) {
            throw new Error("Invalid move suggested by AI");
        }

        return advice;
    } catch (error) {
        throw new Error(
            `AI advice failed: ${
                error instanceof Error ? error.message : "Unknown error"
            }`
        );
    }
};
