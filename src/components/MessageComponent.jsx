import React from "react";
const MessageComponent = ({ message }) => {
  const processedText = message.text
    .replace(/ \* /g, "\n") // Replace single `*` with a new line
    .replace(/\*/g, "")
    .split("**"); // Split on double `**` for bold text
  return (
    <div
      className={`max-w-[80%] p-3 rounded-lg ${
        message.sender === "user"
          ? "bg-blue-600 text-white rounded-br-none"
          : "bg-gray-100 text-gray-800 rounded-bl-none"
      }`}
    >
      {processedText.map((part, i, arr) => (
        <React.Fragment key={i}>
          {i % 2 !== 0 ? (
            <strong>{part}</strong>
          ) : (
            part.split("\n").map((line, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <br />}
                {/^(\s*)(Stop|Day|Tips)/i.test(line) ? (
                  <strong>{line.trim()}</strong>
                ) : (
                  line.trim()
                )}
              </React.Fragment>
            ))
          )}
          {i < arr.length - 1 && <br />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default MessageComponent;
