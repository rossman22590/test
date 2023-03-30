// Log chats to Notion
/*
  TODO:
  - hardcoded localhost
  - only logs user messages (not system [prompt] or assistant [responses])
*/
export async function saveChatToNotion(history: any[]) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ history }),
  };

  try {
    const response = await fetch('http://localhost:3001/saveChatToNotion', requestOptions);

    if (response.ok) {
      console.log('Chat history saved to Notion');
    } else {
      console.error('Error saving chat history to Notion:', await response.json());
    }
  } catch (error) {
    console.error('Error saving chat history to Notion:', error);
  }
}