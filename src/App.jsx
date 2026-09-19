import { Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import ListingDetailPage from './pages/ListingDetailPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import WishlistPage from './pages/WishlistPage.jsx';
import TripsPage from './pages/TripsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import RequireAuth from './features/auth/RequireAuth.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/listing/:id" element={<ListingDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/wishlist" element={<RequireAuth><WishlistPage /></RequireAuth>} />
        <Route path="/trips" element={<RequireAuth><TripsPage /></RequireAuth>} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
