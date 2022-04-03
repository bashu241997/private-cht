import React from "react";
import "./index.css";
import Chat from "./Chat";
import Join from "./Join";

import { BrowserRouter as Router, Route ,Routes} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Join />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
};

export default App;
