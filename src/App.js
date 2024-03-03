import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';

import { MainPage } from './Pages/MainPages/MainPage';
// import { AboutPage } from './Pages/MainPages/AboutPage';
import { PeoplePage } from './Pages/MainPages/PeoplePage';
import { ProjectPage } from './Pages/MainPages/ProjectPage';
import { PublicationPage } from './Pages/MainPages/PublicationPage';
import { CoursePage } from './Pages/MainPages/CoursePage';

import { HealthPage } from './Pages/ProjectPages/HealthPage';
import { AIPage } from './Pages/ProjectPages/AIPage';
import { InclusivePage } from './Pages/ProjectPages/InclusivePage';
import { DataPage } from './Pages/ProjectPages/DataPage';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<MainPage/>} />
          {/* <Route path='/about' element={<AboutPage/>}/> */}
          <Route path='/people' element={<PeoplePage/>}/>
          <Route path='/project' element={<ProjectPage/>}/>
          <Route path='/publication' element={<PublicationPage/>}/>
          <Route path='/course' element={<CoursePage/>}/>
          <Route path='/project/health' element={<HealthPage/>}/>
          <Route path='/project/ai' element={<AIPage/>}/>
          <Route path='/project/inclusive' element={<InclusivePage/>}/>
          <Route path='/project/data' element={<DataPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
