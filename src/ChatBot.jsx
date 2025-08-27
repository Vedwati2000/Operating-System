
import { useState, useEffect } from "react";

function ChatBoot() {
  const [chatBoot, setChatBoot] = useState("");
  const [chatList, setChatList] = useState([]);


  useEffect(() => {
    fetch("http://localhost:3000/api/chats")
      .then((res) => res.json())
      .then((data) => setChatList(data))
      .catch((err) => console.error(err));
  }, []);


  async function handleChat() {
    if (!chatBoot.trim()) return;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyArW_8RX3azJ1bz8_ctiJtkm2JCZlFBiFk`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: chatBoot }] }] }),
      }
    );

    const data = await response.json();
    const output = data.candidates[0].content.parts[0].text.replace(/\*/g, "");

 
    const newChat = { chat: `You: ${chatBoot} | Boot: ${output}` };

    fetch("http://localhost:3000/api/chats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newChat),
    })
      .then((res) => res.json())
      .then((saved) => {
        setChatList([...chatList, saved]);
        setChatBoot("");
      })
      .catch((err) => console.error(err));
  }

 
  
  function handleDelete(id) {
    fetch(`http://localhost:3000/api/chats/${id}`, { method: "DELETE" })
      .then(() => setChatList(chatList.filter((item) => item._id !== id)))
      .catch((err) => console.error(err));
  }

  return (
    <div className="container text-center mt-4">
      <h1 className="text-primary">Chat with me</h1>
      <div className="card p-3 shadow-sm">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter your chat..."
          value={chatBoot}
          onChange={(e) => setChatBoot(e.target.value)}
        />
        <button className="btn btn-success w-100" onClick={handleChat}>
          Chat
        </button>
      </div>
      <div className="mt-3">
        {chatList.map((item) => (
          <div
            key={item._id}
            className="d-flex justify-content-between align-items-center border rounded p-2 mb-2 bg-light"
          >
            <span>{item.chat}</span>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatBoot;
