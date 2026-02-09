import { useState, useEffect } from "react";
function createTask(title) {
  return {
    id: crypto.randomUUID(),
    title: title,
    completed: false,
    createdAt: Date.now(),
  };
}
function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("todo-plus-plus");
    if (!saved) {
      return [
        createTask("Learn React state"),
        createTask("Build Todo++"),
        createTask("Understand debouncing"),
      ];
    }

    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    localStorage.setItem("todo-plus-plus", JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);
  useEffect(() => {
    setLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      const shouldFail = false;

      if (shouldFail) {
        setError("Failed to load tasks");
        setLoading(false);
        return;
      }

      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  function addTask(title) {
    const trimmed = title.trim();
    if (!trimmed) return;
    setTasks(prev => [...prev, createTask(trimmed)]);
  }
  function toggleTask(id) {
    setTasks(prev => prev.map(task => task.id === id ? { ...task, completed: !task.completed }
      : task
    ));
  }
  function deleteTask(id) {
    setTasks(prev => prev.filter(task => task.id !== id));
  }
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  if (loading == true)
    return (
      <div>
        <h1>Loading...</h1>
      </div>);
  else if (error)
    return (
      <div>
        <h1>{error}</h1>
      </div>);
  else {
    return (
      <div>
        <h1>Todo++</h1>
        <input type="text"
          id="input-box"
          placeholder="Add a new Task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              addTask(inputValue);
              setInputValue("");
            }
          }} />
        <button onClick={() => {
          addTask(inputValue);
          setInputValue("");
        }}>
          Add
        </button>
        <br></br>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <ul>
          {filteredTasks.map(task => (
            <li key={task.id}>
              <span onClick={() => toggleTask(task.id)}
                style={{
                  cursor: "pointer",
                  textDecoration: task.completed ? "line-through" : "none"
                }}
              >{task.title}</span>
              <button onClick={() => deleteTask(task.id)}>X</button>
            </li>
          ))}
        </ul>
      </div >
    );
  }
}

export default App;

