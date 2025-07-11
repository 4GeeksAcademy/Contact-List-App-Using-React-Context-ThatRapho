import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contacts from "../pages/Contacts";
import AddContact from "../pages/AddContact";
import EditContact from "../pages/EditContact";
import Error404 from "../pages/404";
import { ContactsProvider } from "../context/ContactsContext";
import ViewContact from "../pages/ViewContact"

const Layout = () => {
  return (
      <ContactsProvider>
        <Routes>
          <Route path="/" element={<Contacts />} />
          <Route path="/newcontact" element={<AddContact />} />
          <Route path="/editcontact/:id" element={<EditContact />} />
          <Route path="/viewcontact/:id" element={<ViewContact />} />
          <Route
            path="*"
            element={
              <Error404 baseIntensity={0.2} hoverIntensity={0.5} enableHover={false}>
                404
              </Error404>
            }
          />
        </Routes>
      </ContactsProvider>
  );
};

export default Layout;
