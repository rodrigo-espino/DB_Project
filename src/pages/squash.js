import React, {useState, useEffect} from "react";
import { API } from "../components/API";
import {toast} from 'react-toastify'
export function Squash() {
  const [Id, setId] = useState("");
  const [data, setdata] = useState([]);
  const [location, setlocation] = useState("");
  const [cond, setcond] = useState("");
  const [editing, setediting] = useState(false);
  //Getting info from RESTAPI
  const getData = async () => {
    const res = await fetch(`${API}/squash`);
    const rdata = await res.json();
    setdata(rdata);
    console.log(data);
  };

  //Search Squash
  
    


  //Create a new Squash
  const handleSubmit = async () => {
    if (!editing) {
      const res = await fetch(`${API}/squash`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location,
          cond,
        }),
      });
      toast('Squash Created', {type: 'success'})
      await res.json();
    } else {
      await fetch(`${API}/squash/${Id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location,
          cond,
        }),
      });
      toast('Squash Updated', {type: 'info'})
      getData();
    }
    getData();
    clearVariables();
  };

  //editSquash
  const editSquash = async (id) => {
    setediting(true);
    const res = await fetch(`${API}/squash/${id}`);
    const dres = await res.json();
    setId(id);
    for (let i = 0; i < dres.length; i++) {
      setlocation(dres[i].location);
      setcond(dres[i].cond);
    }
  };

  const deleteSquash = async (id) => {
    const userResponse = window.confirm("Are you sure you want to delete it?");
    if (userResponse) {
      await fetch(`${API}/squash/${id}`, {
        method: "DELETE",
      });
      getData();
      toast('Squash Deleted', {type: 'error'})
    }
  };
  //clear variables
  const clearVariables = () => {
    setId("");
    setlocation("");
    setcond("");
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
              Create Squash
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
              <th scope="col">ID</th>
              <th scope="col">Location</th>
              <th scope="col">Condition</th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody>
            {data.map((i) => (
              <tr key={i.id}>
                <th>{i.id}</th>
                <td>{i.location}</td>
                <td>{i.cond}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#updateModal"
                    onClick={(e) => editSquash(i.id)}
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
                  {editing ? "Edit Squash" : "Create Squash"}
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
                  <label htmlFor="Name">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    onChange={(e) => setlocation(e.target.value)}
                    value={location}
                  />
                  <label htmlFor="Name">Condition</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    onChange={(e) => setcond(e.target.value)}
                    value={cond}
                  />
                </form>
              </div>
              <div className="modal-footer">
                {editing ? (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteSquash(Id)}
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


