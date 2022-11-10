import React, { useState, useEffect } from "react";
import { API } from "../components/API";
import { toast } from "react-toastify";

export function Members() {
  const [data, setData] = useState([]); //Data from Members API
  const [data_class, setData_class] = useState([]); //Data from Class API
  const [name, setName] = useState(""); //Name of the member
  const [address, setAddress] = useState(""); //Address of the member
  const [phone, setPhone] = useState(""); //Phone of the member
  const [profession, setProfession] = useState(""); //Profession of the member
  const [bank_det, setbank_det] = useState(""); //Bank details of the member
  const [editing, setEditing] = useState(false); //Editing state
  const [id, setId] = useState(""); //Id of the member
  const [newClassesUpdate, setNewClassesUpdate] = useState([]); //New classes of the member for update
  const [classesUpd, setClassesUpd] = useState([]); //Classes member didnt select once created

  let classes_selected = []; //Array to store the classes selected by the member
  let consult_classes = []; //Array to store the classes of the member
  let deleted_classes = []; //Array to store the classes deleted by the member

  const editMember = async (id) => {
    clearVariables()
    setEditing(true);
    try{
      const res = await fetch(`${API}/consults/memclass/${id}`);
    /* Converting the response to a JSON object. */
    const data = await res.json();

    /* Setting the values of the form to the values of the member that is being edited. */
    setId(id);
    setName(data[0].name_m);
    setAddress(data[0].address);
    setPhone(data[0].phone);
    setProfession(data[0].profession);
    setbank_det(data[0].bank_det);

    //Setting the classes of the member to the array consult_classes as an object
    for (let i = 0; i < data.length; i++) {
      consult_classes.push({
        id: data[i].class_id,
        description: data[i].description,
      });
    }
    setClassesUpd(consult_classes);
    }
    catch{
    const res = await fetch(`${API}/members/${id}`);
    const data = await res.json();

    /* Setting the values of the form to the values of the member that is being edited. */
    setId(id);
    setName(data[0].name);
    setAddress(data[0].address);
    setPhone(data[0].phone);
    setProfession(data[0].profession);
    setbank_det(data[0].bank_det);

    }
    

    const resClasses = await fetch(`${API}/consults/membnotc/${id}`);
    const dataClasses = await resClasses.json();
    setNewClassesUpdate(dataClasses);
  };

  const ClassInputHandle = (id) => {
    if (classes_selected.includes(id)) {
      classes_selected.splice(classes_selected.indexOf(id), 1);
    } else {
      classes_selected.push(id);
    }
  };

  const getData = async () => {
    // Getting data members
    const res = await fetch(`${API}/members`);
    const data = await res.json();
    setData(data);
    console.log("data", data);
    //Getting data class
    const res_class = await fetch(`${API}/classes`);
    const data_class = await res_class.json();
    setData_class(data_class);
  };

  const clearVariables = () => {
    //Clearing the variables
    setName("");
    setAddress("");
    setPhone("");
    setProfession("");
    setbank_det("");
    classes_selected = [];
    setEditing(false);
    consult_classes = [];
    deleted_classes = [];
    var x = document.getElementsByClassName("form-check-input");
    for (let i = 0; i <= x.length-1; i++) {
      document.querySelectorAll("input[type=checkbox]")[i].checked = false;
    }
    setClassesUpd([]);
    setNewClassesUpdate([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editing) {
      const res = await fetch(`${API}/members`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          address,
          phone,
          profession,
          bank_det,
        }),
      });
      const response = await res.json();
      const member_id = response.id;
      console.log(member_id);
      handleCreateClass(member_id);
      console.log(classes_selected);
      getData();
      clearVariables();
      toast('Member Created', {type: 'success'})
    } else {
      console.log(id)
      const res = await fetch(`${API}/members/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name_m:name,
          address,
          phone,
          profession,
          bank_det,
        }),
      });

      if (classes_selected.length > 0) {
        handleCreateClass(id);
      }
      if (deleted_classes.length > 0) {
        handleDeleteClasses(id);
      }
      toast('Member Updated', {type: 'info'})
      getData();
      clearVariables();
    }
  };
  const handleCreateClass = (id_member) => {
    console.log(id_member);
    classes_selected.forEach(async (element) => {
      console.log(element);
      const res = await fetch(`${API}/attends`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          class_id: element,
          memb_id: id_member,
        }),
      });
      const response = await res.json();
      console.log(response);
    });
  };

  const handleDeleteClasses = (id_member) => {
    console.log(id_member);
    deleted_classes.forEach(async (id_class) => {
      await fetch(`${API}/attends/${id_member}/${id_class}`, {
        method: "DELETE",
      });
    });
  };

  const handleSelectDelete = (id_class) => {
    if (deleted_classes.includes(id_class)) {
      deleted_classes.splice(deleted_classes.indexOf(id_class), 1);
    } else {
      deleted_classes.push(id_class);
    }
  };

  const handleDeleteMember = async () => {
    const userResponse = window.confirm("Are you sure you want to delete it?");
    if (userResponse) {
      await fetch(`${API}/members/${id}`, {
        method: "DELETE",
      });
    }
    toast('Member Deleted', {type: 'error'})
    getData();
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
              onClick={() => {
                clearVariables();
              }}
            >
              Create Member
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
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Phone</th>
              <th scope="col">Profession</th>
              <th scope="col">Bank</th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.name_m}</td>
                <td>{item.address}</td>
                <td>{item.phone}</td>
                <td>{item.profession}</td>
                <td>{item.bank_det}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#updateModal"
                    onClick={() => editMember(item.id)}
                  >
                    See More...
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/*Modal Window*/}

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
                  {editing ? "Edit Member" : "Create Member"}
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
                  <label htmlFor="Name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                  <label htmlFor="Address">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                  />
                  <label htmlFor="Phone">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                  />
                  <label htmlFor="Profession">Profession</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Profession"
                    onChange={(e) => setProfession(e.target.value)}
                    value={profession}
                  />
                  <label htmlFor="Bank">Bank</label>
                  <input
                    type="text"
                    className="form-control"
                    id="bank_det"
                    onChange={(e) => setbank_det(e.target.value)}
                    value={bank_det}
                  />
                  <br />

                  <div className="card">
                    <div className="card-header">
                      <h1 className="card-title fs-5">
                        {editing ? "Edit Classes" : "Select Classes"}
                      </h1>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <div className="form-check">
                          {editing
                            ? // Classes Already selected for the member
                              // And ready to be updated
                              classesUpd.map((i) => (
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckChecked"
                                    key={i.id}
                                    onChange={(e) => handleSelectDelete(i.id)}
                                    checked
                                  />
                                  <label
                                    class="form-check-label"
                                    for="flexCheckDefault"
                                  >
                                    {i.description}
                                  </label>
                                </div>
                              ))
                            : data_class.map((i) => (
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefault"
                                    key={i.id}
                                    onChange={() => ClassInputHandle(i.id)}
                                  />
                                  <label
                                    class="form-check-label"
                                    for="flexCheckDefault"
                                  >
                                    {i.description}
                                  </label>
                                </div>
                              ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  {
                    //Select new classes for the member (just for update)
                    editing ? (
                      <div className="card">
                        <div className="card-header">
                          <h1 className="card-title fs-5">
                            Select New Classes
                          </h1>
                        </div>
                        <div className="card-body">
                          <div className="mb-3">
                            <div className="form-check">
                              {newClassesUpdate.map((index) => (
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefault"
                                    key={index.id}
                                    onChange={(e) => ClassInputHandle(index.id)}
                                  />
                                  <label
                                    class="form-check-label"
                                    for="flexCheckDefault"
                                  >
                                    {index.description}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null
                  }
                </form>
              </div>
              <div className="modal-footer">
                {editing ? (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleDeleteMember}
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
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
