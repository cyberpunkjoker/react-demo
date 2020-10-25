import { BrowserRouter as Router, Route } from 'react-router-dom'

import Antd from './view/demo/antd'

import 'antd/dist/antd.css'

function App() {
  return (
      <Router>
          <Route path="/" component={Antd}></Route>
      </Router>
  );
}

export default App;
