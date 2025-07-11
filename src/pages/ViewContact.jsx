import { useParams, useNavigate } from "react-router-dom";
import { useContacts } from "../context/ContactsContext.jsx";
import { useEffect, useState } from "react";
import img1 from "../assets/img/1.jpg";
import img2 from "../assets/img/2.jpg";
import img3 from "../assets/img/3.jpg";
import img4 from "../assets/img/4.jpg";
import img5 from "../assets/img/5.jpg";
import img6 from "../assets/img/6.jpg";
import img7 from "../assets/img/7.jpg";
import img8 from "../assets/img/8.jpg";

const ViewContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
    const { contacts } = useContacts();
    const imgArray = [img1, img2, img3, img4, img5, img6, img7, img8];
    const imgSrc = imgArray[Math.floor(Math.random() * imgArray.length)];

  const [contact, setContact] = useState(null);

  useEffect(() => {
    const found = contacts.find(c => String(c.id) === String(id));
    setContact(found || null);
  }, [contacts, id]);

  if (!contact) {
    return <p className="text-center mt-5">Contact not found.</p>;
  }

  return (
    <div className="container mt-5 w-75">
      <div className="card shadow" style={{ backgroundColor: "#474747", color: "#E0E0E0" }}>
        <div className="card-header">
          <h3 className="ms-5">{contact.name}</h3>
              </div>
              <div className="card-body d-flex">
                  <div
                      style={{
                          width: "20%",
                          height: "2'%",
                          flexShrink: 0,
                          marginRight: "5rem",
                          borderRadius: "50%",
                          overflow: "hidden",
                      }}
                  >
                      <img
                          src={imgSrc}
                          alt="Contact"
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                  </div>
                    <div className="d-flex flex-column justify-content-evenly">
          <p><strong>Email:</strong> {contact.email}</p>
          <p><strong>Phone:</strong> {contact.phone}</p>
          <p><strong>Address:</strong> {contact.address}</p>
          </div>
        </div>
        <div className="card-footer text-end">
          <button 
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewContact;
