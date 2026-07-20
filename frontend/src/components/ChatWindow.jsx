import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

function ChatWindow({ messages, loading }) {

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
    behavior: loading ? "auto" : "smooth",
});
  }, [messages, loading]);

  return (
    <div className="chat-box">

      {messages.length === 0 ? (

        <div className="welcome">
          <h2>Hello, how can I help you today?</h2>
        </div>

      ) : (

        <>
          {messages.map((msg, index) => (
            <MessageBubble
              key={index}
              sender={msg.sender}
              text={msg.text}
            />
          ))}

          {loading && (
            <MessageBubble
              sender="ai"
              text="Typing..."
            />
          )}
        </>

      )}

      <div ref={bottomRef}></div>

    </div>
  );
}

export default ChatWindow;