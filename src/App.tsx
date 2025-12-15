import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Todo, Priority, Filter } from './types/todo';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import FilterBar from './components/FilterBar';
import { AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('gen-z-todos', []);
  const [filter, setFilter] = useState<Filter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const addTodo = (text: string, priority: Priority, category: string, dueDate: string | null) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      priority,
      category,
      dueDate,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const filteredTodos = todos.filter((t) => {
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'active' ? !t.completed :
      t.completed;
    
    const matchesSearch = t.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gen-z-black text-gen-z-text p-4 sm:p-8 font-sans selection:bg-gen-z-neon selection:text-black">
      <div className="max-w-2xl mx-auto">
        <header className="mb-10 pt-8 text-center">
          <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-gen-z-purple/10 border border-gen-z-purple/30 text-gen-z-purple text-xs font-bold uppercase tracking-wider">
            <Sparkles size={12} />
            <span>Productivity Era</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gen-z-purple via-gen-z-pink to-gen-z-neon">
            Main Character Energy
          </h1>
          <p className="text-gen-z-subtext text-lg">
            Don't let your dreams be memes. Just do it.
          </p>
        </header>

        <TodoForm onAdd={addTodo} />

        <FilterBar 
          currentFilter={filter} 
          onFilterChange={setFilter} 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          itemCount={filteredTodos.length} 
        />

        <div className="space-y-4">
          <AnimatePresence mode='popLayout'>
            {filteredTodos.length > 0 ? (
              filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              ))
            ) : (
              <div className="text-center py-12 text-gen-z-subtext opacity-50">
                {searchQuery 
                  ? "No vibes found matching that 🧐" 
                  : filter === 'completed' 
                    ? "No W's yet bestie 📉" 
                    : filter === 'active' 
                      ? "Nothing to do? Touch grass 🌱" 
                      : "Empty head no thoughts 🧠"}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;
