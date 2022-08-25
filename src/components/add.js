import React from "react"

function Add({ handleAddFormSubmit, handleAddFormChange }) {
    return (
        <div>
            <h1> Add a Contact </h1>

            <form class="form1" onSubmit={handleAddFormSubmit}>
                <p>Enter New Name</p>
                <input style={{ display: "flex" }}
                    type="text"
                    name="fullName"
                    required="required"
                    placeholder="Enter New fullName.."
                    onChange={handleAddFormChange}
                />
                <br></br> <br></br>
                <p>Enter New PhoneNumber</p>
                <input
                    type="text"
                    name="phoneNumber"
                    required="required"
                    placeholder="Enter New phoneNumber.."
                    onChange={handleAddFormChange}
                />

                <br></br> <br></br>
                <button class="btn" type="submit">Add New Contact</button>
            </form>
        </div>
    )
}

export default Add;