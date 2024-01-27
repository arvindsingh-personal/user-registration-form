import { Provider } from 'react-redux';
import './App.css';
import UserDetails from './Pages/MUI_Formik/UserDetails';
import UserTable from './Pages/MUI_Formik/UserTable';
import FormComponent from './Pages/UseFormWork';
import store from './redux/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <FormComponent />
      </Provider>
    </div>
  );
}

export default App;
