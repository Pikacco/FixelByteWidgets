(function() {
  const { useState, useRef, useEffect } = React;

  function FloatingChatFrame() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef(null);

    const conversations = [
      { id: 1, name: "Support", lastMessage: "Salam!" },
      { id: 2, name: "Sales", lastMessage: "Qiymətləri soruşmaq istəyirəm" },
      { id: 3, name: "General", lastMessage: "Salam, necəsiz?" },
    ];

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
      setMessages([...messages, { id: messages.length + 1, text, sender: "user" }]);
    };

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
              { style: { display: "flex", flex: 1 } },
              React.createElement(
                "div",
                { id: "floating-chat-sidebar" },
                conversations.map((room) =>
                  React.createElement(
                    "div",
                    {
                      key: room.id,
                      className: selectedRoom?.id === room.id ? "selected" : "",
                      onClick: () => handleSelectRoom(room)
                    },
                    React.createElement("p", null, room.name),
                    React.createElement("p", null, room.lastMessage)
                  )
                )
              ),
              React.createElement(
                "div",
                { id: "floating-chat-window" },
                React.createElement(
                  "div",
                  { id: "floating-chat-messages", ref: scrollRef },
                  messages.length
                    ? messages.map((msg) =>
                        React.createElement(
                          "div",
                          {
                            key: msg.id,
                            className: "message-bubble " + msg.sender
                          },
                          msg.text
                        )
                      )
                    : React.createElement(
                        "div",
                        { style: { textAlign: "center", color: "#9CA3AF" } },
                        "No messages yet."
                      )
                ),
                selectedRoom &&
                  React.createElement(ChatInput, { onSend: handleSend })
              )
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
        onKeyDown: (e) => { if(e.key==="Enter"&&!e.shiftKey){ e.preventDefault(); handleSend(); } }
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
