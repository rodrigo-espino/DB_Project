import React, { useState, useEffect } from "react";
import { API } from "../components/API";
export function Rooms() {
  const [Id, setId] = useState("");
  const [data, setdata] = useState([]);
  const [meters, setmeters] = useState("");
  const [location, setlocation] = useState("");
  const [typeofR, settype] = useState("");
  const [editing, setediting] = useState(false);
  //Getting info from RESTAPI
  const getData = async () => {
    const res = await fetch(`${API}/rooms`);
    const rdata = await res.json();
    setdata(rdata);
    console.log("Data")
    console.log(data);

  };

  //Search Room
  
  
    


  //Create a new Room
  const handleSubmit = async (e) => {
    if (!editing) {
      const res = await fetch(`${API}/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meters,
          location,
          typeofR,
        }),
      });
      const resjson = await res.json();
      
      console.log(resjson);
    } else {
      await fetch(`${API}/rooms/${Id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meters,
          location,
          typeofR,
        }),
      });

      getData();
    }
    getData();
    clearVariables();
  };

  //editRooms
  const editRooms = async (id) => {
    setediting(true);
    const res = await fetch(`${API}/rooms/${id}`);
    const dres = await res.json();
    setId(id);
    for (let i = 0; i < dres.length; i++) {
      setmeters(dres[i].meters);
      setlocation(dres[i].location);
      settype(dres[i].typeofR);
    }
  };

  const deleteRooms = async (id) => {
    const userResponse = window.confirm("Are you sure you want to delete it?");
    if (userResponse) {
      await fetch(`${API}/rooms/${id}`, {
        method: "DELETE",
      });
      getData();
    }
  };
  //clear variables
  const clearVariables = () => {
    setId("");
    setmeters("");
    setlocation("");
    settype("");
    setediting(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="container p-4">
        <div className="row g-0 text-center">
          <div className="col-sm-6 col-md-8 text-start">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#updateModal"
              onClick={() => clearVariables()}
            >
              Create Rooms
            </button>
          </div>
          <div className="col-6 col-md-4 text-end">
            <form className="row g-3">
              <div className="col-auto">
                <label htmlFor="inputPassword2" className="visually-hidden">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputPassword2"
                  placeholder="Name"
                />
              </div>
              <div className="col-auto">
                <button
                  type="submit"
                  className="btn btn-primary mb-3"
                  onClick={clearVariables}
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
        <br />

        {/**Table */}
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Meters</th>
              <th scope="col">Location</th>
              <th scope="col">Type</th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody>
            {data.map((i) => (
              <tr key={i.id}>
                <td>{i.meters}</td>
                <td>{i.location}</td>
                <td>{i.typeofR}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#updateModal"
                    onClick={(e) => editRooms(i.id)}
                  >
                    See More...
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/**Modal Window */}
        <div
          className="modal fade modal-dialog-scrollable"
          id="updateModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  {editing ? "Edit User" : "Create User"}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {/**Form Modal */}
                <form onSubmit={handleSubmit}>
                  <label htmlFor="Name">Meters</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    onChange={(e) => setmeters(e.target.value)}
                    value={meters}
                  />
                  <label htmlFor="Name">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    onChange={(e) => setlocation(e.target.value)}
                    value={location}
                  />
                  <label htmlFor="Name">Type</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    onChange={(e) => settype(e.target.value)}
                    value={typeofR}
                  />
                </form>
              </div>
              <div className="modal-footer">
                {editing ? (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteRooms(Id)}
                    data-bs-dismiss="modal"
                  >
                    Delete
                  </button>
                ) : null}

                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={handleSubmit}
                >
                  {editing ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/**Modal Window Delete  */}
        
      </div>
    </>
  );
}