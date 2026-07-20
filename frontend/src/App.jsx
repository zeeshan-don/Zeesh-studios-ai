import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";

import logo from "./assets/zeesh-logo.png";

import ChatWindow from "./components/ChatWindow";
import InputBox from "./components/InputBox";

function App() {
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState([
    {
      id: 1,
      title: "New Conversation",
      messages: [],
    },
  ]);
  const [currentChatId, setCurrentChatId] = useState(1);
  const [loading, setLoading] = useState(false);

  // Messages for the chat currently being viewed
  const currentChat = conversations.find((c) => c.id === currentChatId);
  const chat = currentChat ? currentChat.messages : [];

  function createNewChat() {
    const newChat = {
      id: Date.now(),
      title: "New Conversation",
      messages: [],
    };

    setConversations((prev) => [...prev, newChat]);
    setCurrentChatId(newChat.id);
  }

  // Helper to update messages for whichever chat id we're targeting
  function updateChatMessages(chatId, updaterFn) {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === chatId ? { ...c, messages: updaterFn(c.messages) } : c
      )
    );
  }
  const currentConversation = conversations.find(
  (chat) => chat.id === currentChatId
);

  async function sendMessage() {
    if (!message.trim()) return;

    const userMessage = message;
    const chatId = currentChatId;
    setConversations((prev) =>
  prev.map((chat) =>
    chat.id === chatId && chat.title === "New Conversation"
      ? {
          ...chat,
          title:
            userMessage.length > 30
              ? userMessage.slice(0, 30) + "..."
              : userMessage,
        }
      : chat
  )
);

    // Add user message + empty AI message placeholder
    updateChatMessages(chatId, (prevMessages) => [
      ...prevMessages,
      {
        sender: "user",
        text: userMessage,
      },
      {
        sender: "ai",
        text: "",
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/chat?message=" + encodeURIComponent(userMessage)
      );

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let fullResponse = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        fullResponse += decoder.decode(value, { stream: true });

        updateChatMessages(chatId, (prevMessages) => {
          const updated = [...prevMessages];
          updated[updated.length - 1] = {
            sender: "ai",
            text: fullResponse,
          };
          return updated;
        });
      }
    } catch (err) {
      console.error("Failed to get response:", err);
      updateChatMessages(chatId, (prevMessages) => {
        const updated = [...prevMessages];
        updated[updated.length - 1] = {
          sender: "ai",
          text: "Sorry, something went wrong. Please try again.",
        };
        return updated;
      });
    }

    setLoading(false);
  }

  return (
    <div className="app">
      <Sidebar
        conversations={conversations}
        currentChatId={currentChatId}
        setCurrentChatId={setCurrentChatId}
        createNewChat={createNewChat}
      />

      {/* Main Content */}
      <div className="main-content">
        <div className="container">
          <h1 className="title">
            <img src={logo} alt="Zeesh Studios Logo" className="logo" />
            <span>Zeesh Studios AI</span>
          </h1>

          <ChatWindow
    messages={currentConversation.messages}
    loading={loading}
/>

          <InputBox
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
