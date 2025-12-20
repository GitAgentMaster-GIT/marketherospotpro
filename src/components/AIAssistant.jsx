import { X, Send, Sparkles } from 'lucide-react';
import { useState } from 'react';

function AIAssistant({ onClose }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your Marketing Hero AI assistant. I am here to help you create winning campaigns, optimize conversions, and guide you to success! What would you like to accomplish today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Great question! Based on your campaign data, I recommend focusing on...[This would be connected to actual AI in production]'
      }]);
    }, 1000);
  };

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl border-l border-gray-200 flex flex-col z-50">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-primary-600 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={20} />
            <h3 className="font-bold">AI Assistant</h3>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded">
            <X size={20} />
          </button>
        </div>
        <p className="text-sm text-blue-100 mt-1">Your growth-oriented marketing guide</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg ${
              msg.role === 'user'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-900'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1 input-field"
          />
          <button
            onClick={handleSend}
            className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIAssistant;




