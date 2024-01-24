import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const AllocationForm = (props) => {
  const { remaining, currency, dispatch } = useContext(AppContext);

  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [action, setAction] = useState("Add"); // Default action is set to "Add"

  const submitEvent = () => {
    const enteredValue = Number(cost);

    if (Number.isNaN(enteredValue)) {
      alert("Please enter a valid number.");
      return;
    }

    if (!Number.isInteger(enteredValue)) {
      alert("Please enter an integer number.");
      return;
    }

    const expense = {
      name: name,
      cost: parseInt(cost),
    };

    if (action === "Reduce") {
      if (enteredValue > remaining) {
        alert(`Cannot reduce more than the remaining funds: £${remaining}`);
        return;
      }
      dispatch({
        type: "RED_EXPENSE",
        payload: expense,
      });
    } else { // Assume action is "Add"
      if (enteredValue > remaining) {
        alert(`The value cannot exceed remaining funds: £${remaining}`);
        return;
      }
      dispatch({
        type: "ADD_EXPENSE",
        payload: expense,
      });
    }

    setCost("");
    setName("");
    setAction("Add"); // Reset the action to "Add"
  };

  return (
    <div>
      <div className="row">
        <div className="input-group mb-3" style={{ marginLeft: "2rem" }}>
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="inputGroupSelect01">
              Department
            </label>
          </div>
          <select
            className="custom-select"
            id="inputGroupSelect01"
            onChange={(event) => setName(event.target.value)}
            value={name}
          >
            <option defaultValue>Choose...</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="Finance">Finance</option>
            <option value="HR">HR</option>
            <option value="IT">IT</option>
            <option value="Admin">Admin</option>
          </select>

          <div className="input-group-prepend" style={{ marginLeft: "2rem" }}>
            <label className="input-group-text" htmlFor="inputGroupSelect02">
              Allocation
            </label>
          </div>
          <select
            className="custom-select"
            id="inputGroupSelect02"
            onChange={(event) => setAction(event.target.value)}
            value={action}
          >
            <option value="Add">Add</option>
            <option value="Reduce">Reduce</option>
          </select>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <label htmlFor="cost" style={{ marginLeft: "2rem" }}>
              {currency}
            </label>
          </div>
          <input
            required
            type="number"
            id="cost"
            value={cost}
            style={{ marginLeft: "5px", size: 10 }}
            onChange={(event) => setCost(event.target.value)}
          ></input>

          <button
            className="btn btn-primary"
            onClick={submitEvent}
            style={{ marginLeft: "2rem" }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllocationForm;
