import './App.css'
import { AllRoutes } from './routes/AllRoutes';
import { Headerr } from './components/Headerr';
import { Footer } from './components/Footer';
import { BrowserRouter } from 'react-router-dom';

import { ScrollToTop } from './components/ScrollToTop';
function App() {
 return (   
   <div className="bg-Bluee">
     <BrowserRouter>
     <ScrollToTop />
     <Headerr/>
     <AllRoutes/>
     <Footer/>
     </BrowserRouter>
   </div>
 )
}

export default App;

