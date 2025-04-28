
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, ArrowRight } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface ChatInterfaceProps {
  onComplete?: () => void;
}

export default function ChatInterface({ onComplete }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi there! 👋 Welcome to Talk Team Thrive, where we help students master professional communication skills. Tell me a bit about yourself to get started!",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasResponded, setHasResponded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setHasResponded(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(input),
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (userInput: string): string => {
    // Simple response logic - can be enhanced later
    if (userInput.toLowerCase().includes("hello") || userInput.toLowerCase().includes("hi")) {
      return "Great to meet you! Ready to start improving your communication skills? Let's create your account to continue.";
    }
    if (userInput.toLowerCase().includes("help") || userInput.toLowerCase().includes("confused")) {
      return "No worries! Just share a brief introduction about yourself or what you'd like to achieve with your communication skills. This helps us personalize your experience.";
    }
    return "Thanks for sharing! To start your networking journey and skill development, let's get your account set up. Click 'Continue' below to register.";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const handleContinue = () => {
    if (onComplete) {
      onComplete();
    } else {
      navigate("/auth");
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[500px] max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 animate-fade-in">
      <div className="bg-brand-primary text-white p-4">
        <h3 className="text-lg font-semibold">Talk Team Thrive</h3>
        <p className="text-sm opacity-90">Communication Skills Development</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-2 flex flex-col">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-bubble ${msg.sender === "ai" ? "ai" : "user"}`}
          >
            <p>{msg.text}</p>
            <span className="text-xs opacity-70 block mt-1">
              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
        
        {isTyping && (
          <div className="chat-bubble ai">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t border-gray-200 p-3">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!input.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
        
        {hasResponded && (
          <div className="mt-3 text-center">
            <Button 
              variant="outline" 
              onClick={handleContinue}
              className="w-full border-brand-primary text-brand-primary hover:bg-brand-light"
            >
              Continue to registration <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
