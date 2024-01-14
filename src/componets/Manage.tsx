import React from "react";

export const Manage = () => {
  return (
    <main>
      <form>
        <h1>Add New Employee</h1>
        <div className="formContainer">
          <label>Employee Name:</label>
          <br />

          <input className="ipFirst" type="text" placeholder="First Name" />
          <input className="ipSecond" type="text" placeholder="Last Name" />
          <br />
          <input type="text" id="lname" name="lname" />
        </div>
      </form>
    </main>
  );
};
