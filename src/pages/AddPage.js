import Add from "../components/add";
import React, { useState, Fragment } from 'react';
import '../App.css';
import data from '../contact-data.json';
import { nanoid } from 'nanoid';
import View from '../components/view';
import Editable from '../components/editable';
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


function AddPage({ setContacts, contacts }) {

    const baseURL = "https://6300660834344b6431080190.mockapi.io/api/v1/phoneBook";

    const [addFormData, setAddFormData] = useState({
        fullName: '',
        phoneNumber: '',
    });

    const navigate = useNavigate();

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

    function createPost(fullName, phoneNumber) {
        axios
            .post(baseURL, {
                fullName: fullName,
                phoneNumber: phoneNumber
            })
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

        createPost(
            addFormData.fullName,
            addFormData.phoneNumber,
        );
        navigate("/", { replace: true });
    };



    return (
        <div>
            <Add handleAddFormSubmit={handleAddFormSubmit} handleAddFormChange={handleAddFormChange} />
        </div>
    )
}

export default AddPage;
