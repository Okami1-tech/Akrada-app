import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ color: 'white', padding: 40 }}>
              App is working — no auth layer
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
