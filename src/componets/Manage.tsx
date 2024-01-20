import React from "react";

export const Manage = () => {
  return (
    <main className="main-manage">
      <h1>Add New Employee</h1>
      <form>
        <label>Employee Name:</label>
        <input type="text" className="input-first" placeholder="First Name" />
        <input type="text" className="input-second" placeholder="Last Name" />
        <label>Date of Birth:</label>
        <input type="text" className="input" placeholder="YYYY-MM-DD" />
        <label>Employee Adress:</label>
        <input type="text" className="input-inrow" placeholder="Address" />
        <input type="text" className="input-inrow" placeholder="City" />
        <input type="text" className="input-inrow" placeholder="Postal Code" />
        <label>Salary:</label>
        <input type="text" className="input" />
        <label>Status:</label>
        <select>
          <option hidden>Choose status of employee</option>
          <option value="EMPLOYED">Employed</option>
          <option value="FIRED">Fired</option>
          <option value="ON_HOLIDAY">On holiday</option>
        </select>
        <section className="bottom">
          <input className="input-submit" type="submit" value="Submit" />
          <button className="button-back">Back</button>
        </section>
      </form>
    </main>
  );
};
