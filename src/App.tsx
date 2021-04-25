import { BrowserRouter} from 'react-router-dom';
import styles from './App.module.scss';

import Header from './components/Header';
import Routes from './routes';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Header />
       <Routes />
    </BrowserRouter>
    </div>
  );
}

export default App;
