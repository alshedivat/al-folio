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
import { HealthPage } from "./Pages/ProjectPages/HealthPage";
import { AIPage } from "./Pages/ProjectPages/AIPage";
import { InclusivePage } from "./Pages/ProjectPages/InclusivePage";
import { DataPage } from "./Pages/ProjectPages/DataPage";
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
          <Route path="/project/health" element={<HealthPage />} />
          <Route path="/project/ai" element={<AIPage />} />
          <Route path="/project/inclusive" element={<InclusivePage />} />
          <Route path="/project/data" element={<DataPage />} />
          
          {/* Catch-all route for 404 errors - must be placed last */}
          <Route path="*" element={<NotFound />} />          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
