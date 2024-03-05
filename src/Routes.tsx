import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import CollectionGallery from "./components/CollectionGallery/CollectionGallery";
function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CollectionGallery />}></Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
