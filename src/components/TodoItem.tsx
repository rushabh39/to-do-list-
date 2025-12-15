import React from 'react';
import { Todo } from '../types/todo';
import { Check, Trash2, Calendar, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const priorityColors = {
    low: 'border-green-500/50 hover:border-green-500',
    medium: 'border-yellow-500/50 hover:border-yellow-500',
    high: 'border-red-500/50 hover:border-red-500',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={cn(
        "group relative flex items-center gap-4 p-4 rounded-xl bg-gen-z-surface border-2 transition-all duration-200 mb-3",
        priorityColors[todo.priority],
        todo.completed ? "opacity-60 grayscale" : "hover:scale-[1.01] hover:shadow-[0_0_15px_rgba(0,0,0,0.3)]"
      )}
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={cn(
          "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors",
          todo.completed
            ? "bg-gen-z-neon border-gen-z-neon text-black"
            : "border-gen-z-subtext hover:border-gen-z-neon"
        )}
      >
        {todo.completed && <Check size={16} strokeWidth={3} />}
      </button>

      <div className="flex-1 min-w-0">
        <p className={cn(
          "text-lg font-medium truncate transition-all",
          todo.completed ? "line-through text-gen-z-subtext" : "text-gen-z-text"
        )}>
          {todo.text}
        </p>
        <div className="flex items-center gap-3 text-xs text-gen-z-subtext mt-1">
          <span className="flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded-md">
            <Tag size={12} />
            {todo.category}
          </span>
          {todo.dueDate && (
            <span className={cn(
              "flex items-center gap-1 px-2 py-0.5 rounded-md",
              new Date(todo.dueDate) < new Date() && !todo.completed ? "text-red-400 bg-red-400/10" : "bg-black/20"
            )}>
              <Calendar size={12} />
              {new Date(todo.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-gen-z-subtext hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
      >
        <Trash2 size={20} />
      </button>
    </motion.div>
  );
};

export default TodoItem;
