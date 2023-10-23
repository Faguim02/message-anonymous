import './App.css'
import { firebaseConfig } from './service/firebaseConfig'
import { initializeApp } from "firebase/app";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PanelComments from './pages/PanelComments';
import CreateComment from './pages/CreateComment';

function App() {

  const app = initializeApp(firebaseConfig);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PanelComments app={app}/>}/>
        <Route path='/newMessage' element={<CreateComment app={app}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
