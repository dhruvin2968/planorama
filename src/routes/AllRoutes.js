import { Routes, Route } from "react-router-dom";
import {
  Home,
  PageNotFound,
  UserDashboard,
  AboutPage,
  FAQ,
  Contact,
  Destination,
  PackingCheckList,
  CurrencyConverter,
  Gallery,
  Planner,
  BudgetTracker,
  Phrases,
  Mood,
  ItineraryGenerator,
  ChatDashboard,
} from "../pages";
export const AllRoutes = () => {
  return (
    <div className="">
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="mydashboard" element={<UserDashboard />} />
        <Route path="faqs" element={<FAQ />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="destination" element={<Destination />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="budgettracker" element={<BudgetTracker />} />
        <Route path="currency" element={<CurrencyConverter />} />
        <Route path="planner" element={<Planner />} />
        <Route path="packing" element={<PackingCheckList />} />
        <Route path="phrases" element={<Phrases />} />
        <Route path="mood" element={<Mood />} />
        <Route path="itinerarygenerator" element={<ItineraryGenerator />} />
        <Route path="chat" element={<ChatDashboard />} />
      </Routes>
    </div>
  );
};
