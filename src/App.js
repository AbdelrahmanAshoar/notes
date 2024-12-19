import "./App.css";
import AppBody from "./Components/AppBody";
import { SectionProvider } from "./Components/sectionsContext";
import TasksProvider from "./Components/TasksContext";
export default function App() {
  return (
    <div className="App">
      <SectionProvider>
        <TasksProvider>
          <AppBody />
        </TasksProvider>
      </SectionProvider>
    </div>
  );
}
