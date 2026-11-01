import { useEffect, useRef, useState } from "react";

function ChatSimulator() {
    const [messages, setMessages] = useState([]);
    const [typing, setTyping] = useState(false);
    const chatEndRef = useRef(null);

    useEffect (() => {
        let typingTimeout; // store timeout reference

        const interval = setInterval (() => {
            setMessages((prev) => [...prev, "It's me."]);
            setTyping(true);

            typingTimeout = setTimeout (() => {
                setTyping(false);
            }, 1000);
        }, 3000);

        return () => {
            clearInterval(interval);
            clearTimeout(typingTimeout);
            console.log("🧹 Cleanup: interval and timeout cleared")
        };
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return(
        <div style={{height: "200px", overflowY: "auto", border: "1px solid black", padding: "10px"}}>
            {messages.map((msg, index) => (
                <p key={index}>{msg}</p>
            ))}
            {typing && <p><em>Someone is typing...</em></p>}
            <div ref={chatEndRef} />
        </div>
        );
}

export default ChatSimulator