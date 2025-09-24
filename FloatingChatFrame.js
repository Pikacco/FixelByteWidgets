(function() {
  const { useState, useRef, useEffect } = React;

  function FloatingChatFrame() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef(null);

    const conversations = [
      { id: 1, name: "Support", lastMessage: "Salam!", slug: "support" },
      { id: 2, name: "Sales", lastMessage: "Qiymətləri soruşmaq istəyirəm", slug: "sales" },
      { id: 3, name: "General", lastMessage: "Salam, necəsiz?", slug: "general" },
    ];

    // Avtomatik scroll
    useEffect(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, [messages]);

    const toggleOpen = () => setIsOpen(!isOpen);

    const handleSelectRoom = (room) => {
      setSelectedRoom(room);
      setMessages([{ id: 1, text: "Salam, necə kömək edə bilərəm?", sender: "ai" }]);
    };

    const handleSend = (text) => {
      if (!text.trim()) return;

      const payload = {
        message: text,
        roomSlug: selectedRoom ? selectedRoom.slug : null,
      };
      console.log("Send to backend:", payload);

      setMessages([...messages, { id: messages.length + 1, text, sender: "user" }]);
    };

    const quickMessages = [
      { id: 1, text: "Mənə dəstək lazımdır", room: conversations[0] },
      { id: 2, text: "Qiymətləri soruşmaq istəyirəm", room: conversations[1] },
      { id: 3, text: "Ümumi sualım var", room: conversations[2] },
    ];

    return React.createElement(
      "div",
      { id: "floating-chat-container" },
      isOpen
        ? React.createElement(
            "div",
            { id: "floating-chat-box" },
            React.createElement(
              "div",
              { id: "floating-chat-header" },
              React.createElement("span", null, selectedRoom ? selectedRoom.name : "Chat"),
              React.createElement(
                "button",
                { onClick: toggleOpen },
                "X"
              )
            ),
            React.createElement(
              "div",
              { id: "floating-chat-window", style: { display: "flex", flex: 1, flexDirection: "column" } },
              React.createElement(
                "div",
                { id: "floating-chat-messages", ref: scrollRef },
                selectedRoom
                  ? messages.length
                    ? messages.map((msg) =>
                        React.createElement(
                          "div",
                          { key: msg.id, className: "message-bubble " + msg.sender },
                          msg.text
                        )
                      )
                    : React.createElement(
                        "div",
                        { style: { textAlign: "center", color: "#9CA3AF" } },
                        "No messages yet."
                      )
                  : quickMessages.map((qm) =>
                      React.createElement(
                        "div",
                        {
                          key: qm.id,
                          className: "quick-message",
                          style: { cursor: "pointer", padding: "8px", borderRadius: "8px", background: "#f1f5f9", marginBottom: "6px" },
                          onClick: () => handleSelectRoom(qm.room)
                        },
                        qm.text
                      )
                    )
              ),
              selectedRoom && React.createElement(ChatInput, { onSend: handleSend })
            )
          )
        : React.createElement(
            "button",
            { id: "floating-chat-button", onClick: toggleOpen },
            "💬"
          )
    );
  }

  function ChatInput({ onSend }) {
    const [value, setValue] = useState("");
    const handleSend = () => {
      if (!value.trim()) return;
      onSend(value);
      setValue("");
    };

    return React.createElement(
      "div",
      { id: "floating-chat-input" },
      React.createElement("textarea", {
        rows: 1,
        value,
        placeholder: "Mesajınızı yazın...",
        onChange: (e) => setValue(e.target.value),
        onKeyDown: (e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }
      }),
      React.createElement(
        "button",
        { onClick: handleSend },
        "Send"
      )
    );
  }

  window.FloatingChatFrame = FloatingChatFrame;
})();
