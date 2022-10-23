import React, { useState, useEffect } from "react";
import { API } from "../components/API";
export function Users() {
  const [Id, setId] = useState("");
  const [data, setdata] = useState([]);
  const [name, setname] = useState("");
  const [user, setuser] = useState("");
  const [pass, setpass] = useState("");
  const [editing, setediting] = useState(false);
  //Getting info from RESTAPI
  const getData = async () => {
    const res = await fetch(`${API}/users`);
    const rdata = await res.json();
    setdata(rdata);
    console.log(data);
  };

  //Search Instructor
  
    


  //Create a new Instructor
  const handleSubmit = async () => {
    if (!editing) {
      const res = await fetch(`${API}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          user,
          pass,
        }),
      });
      await res.json();
    } else {
      await fetch(`${API}/users/${Id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          user,
          pass,
        }),
      });

      getData();
    }
    getData();
    clearVariables();
  };

  //editInstructor
  const editUsers = async (id) => {
    setediting(true);
    const res = await fetch(`${API}/instructors/${id}`);
    const dres = await res.json();
    setId(id);
    for (let i = 0; i < dres.length; i++) {
      setname(dres[i].name);
      setuser(dres[i].user);
      setpass(dres[i].pass);
    }
  };

  const deleteUsers = async (id) => {
    const userResponse = window.confirm("Are you sure you want to delete it?");
    if (userResponse) {
      await fetch(`${API}/user/${id}`, {
        method: "DELETE",
      });
      getData();
    }
  };
  //clear variables
  const clearVariables = () => {
    setId("");
    setname("");
    setuser("");
    setpass("");
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
              Create Users
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
              <th scope="col">SNO</th>
              <th scope="col">Name</th>
              <th scope="col">User</th>
              <th scope="col">Pass</th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody>
            {data.map((i) => (
              <tr key={i.SNO}>
                <th>{i.SNO}</th>
                <td>{i.name}</td>
                <td>{i.user}</td>
                <td>{i.pass}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#updateModal"
                    onClick={(e) => editUsers(i.SNO)}
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
                  <label htmlFor="Name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    onChange={(e) => setname(e.target.value)}
                    value={name}
                  />
                  <label htmlFor="Name">User</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    onChange={(e) => setuser(e.target.value)}
                    value={user}
                  />
                  <label htmlFor="Name">Pass</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    onChange={(e) => setpass(e.target.value)}
                    value={pass}
                  />
                </form>
              </div>
              <div className="modal-footer">
                {editing ? (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteUsers(Id)}
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