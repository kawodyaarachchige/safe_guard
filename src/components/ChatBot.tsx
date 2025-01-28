import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { MessageCircleMore, Send, X} from "lucide-react";

const ChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [isHovered, setIsHovered] = useState(false);
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const apiKey = "AIzaSyAoxY1EN-VOGVQlXtvJdEUKstsBGwOnQqg"; // Replace with your API key

    const toggleChat = () => setIsOpen(!isOpen);

    const sendMessage = async () => {
        if (!prompt.trim()) return;

        const userMessage = { sender: "You", text: prompt };
        setMessages((prev) => [...prev, userMessage]);

        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(prompt);

            const aiMessage = { sender: "AI", text: result.response.text() };
            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage = { sender: "AI", text: "Something went wrong. Please try again." };
            setMessages((prev) => [...prev, errorMessage]);
        }

        setPrompt("");
    };

    return (
        <>
            {/* Floating Icon */}
            <div
                onClick={toggleChat}
                style={{
                    position: "fixed",
                    bottom: "200px",
                    right: "20px",
                    width: "70px",
                    height: "70px",
                    backgroundColor: "#ef67d8",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    cursor: "pointer",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
            >
                <MessageCircleMore />
            </div>

            {/* Chat Popup */}
            {isOpen && (
                <div
                    style={{
                        position: "fixed",
                        bottom: "80px",
                        right: "20px",
                        width: "380px",
                        height: "500px",
                        backgroundColor: "white",
                        borderRadius: "10px",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
                        zIndex: 1000,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            padding: "10px",
                            textAlign: "center",
                            fontWeight: "bold",
                        }}
                    >
                        safeGuard chat
                        <span
                            onClick={toggleChat}
                            style={{
                                position: "absolute",
                                right: "10px",
                                top: "10px",
                                cursor: "pointer",
                            }}
                        >
              <X />
            </span>
                    </div>

                    {/* Chat Pane */}
                    <div
                        style={{
                            flex: 1,
                            padding: "10px",
                            overflowY: "auto",
                            backgroundColor: "#f8f9fa",
                        }}
                    >
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                style={{
                                    textAlign: msg.sender === "You" ? "right" : "left",
                                    marginBottom: "10px",
                                }}
                            >
                                {/*<strong>{msg.sender}:</strong>*/}
                                <p
                                    style={{
                                        display: "inline-block",
                                        padding: "8px",
                                        borderRadius: "8px",
                                        backgroundColor: msg.sender === "You" ? "#d1ecf1" : "#e2e3e5",
                                        margin: "5px 0",
                                    }}
                                >
                                    {msg.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Input Box */}
                    <div
                        style={{
                            padding: "10px",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Type a message..."
                            style={{
                                flex: 1,
                                padding: "8px",
                                borderRadius: "8px",
                                border: isHovered ? "1px solid #007bff" : "1px solid #ddd",
                                transition: "border-color 0.2s ease-in-out",
                            }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <button
                            onClick={sendMessage}
                            style={{
                                marginLeft: "10px",
                                padding: "8px 12px",
                                backgroundColor: "#007bff",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                        >
                            <Send />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBot;