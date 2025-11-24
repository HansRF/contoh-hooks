import {
  useState,
  useEffect,
  useContext,
  useRef,
  useReducer,
  useMemo,
  createContext,
} from "react";

// ---------- Context Global ----------
const ThemeContext = createContext();

// ---------- Reducer untuk counter ----------
function reducer(state, action) {
  switch (action.type) {
    case "tambah":
      return { count: state.count + 1 };
    case "kurang":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

export default function App() {
  const [theme, setTheme] = useState("light"); // <- state untuk tema
  const [text, setText] = useState("");

  const [state, dispatch] = useReducer(reducer, { count: 0 });
  const inputRef = useRef();

  useEffect(() => {
    console.log("Komponen dirender || count berubah");
  }, [state.count]);

  const hasilPerhitungan = useMemo(() => {
    console.log("Perhitungan berat dijalankan...");
    return state.count * 100;
  }, [state.count]);

  // Function toggle tema
  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={theme}>
      <Content
        text={text}
        setText={setText}
        inputRef={inputRef}
        state={state}
        dispatch={dispatch}
        hasilPerhitungan={hasilPerhitungan}
        toggleTheme={toggleTheme}
      />
    </ThemeContext.Provider>
  );
}

function Content({
  text,
  setText,
  inputRef,
  state,
  dispatch,
  hasilPerhitungan,
  toggleTheme,
}) {
  const theme = useContext(ThemeContext); // Mengambil nilai dari Context

  return (
    <div
      style={{
        background: theme === "light" ? "#f2f2f2" : "#222",
        color: theme === "light" ? "#000" : "#fff",
        padding: 20,
        borderRadius: 10,
        maxWidth: 300,
        margin: "auto",
      }}
    >
      <h2>Contoh Penggunaan 6 Hooks React</h2>

      {/* useState */}
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Tulis sesuatu..."
      />
      <button
        onClick={() => inputRef.current.focus()}
        style={{ marginLeft: 8 }}
      >
        Fokus Input
      </button>

      <p>Teks yang diketik: {text}</p>

      {/* useReducer */}
      <h3>Counter: {state.count}</h3>
      <button onClick={() => dispatch({ type: "tambah" })}>+</button>
      <button
        onClick={() => dispatch({ type: "kurang" })}
        style={{ marginLeft: 8 }}
      >
        -
      </button>

      {/* useMemo */}
      <p>Hasil Perhitungan Berat (count x 100): {hasilPerhitungan}</p>

      {/* useContext */}
      <p>Tema aktif: {theme}</p>
      <button onClick={toggleTheme}>Ganti Tema</button>
    </div>
  );
}
