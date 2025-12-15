import React, { useState } from 'react';
import { Plus, Calendar, Tag, AlertCircle } from 'lucide-react';
import { Priority } from '../types/todo';
import { motion, AnimatePresence } from 'framer-motion';

interface TodoFormProps {
  onAdd: (text: string, priority: Priority, category: string, dueDate: string | null) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState('Personal');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, priority, category, dueDate || null);
    setText('');
    setPriority('medium');
    setCategory('Personal');
    setDueDate('');
    setIsExpanded(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-8 relative z-10">
      <div className={`
        relative bg-gen-z-surface border-2 border-gen-z-purple/50 rounded-2xl 
        transition-all duration-300 ease-in-out
        ${isExpanded ? 'shadow-[0_0_20px_rgba(157,0,255,0.3)]' : 'shadow-lg'}
      `}>
        <div className="flex items-center p-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="vibes for today? ✨"
            className="flex-1 bg-transparent text-gen-z-text placeholder-gen-z-subtext outline-none px-4 py-3 text-lg font-medium"
          />
          <button
            type="submit"
            className="bg-gen-z-purple hover:bg-gen-z-neon hover:text-black text-white p-3 rounded-xl transition-colors duration-200"
          >
            <Plus size={24} />
          </button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-gen-z-purple/20"
            >
              <div className="p-4 flex flex-wrap gap-4 items-center">
                
                {/* Priority Selection */}
                <div className="flex items-center gap-2">
                  <AlertCircle size={18} className="text-gen-z-subtext" />
                  <div className="flex bg-black/20 rounded-lg p-1">
                    {(['low', 'medium', 'high'] as Priority[]).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPriority(p)}
                        className={`
                          px-3 py-1 rounded-md text-sm capitalize transition-colors
                          ${priority === p 
                            ? (p === 'high' ? 'bg-red-500 text-white' : p === 'medium' ? 'bg-yellow-500 text-black' : 'bg-green-500 text-white')
                            : 'text-gen-z-subtext hover:text-white'}
                        `}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Due Date */}
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-gen-z-subtext" />
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="bg-black/20 text-gen-z-text rounded-lg px-3 py-1 text-sm outline-none focus:ring-1 focus:ring-gen-z-purple"
                  />
                </div>

                {/* Category */}
                <div className="flex items-center gap-2">
                  <Tag size={18} className="text-gen-z-subtext" />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-black/20 text-gen-z-text rounded-lg px-3 py-1 text-sm outline-none focus:ring-1 focus:ring-gen-z-purple"
                  >
                    <option value="Personal">Personal 🏠</option>
                    <option value="School">School 📚</option>
                    <option value="Work">Work 💼</option>
                    <option value="Social">Social 🕺</option>
                    <option value="Health">Health 💪</option>
                  </select>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
};

export default TodoForm;
