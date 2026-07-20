function InputBox({ message, setMessage, sendMessage }) {
  return (
    <div className="input-area">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
        placeholder="Ask anything..."
      />

      <button onClick={sendMessage}>
        ↑
      </button>
    </div>
  );
}

export default InputBox;