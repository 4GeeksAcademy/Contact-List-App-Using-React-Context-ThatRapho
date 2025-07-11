import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContacts } from "../context/ContactsContext.jsx";

const EditContact = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { contacts, editContact } = useContacts();

  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [addressInput, setAddressInput] = useState("");

useEffect(() => {
  console.log("URL id:", id);
  console.log("Contacts:", contacts);
  const contact = contacts.find(c => String(c.id) === String(id));
  console.log("Clicked contact:", contact);
  if (contact) {
    setNameInput(contact.name || "");
    setEmailInput(contact.email || "");
    setPhoneInput(contact.phone || "");
    if (contact.address) {
      const parts = contact.address.split(" ");
      setNumber(parts[0] || "");
      setStreet(parts.slice(1).join(" ") || "");
    }
  }
}, [contacts, id]);



  useEffect(() => {
    setAddressInput(`${number} ${street}`.trim());
  }, [street, number]);

  const handleSave = () => {
    const updatedContact = {
      id,
      name: nameInput,
      email: emailInput,
      phone: phoneInput,
      address: addressInput,
    };
    editContact(id,updatedContact);
    navigate("/");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h1 className="text-center mb-4">Edit Contact</h1>
      <div className="p-4 rounded shadow" style={{ backgroundColor: "#404040" }}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Full Name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter e-mail"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="tel"
            className="form-control"
            placeholder="Enter phone number"
            value={phoneInput}
            onChange={(e) => setPhoneInput(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <div className="row g-2">
            <div className="col-9">
              <input
                type="text"
                className="form-control"
                placeholder="Enter street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
            <div className="col-3">
              <input
                type="text"
                className="form-control"
                placeholder="Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn"
            style={{ backgroundColor: "#C0C0C0" }}
            onClick={handleSave}
          >
            Save Contact
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/")}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditContact;
