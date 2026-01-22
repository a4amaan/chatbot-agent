import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const ChatPage: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState<{ user: string; bot: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const sendMessage = async () => {
    if (!question.trim()) return;
    const userMessage = question;
    setQuestion("");

    try {
      const res = await axios.post("http://127.0.0.1:8000/chat", { message: userMessage });
      const botMessage = res.data.response;

      setChatHistory((prev) => [...prev, { user: userMessage, bot: botMessage }]);
    } catch (err) {
      console.error(err);
      setChatHistory((prev) => [
        ...prev,
        { user: userMessage, bot: "Error: Could not get response from server." },
      ]);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>
      <div style={{ width: "250px", backgroundColor: "#f6f8fa", padding: "20px" }}>
        <h2>ChatBot</h2>
        <button style={{ width: "100%", padding: "10px", marginTop: "20px" }}>New Chat</button>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px" }}>
        <div style={{ flex: 1, overflowY: "auto", marginBottom: "10px" }}>
          {chatHistory.map((chat, idx) => (
            <div key={idx} style={{ marginBottom: "15px" }}>
              <div style={{ fontWeight: "bold" }}>You:</div>
              <div style={{ backgroundColor: "#e1f5fe", padding: "10px", borderRadius: "5px" }}>
                {chat.user}
              </div>
              <div style={{ fontWeight: "bold" }}>Bot:</div>
              <div style={{ backgroundColor: "#f6f8fa", padding: "10px", borderRadius: "5px" }}>
                <ReactMarkdown>{chat.bot}</ReactMarkdown>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={2}
            style={{ flex: 1, padding: "10px", fontSize: "14px", borderRadius: "5px" }}
            placeholder="Type your question..."
          />
          <button
            onClick={sendMessage}
            style={{ padding: "10px 20px", borderRadius: "5px", backgroundColor: "#4a90e2", color: "white" }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
