import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContacts } from "../context/ContactsContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faLocationDot, faPhone, faEnvelope, faPen, faEye } from "@fortawesome/free-solid-svg-icons";

const Contacts = () => {
  const navigate = useNavigate();
  const [contactToDelete, setContactToDelete] = useState(null);
  const {
    contacts,
    deleteContact,
    fetchContacts,
  } = useContacts();

  return (
    <div className="container text-center">
      <div className="navbar navbar-light d-flex justify-content-end mb-4">
        <button
          type="button"
          className="btn"
          style={{ backgroundColor: "#C0C0C0" }}
          onClick={() => navigate("/newcontact")}
        >
          Add new contact
        </button>
      </div>

      <h1>Contacts</h1>

      <div className="row justify-content-center">
        {contacts && contacts.length > 0 ? (
          contacts.map((entry, index) => {
            const randomImg = Math.floor(Math.random() * 8) + 1;
            const imgSrc = `src/assets/img/${randomImg}.jpg`;

            return (
              <div key={index} className="col-md-4 d-flex">
                <div className="card mb-4 w-100" style={{ backgroundColor: "#474747", color: "#E0E0E0" }}>
                  <div className="card-body d-flex align-items-center">
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        flexShrink: 0,
                        marginRight: "1rem",
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
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h5 className="card-title mb-3" style={{ color: "#F5F5F5" }}>{entry.name}</h5>
                      <p className="card-text text-start ps-3 mb-1">
                        <FontAwesomeIcon icon={faLocationDot} className="me-2" />{entry.address}
                      </p>
                      <p className="card-text text-start ps-3 mb-1">
                        <FontAwesomeIcon icon={faPhone} className="me-2" />{entry.phone}
                      </p>
                      <p className="card-text text-start ps-3 mb-1">
                        <FontAwesomeIcon icon={faEnvelope} className="me-2" />{entry.email}
                      </p>
                    </div>
                  </div>
                  <div className="card-footer text-body-secondary text-end" style={{ backgroundColor: "#2B2B2B", borderTop: "1px solid #3A3A3A" }}>
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={() => navigate(`/viewcontact/${entry.id}`)}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={() => navigate(`/editcontact/${entry.id}`)}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#deletionModal"
                      onClick={() => setContactToDelete(entry.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="mt-3">
            <img src="src/assets/img/sadguy.png" className="w-25" />
            <p>No contacts available. Try adding some?</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <div className="modal fade" id="deletionModal" tabIndex="-1" aria-labelledby="deletionModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="deletionModalLabel">Confirm Deletion</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body text-start" id="modalText">
              <p>Are you sure you want to delete this contact?</p>
              <p>This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={async () => {
                  await deleteContact(contactToDelete);
                  setContactToDelete(null);
                }}
                data-bs-dismiss="modal"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
