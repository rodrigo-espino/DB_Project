import React, { useState, useEffect } from "react";
import { API } from "../components/API";
export function Devices() {
  const [Id, setId] = useState("");
  const [Room_Id, setRoomid] = useState("");
  const [data, setdata] = useState([]);
  const [descr, setdescr] = useState("");
  const [st, setst] = useState("");
  const [editing, setediting] = useState(false);
  //Getting info from RESTAPI
  const getData = async () => {
    const res = await fetch(`${API}/rooms`);
    const rdata = await res.json();
    setdata(rdata);
    console.log("Data")
    console.log(data);

  };

  //Search Device
  
  
    


  //Create a new Device
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
      await fetch(`${API}/devices/${Id}`, {
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

  //editDevices
  const editRooms = async (id) => {
    setediting(true);
    const res = await fetch(`${API}/devices/${id}`);
    const dres = await res.json();
    setId(id);
    for (let i = 0; i < dres.length; i++) {
      setmeters(dres[i].meters);
      setlocation(dres[i].location);
      settype(dres[i].typeofR);
    }
  };

  const deleteDevices = async (id) => {
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
    setRoomid("");
    setdescr("");
    setst("");
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
              Create Devices
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
              <th scope="col">Descr</th>
              <th scope="col">St</th>
              <th scope="col">Room_Id</th>
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
                  <label htmlFor="Name">Descr</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    onChange={(e) => setdescr(e.target.value)}
                    value={descr}
                  />
                  <label htmlFor="Name">Descr</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    onChange={(e) => setst(e.target.value)}
                    value={st}
                  />
                  <label htmlFor="Name">St</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    onChange={(e) => setRoomid(e.target.value)}
                    value={Room_Id}
                  />
                </form>
              </div>
              <div className="modal-footer">
                {editing ? (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteDevices(Id)}
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