import React from "react"

function View({ contacts, handleEditClick, handleDeleteClick }) {
    return (
        <tr>
            <td>{contacts.fullName}</td>
            <td>{contacts.phoneNumber}</td>
            <td>
                <button type="button" onClick={(event) => handleEditClick(event, contacts)}>
                    Edit
                </button>
                <button type="button" onClick={(event) => handleDeleteClick(contacts.id)}>Delete</button>
            </td>
        </tr>

    )
}

export default View;