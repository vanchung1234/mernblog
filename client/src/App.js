import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import Auth from './views/Auth';
import Homepage from './views/Homepage';
import ProtectedRoute from './components/routing/ProtectedRoute';
import AuthContextProvider from './contexts/AuthContext';
import PostContextProvider from './contexts/PostContext';
import Myblog from './views/Myblog';
import Write from './views/Write';
import Update from './views/Update';
import DetailPost from './views/DetailPost';
import Setting from './views/Setting';
import About from './views/About';
function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={<Auth authRoute="login" />}
            ></Route>
            <Route
              path="/register"
              element={<Auth authRoute="register" />}
            ></Route>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Homepage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              }
            />
            <Route
              path="/myblog"
              element={
                <ProtectedRoute>
                  <Myblog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/write"
              element={
                <ProtectedRoute>
                  <Write />
                </ProtectedRoute>
              }
            />
            <Route
              path="/updatePost"
              element={
                <ProtectedRoute>
                  <Update />
                </ProtectedRoute>
              }
            />
            <Route
              path="/detail"
              element={
                <ProtectedRoute>
                  <DetailPost />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-setting"
              element={
                <ProtectedRoute>
                  <Setting />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
