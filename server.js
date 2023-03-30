require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/saveChatToNotion', async (req, res) => {
  const { history } = req.body;

  // Create a new page in the Notion database
  const newPage = {
    parent: {
      database_id: process.env.NOTION_DB_ID,
    },
    properties: {
      ChatHistory: {
        rich_text: [
          {
            text: {
              content: JSON.stringify(history),
            },
          },
        ],
      },
    },
  };

  try {
    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
        'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
      },
      body: JSON.stringify(newPage),
    });

    if (response.ok) {
      res.status(200).json({ message: 'Chat history saved to Notion' });
    } else {
      const error = await response.json();
      console.error('Error saving chat history to Notion:', error);
      res.status(500).json({ message: 'Error saving chat history to Notion', error });
    }
  } catch (error) {
    console.error('Error saving chat history to Notion:', error);
    res.status(500).json({ message: 'Error saving chat history to Notion', error });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));