import React, { useState, useEffect } from "react";
import { API } from "../components/API";
import { toast } from "react-toastify";
import Select from "react-select";

export function Devices() {
  const [Id, setId] = useState("");
  const [data, setdata] = useState([]);
  const [descr, setdescr] = useState("");
  const [st, setst] = useState("");
  const [room_id, setRoomid] = useState("");
  const [editing, setediting] = useState(false);
  const [dataRooms, setDataRooms] = useState([]);
  //Getting info from RESTAPI

  let roomsdata = [];
  const getData = async () => {
    const res = await fetch(`${API}/devices`);
    const rdata = await res.json();
    setdata(rdata);

    const res2 = await fetch(`${API}/rooms`);
    const rdata2 = await res2.json();
    console.log(rdata2);
    for (let i = 0; i < rdata2.length; i++) {
      roomsdata.push({
        value: rdata2[i].id,
        label: rdata2[i].meters + " - " + rdata2[i].location,
      });
    }
    setDataRooms(roomsdata);
    console.log("Data rooms", dataRooms);
  };

  //Search Device

  //Create a new Device
  const handleSubmit = async (e) => {
    console.log(room_id);
    if (!editing) {
      const res = await fetch(`${API}/devices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          descr,
          st,
          room_id,
        }),
      });
      const resjson = await res.json();
      toast("Device Created", { type: "success" });
      console.log(resjson);
      clearVariables();
    } else {
      await fetch(`${API}/devices/${Id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          descr,
          st,
          room_id,
        }),
      });
      toast("Device Updated", { type: "info" });
      getData();
    }
    getData();
    clearVariables();
  };

  //editDevices
  const editDevices = async (id) => {
    setediting(true);
    const res = await fetch(`${API}/devices/${id}`);
    const dres = await res.json();
    setId(id);
    for (let i = 0; i < dres.length; i++) {
      setdescr(dres[i].descr);
      setst(dres[i].st);
      setRoomid(dres[i].room_id);
    }
  };

  const deleteDevices = async (id) => {
    const userResponse = window.confirm("Are you sure you want to delete it?");
    if (userResponse) {
      await fetch(`${API}/devices/${id}`, {
        method: "DELETE",
      });
      toast("Device Deleted", { type: "error" });
      getData();
    }
  };
  //clear variables
  const clearVariables = () => {
    setId("");
    setdescr("");
    setst("");
    setRoomid("");
    setediting(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleRoomChange = (id) => {
    console.log(id);
  };
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
              Create Device
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
              <th scope="col">Description</th>
              <th scope="col">Status</th>
              <th scope="col">Room Id</th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody>
            {data.map((i) => (
              <tr key={i.id}>
                <td>{i.descr}</td>
                <td>{i.st}</td>
                <td>{i.room_id}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#updateModal"
                    onClick={(e) => editDevices(i.id)}
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
                  {editing ? "Edit Device" : "Create Device"}
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
                  <label htmlFor="Name">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    onChange={(e) => setdescr(e.target.value)}
                    value={descr}
                  />
                  <label htmlFor="Name">Status</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    onChange={(e) => setst(e.target.value)}
                    value={st}
                  />
                  <label htmlFor="Name">Room</label>
                  
                  <input
                    class="form-control"
                    list="datalistOptions"
                    id="exampleDataList"
                    placeholder="Type to search..."
                    onChange={(e) => setRoomid(e.target.value)}
                    value={room_id}
                  />
                  <datalist id="datalistOptions">
                    {dataRooms.map((i) => (
                      <option value={i.value}>{i.label}</option>
                    ))}
                  </datalist>
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
