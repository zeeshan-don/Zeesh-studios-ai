function Sidebar({
  conversations,
  currentChatId,
  setCurrentChatId,
  createNewChat,
}) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button
          className="new-chat-btn"
          onClick={createNewChat}
        >
          + New Chat
        </button>
      </div>

      <div className="chat-history">
        {conversations.map((chat) => (
          <div
            key={chat.id}
            className={`chat-item ${
              currentChatId === chat.id ? "active" : ""
            }`}
            onClick={() => setCurrentChatId(chat.id)}
          >
            {chat.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;