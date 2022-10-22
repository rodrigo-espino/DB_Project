import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { API } from "../components/API";

export function Members() {
  const MySwal = withReactContent(Swal);

  const [Id, setId] = useState("");
  const [memb_id, setmemb] = useState("");
  const [class_id, setclass_id] = useState([]);
  const [Data, setData] = useState([]);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [profession, setProf] = useState("");
  const [bank_det, setBank] = useState("");
  const [classe, setclasse] = useState([]);
  const [editing, setediting] = useState(false);
  const editMember = (id) => {
    setId(id);
  };
  const clearVariables = () => {
    setId("");
    setName("");
    setAddress("");
    setPhone("");
    setProf("");
    setBank("");
    setediting(false);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
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
    const rjson  = await res.json();
    const idmemberjson = await rjson.id;
    console.log(rjson);
    setmemb(await idmemberjson);
    if(!setmemb){
      let a = false
      while (a == false){
        if(!setmemb){
      setmemb(await idmemberjson);
        }else{
          a = true
        }
    }
  }
  
  console.log("memb_id");
  console.log(memb_id);
    const resClass = await fetch(`${API}/attends`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        memb_id,
        class_id,
      }),
    });
   await resClass.json();
  };

  const getMembers = async () => {
    const res = await fetch(`${API}/members`);
    const data = await res.json();
    setData(data);
    console.log(data);
  };

  const getClasses = async () => {
    const res = await fetch(`${API}/classes`);
    const data = await res.json();
    setclasse(data);
    console.log(data);
  };

  useEffect(() => {
    getMembers();
    getClasses();
    setId("");
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
            >
              Create Member
            </button>

            {/** Modal Create*/}
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
                      Update Member
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleSubmit}>
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
                        onChange={(e) => setProf(e.target.value)}
                        value={profession}
                      />
                      <label htmlFor="Bank">Bank</label>
                      <input
                        type="text"
                        className="form-control"
                        id="bank_det"
                        onChange={(e) => setBank(e.target.value)}
                        value={bank_det}
                      />
                      <br />

                      <div className="card">
                        <div className="card-header">
                          <h1 className="card-title fs-5">Classes</h1>
                        </div>
                        <div className="card-body">
                          <div className="mb-3">
                            
                          
                          <div class="form-check">
                     
                         

<select class="form-select" multiple aria-label="multiple select example"  onChange={(e) => setclass_id(e.target.value)}>
{classe.map((i) => (
                                <option value={i.id}
                                key={i.id}
                                >{i.description}</option>
                              ))}
</select>


                              
                          </div>
                        </div>
                      </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-danger">
                      Delete
                    </button>
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
                      onClick={handleSubmit}
                    >
                      Ok
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/** Others*/}
          </div>
          <div className="col-6 col-md-4 text-end">
            <form className="row g-3">
              <div className="col-auto">
                <label for="inputPassword2" className="visually-hidden">
                  Password
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
            {Data.map((item) => (
              <tr key={item.id}>
                <th>{item.name}</th>
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
                    onClick={(e) => editMember(item.id)}
                  >
                    See More...
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/*Modal Update*/}
      </div>
    </>
  );
}
