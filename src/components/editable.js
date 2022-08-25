import React from "react"

function Editable({ editFormData, handleEditFormChange, handleCancelClick }) {
    return (
        <tr>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Name.."
                    name="fullName"
                    onChange={handleEditFormChange}
                    value={editFormData.fullName}
                >

                </input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="PhoneNo.."
                    name="phoneNumber"
                    onChange={handleEditFormChange}
                    value={editFormData.phoneNumber}
                >

                </input>
            </td>
            <td>
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </td>
        </tr>
    )
}

export default Editable;