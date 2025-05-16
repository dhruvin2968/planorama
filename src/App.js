import './App.css'
import { AllRoutes } from './routes/AllRoutes';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BrowserRouter } from 'react-router-dom';

import { ScrollToTop } from './components/ScrollToTop';
function App() {
 return (   
   <div className="bg-Bluee dark:bg-gray-950">
     <BrowserRouter>
     <ScrollToTop />
     <Header/>
     <AllRoutes/>
     <Footer/>
     </BrowserRouter>
   </div>
 )
}

export default App;

