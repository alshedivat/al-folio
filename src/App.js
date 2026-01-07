import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

// Import main page components
import { MainPage } from "./Pages/MainPages/MainPage";
// import { AboutPage } from './Pages/MainPages/AboutPage';
import { PeoplePage } from "./Pages/MainPages/PeoplePage";
import { NewsPage } from "./Pages/MainPages/NewsPage";
import { ProjectPage } from "./Pages/MainPages/ProjectPage";
import { PublicationPage } from "./Pages/MainPages/PublicationPage";
import { CoursePage } from "./Pages/MainPages/CoursePage";

// Import project page components
import { HealthAIPage } from "./Pages/ProjectPages/HealthAIPage";
import { CollectivesPage } from "./Pages/ProjectPages/CollectivesPage";
import { AccessibilityPage } from "./Pages/ProjectPages/AccessibilityPage";
import { AlignmentPage } from "./Pages/ProjectPages/AlignmentPage";
import { ResearchPage } from "./Pages/ResearchPages/ResearchPage";

// Import the NotFound component for 404 errors
import { NotFound } from "./Components/NotFound/NotFound";

// Import the ScrollToTop component
import ScrollToTop from "./Util/ScrollToTop";

function App() {
  return (
    <Router>
      {/* ScrollToTop component will reset scroll position on route changes */}
      <ScrollToTop />
      <div className="App">
        <Routes>
          {/* Define all the specific routes */}
          <Route path="/" element={<MainPage />} />
          {/* <Route path='/about' element={<AboutPage/>}/> */}
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/project" element={<ProjectPage />} />
          <Route path="/publication" element={<PublicationPage />} />
          <Route path="/publication/:id" element={<ResearchPage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/project/health-ai" element={<HealthAIPage />} />
          <Route path="/project/collectives" element={<CollectivesPage />} />
          <Route path="/project/accessibility" element={<AccessibilityPage />} />
          <Route path="/project/alignment" element={<AlignmentPage />} />
          
          {/* Catch-all route for 404 errors - must be placed last */}
          <Route path="*" element={<NotFound />} />          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
