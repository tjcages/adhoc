import AppContainer from './AppContainer'
import { BrowserRouter as Router, withRouter } from "react-router-dom";

function App() {
  return (
    <Router>
      <AppContainer />
    </Router>
  );
}

export default withRouter(App);
