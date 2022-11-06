import React, { useState, useEffect } from "react";
import { API } from "../components/API";
export function Classes() {
  const [dataClasses, setDataClasses] = useState([]);
  const [dataRooms, setdataRooms] = useState([]);

  const [desc, setDesc] = useState("");
  const [sche, setSche] = useState("");
  const [inst, setInst] = useState("");
  const [id, setId] = useState("");
  const [roomsSelectedConst, setRoomsSelectedConst] = useState([]); //Rooms already selected
  const [roomsNewUpd, setroomsNewUpd] = useState([]); //Rooms to be added after create/update

  const [editing, setEditing] = useState(false);

  let roomsSelected =[]//array of rooms selected
  let roomsConsultSelected =[] //array of rooms selected for consult
  let roomsDeleteSelected =[] //array of rooms selected for delete

  const editClass = async(id) => {
    clearVariables()
    setEditing(true)
    setId(id)
    //Data from classes
    try{
    const res = await fetch(`${API}/consults/classroom/${id}`)
    const data = await res.json()
    console.log("data edit: ",data)
    setDesc(data[0].description)
    setSche(data[0].scheduleC)
    setInst(data[0].inst_id)
    for(let i=0; i<data.length; i++){
      roomsConsultSelected.push({
         id: data[i].room_id,
         meters: data[i].meters,
         location: data[i].location
      })
     }
     setRoomsSelectedConst(roomsConsultSelected)
    }
    catch{
    const res = await fetch(`${API}/classes/${id}`)
    const data = await res.json()
    console.log("data edit: ",data)
    setDesc(data[0].description)
    setSche(data[0].scheduleC)
    setInst(data[0].inst_id)
    }

    

    //Data not selected from rooms
    const res2 = await fetch(`${API}/consults/classnotroom/${id}`)
    const data2 = await res2.json()
    setroomsNewUpd(data2)
  }

  const handleDeleteRooms = (id) => {
    if(roomsDeleteSelected.includes(id)){
      roomsDeleteSelected = roomsDeleteSelected.filter((item) => item !== id)
    }
    else{
      roomsDeleteSelected.push(id)
    }
  }
  
  const getData = async () => {
    /* Fetching the data from the API and setting the data to the state. */
    const res = await fetch(`${API}/classes`);
    const dataClasses = await res.json();
    setDataClasses(dataClasses);

    /* Fetching the data from the API and setting the data to the state. */
    const resRooms = await fetch(`${API}/rooms`);
    const dataRooms = await resRooms.json();
    setdataRooms(dataRooms);

    console.log("Data Classes: ", dataClasses);
    console.log("Data Rooms: ", dataRooms);
  };

  const clearVariables = () => {
    setDesc("");
    setSche("");
    setInst("");
    setRoomsSelectedConst([]);
    setroomsNewUpd([]);
    setEditing(false);
    setId("")

    var x = document.getElementsByClassName("form-check-input");
    for (let i = 0; i <= x.length-1; i++) {
      document.querySelectorAll("input[type=checkbox]")[i].checked = false;
    }
  };

  const handleSelectRooms = (id) => {
    if(roomsSelected.includes(id)){
      roomsSelected = roomsSelected.filter((item) => item !== id)
    }
    else{
      roomsSelected.push(id)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!editing){
      const res = await fetch(`${API}/classes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dec: desc,
          sche: sche,
          inst: inst,
        }),
      });
      const data = await res.json();
      handleAssignRooms(data.id)
    }
    else{
        await fetch(`${API}/classes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
           description: desc,
           scheduleC: sche,
          inst_id: inst,
        }),
      });
      handleAssignRooms(id)
      handleDeleteRoomSelected(id)
    }
    getData();
    clearVariables();
  };

 const handleAssignRooms = async (id_class) => {
    console.log(id_class)
    roomsSelected.forEach(async (id_room) => {

    const res = await fetch(`${API}/assigned`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        class_id: id_class,
        room_id: id_room
      }),
    });
  })
 }

 const handleDeleteRoomSelected = async (id_class) => {
  roomsDeleteSelected.forEach(async (id_room) => {
    await fetch(`${API}/assigned/${id_room}/${id_class}`, {
      method: "DELETE"
    })
  })
}

  const handleDeleteClass = async () => {
    const userResponse = window.confirm("Are you sure you want to delete it?");
    if (userResponse) {
    await fetch(`${API}/classes/${id}`, {
      method: "DELETE"
    });
  }
    getData();
    clearVariables()
  }

  useEffect(() => {
    getData();
    clearVariables()
  }, []);

  return (
    <div className="container py-4">
      <div className="row g-0 text-center">
        <div className="col-sm-6 col-md-8 text-start">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#updateModal"
            onClick={() => clearVariables()}
          >
            Create Class
          </button>

          {/** Others*/}
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
              <button type="submit" className="btn btn-primary mb-3">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <br />

      {/*Table*/}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Schedule</th>
            <th scope="col">Instructor</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {dataClasses.map((i) => (
            <tr key={i.id}>
              <td>{i.description}</td>
              <td>{i.scheduleC}</td>
              <td>{i.inst_id}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#updateModal"
                  onClick={() => editClass(i.id)}
                >
                  See More...
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/*Modal*/}
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
                {editing ? "Edit Class" : "Create Class"}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <label htmlFor="Name">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  onChange={(e) => setDesc(e.target.value)}
                  value={desc}
                />
                <label htmlFor="Address">Schedule</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  onChange={(e) => setSche(e.target.value)}
                  value={sche}
                />
                <label htmlFor="Phone">Instructor</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  onChange={(e) => setInst(e.target.value)}
                  value={inst}
                />

                <br />

                {/* Card of Rooms */}
                <div className="card">
                    <div className="card-header">
                      <h1 className="card-title fs-5">
                        {editing ? "Edit Rooms" : "Select Rooms"}
                      </h1>
                    </div>
                <div className="card-body">
                  <div className="mb-3">
                    <div className="form-check">
                      {editing ? (
                        roomsSelectedConst.map((i) => (
                          <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckChecked"
                            key={i.id}
                            onChange={(e) => handleDeleteRooms(i.id)}
                            checked
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                          >
                            {i.location + " - " + i.meters}
                          </label>
                        </div>
                        ))
                      )
                      :(
                      dataRooms.map((i) => (
                        <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckChecked"
                          key={i.id}
                          onChange={(e) => handleSelectRooms(i.id)}
                        />
                        <label
                          class="form-check-label"
                          for="flexCheckDefault"
                        >
                          {i.location + " - " + i.meters}
                        </label>
                      </div>
                      )))}
                    </div>
                  </div>
                </div>
                </div>
                  <br />
                {/* Select new Rooms */}
                {editing ? (
                <div className="card">
                    <div className="card-header">
                      <h1 className="card-title fs-5">
                        Select Rooms
                      </h1>
                    </div>
                <div className="card-body">
                  <div className="mb-3">
                    <div className="form-check">
                      {
                        roomsNewUpd.map((i) => (
                          <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckChecked"
                            key={i.id}
                            onChange={(e) => handleSelectRooms(i.id)}
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                          >
                            {i.location + " - " + i.meters}
                          </label>
                        </div>
                        ))}
                    </div>
                  </div>
                </div>
                </div>) : null}

                {/* End Card New  rooms */}
              </form>
              <div className="modal-footer">
                {
                  editing ? (
                    <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={() => handleDeleteClass()}
                >
                  Delete
                </button>

                  ) : null
                }
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
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
