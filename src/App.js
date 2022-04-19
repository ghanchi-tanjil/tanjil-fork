import './App.css';
import React ,{useState} from 'react';

import ChangeTheme from './component/changeTheme';
import ProductForm from './component/productForm';
import GetProducts from './component/getProducts';
import { isEqual } from 'lodash';

function App() {

  const [theme, setTheme] = useState("light");

  const updateTheme = (themeSelection) => {
    return setTheme(themeSelection);
  };

  return (
    <div className={isEqual(theme,"light")? "appDefault" : "app"}>
      <ChangeTheme updateTheme={updateTheme} />
      <ProductForm/>

      <GetProducts/>
    </div>
  );
}

export default App;
