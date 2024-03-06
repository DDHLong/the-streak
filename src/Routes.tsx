import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import CollectionsPage from "./pages/CollectionsPage";
import CollectionDetail from "./pages/CollectionDetail";
function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CollectionsPage />}></Route>
        <Route path="/collection/:collectionId" element={<CollectionDetail />}></Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
