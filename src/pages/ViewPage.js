import React, { useState, Fragment } from 'react';
import '../App.css';
import data from '../contact-data.json';
import { nanoid } from 'nanoid';
import View from '../components/view';
import Editable from '../components/editable';
import { Outlet, Link } from "react-router-dom";
import axios from "axios";

const client = axios.create({
    baseURL: "https://6300660834344b6431080190.mockapi.io/api/v1/phoneBook"
});

function ViewPage({ setContacts, contacts }) {

    const [addFormData, setAddFormData] = useState({
        fullName: '',
        phoneNumber: '',
    });

    const [editFormData, setEditFormData] = useState({
        fullName: '',
        phoneNumber: '',
    })

    const [editContactId, setEditContactId] = useState(null);

    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    }

    const handleEditFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);

    }

    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        const newContact = {
            id: nanoid(),
            fullName: addFormData.fullName,
            phoneNumber: addFormData.phoneNumber,
        };

        const newContacts = [...contacts, newContact];
        setContacts(newContacts);
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedContact = {
            id: editContactId,
            fullName: editFormData.fullName,
            phoneNumber: editFormData.phoneNumber,
        };

        const newContacts = [...contacts];

        const index = contacts.findIndex((contacts) => contacts.id === editContactId)

        newContacts[index] = editedContact;

        setContacts(newContacts);

        updateContacts(editedContact.fullName, editedContact.phoneNumber, editContactId);
        setEditContactId(null);
    };

    const handleEditClick = (event, contacts) => {
        event.preventDefault();
        setEditContactId(contacts.id);

        const formValue = {
            fullName: contacts.fullName,
            phoneNumber: contacts.phoneNumber,
        }

        setEditFormData(formValue);

    };

    function updateContacts(fullName, phoneNumber, id) {
        client
            .put(`/${id}`, { fullName, phoneNumber })
            .then(() => {
                alert("Contact updated!");
            });
    }

    const handleCancelClick = () => {
        setEditContactId(null);
    }

    const handleDeleteClick = (contactId) => {
        const newContacts = [...contacts];

        const index = contacts.findIndex((contacts) => contacts.id == contactId);

        newContacts.splice(index, 1);

        setContacts(newContacts);

        deleteContacts(contactId);
    }

    function deleteContacts(id) {
        client
            .delete(`/${id}`)
            .then(() => {
                alert("Contact deleted!");
            });
    }

    return (
        <div className="App">
            <h1> Phonebook App</h1>
            <form onSubmit={handleEditFormSubmit}>
                <Link to="/Add"><button class="btn" type="button">Add Contact</button></Link>
                <br></br><br></br>
                <table>
                    <thead>
                        <tr>
                            {/* <th>Id</th> */}
                            <th>Fullname</th>
                            <th>Phone Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contacts, index) => (
                            <Fragment key={index}>
                                {editContactId === contacts.id ? (
                                    <Editable
                                        editFormData={editFormData}
                                        handleEditFormChange={handleEditFormChange}
                                        handleCancelClick={handleCancelClick}
                                    />
                                ) : (
                                    <View
                                        contacts={contacts}
                                        handleEditClick={handleEditClick}
                                        handleDeleteClick={handleDeleteClick}
                                    />
                                )}
                            </Fragment>

                        ))}
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default ViewPage;