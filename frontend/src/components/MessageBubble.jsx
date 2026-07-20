import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function MessageBubble({ sender, text }) {
  return (
    <div className={`message ${sender}`}>
      <div className="message-label">
        {sender === "user" ? "👤 You" : "Zeesh Studios AI"}
      </div>

      <div className="message-bubble">
       <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    code({ inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");

      return !inline && match ? (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  }}
>
  {text}
</ReactMarkdown>
      </div>
    </div>
  );
}

export default MessageBubble;