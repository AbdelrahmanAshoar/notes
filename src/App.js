import "./App.css";
import AppBody from "./Components/AppBody";
import { SectionProvider } from "./Components/sectionsContext";
import TasksProvider from "./Components/TasksContext";
import { AlertProvider } from "./Components/AlertProvider";
export default function App() {
  return (
    <div className="App">
      <SectionProvider>
        <TasksProvider>
          <AlertProvider>
            <AppBody />
          </AlertProvider>
        </TasksProvider>
      </SectionProvider>
    </div>
  );
}
