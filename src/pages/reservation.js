import React, {useEffect, useState} from 'react'
import {API} from '../components/API'


export function Reservation() {

const [data, setData] = useState([]);    
const [member_id, setMember_id] = useState("");
const [squash_court, setSquash_court] = useState("");
const [Rdate, setRdate] = useState("");
const [Rtime, setRtime] = useState("");
const [editing, setEditing] = useState(false);
const [id, setId] = useState("");

const getData = async () => {
    const res = await fetch(`${API}/reservations`);
    const rdata = await res.json();
    setData(rdata);
    console.log(rdata);
  };

const clearVariables = async () => {
    setMember_id("");
    setSquash_court("");
    setRdate("");
    setRtime("");
    setEditing(false);
    setId("");
  }

const editReservation = async (id) => {
    setEditing(true);
    const res = await fetch(`${API}/reservations/${id}`);
    const rdata = await res.json();
    for(let i = 0; i < rdata.length; i++){
        setMember_id(rdata[i].member_id);
        setSquash_court(rdata[i].squash_court);
        setRdate(rdata[i].Rdate);
        setRtime(rdata[i].Rtime);
        setId(rdata[i].id);
    }
    };

    const deleteReservation = async (id) => {
        const userResponse = window.confirm("Are you sure you want to delete it?");
        if (userResponse) {
          await fetch(`${API}/reservations/${id}`, {
            method: "DELETE",
          });
          getData();
        }
      };

    const handleSubmit = async (e) => {
        if (!editing) {
          const res = await fetch(`${API}/reservations`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              member_id,
              squash_court,
              Rdate,
              Rtime
            }),
          });
          const response = await res.json();
            console.log(response);
          
        } else {
          await fetch(`${API}/reservations/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                member_id,
                squash_court,
                Rdate,
                Rtime
            }),
          });
    
          getData();
        }
        getData();
        clearVariables();
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
              Create Reservation
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
              <th scope="col">Member</th>
              <th scope="col">Squash Court</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            {data.map((i) => (
              <tr key={i.id}>
                <td>{i.member_id}</td>
                <td>{i.squash_court}</td>
                <td>{i.Rdate}</td>
                <td>{i.Rtime}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#updateModal"
                    onClick={(e) => editReservation(i.id)}
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
                  <label htmlFor="Name">Member</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    onChange={(e) => setMember_id(e.target.value)}
                    value={member_id}
                  />
                  <label htmlFor="Name">Squash Court</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    onChange={(e) => setSquash_court(e.target.value)}
                    value={squash_court}
                  />
                  <label htmlFor="Name">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="name"
                    onChange={(e) => setRdate(e.target.value)}
                    value={Rdate}
                  />
                  <label htmlFor="Name">Time</label>
                  <input
                    type="time"
                    className="form-control"
                    id="name"
                    onChange={(e) => setRtime(e.target.value)}
                    value={Rtime}
                  />
                </form>
              </div>
              <div className="modal-footer">
                {editing ? (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteReservation(id)}
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

        </div>
    </>
  )
}
