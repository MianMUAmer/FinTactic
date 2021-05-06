import React from "react";
import "./css/profile.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Lname: "",
      Lemail: "",
      Lphone: "",
      Lmobile: "",
      Laddress: "",
      Ldesignation: "",
      LpicName: null,
      Ltwitter: "",
      Linstagram: "",
      Lfacebook: "",

      name: "",
      email: "",
      phone: "",
      mobile: "",
      address: "",
      designation: "",
      picName: null,
      twitter: "",
      instagram: "",
      facebook: "",
      savedNotes: 0,
      savedReports: 0,
      showModal: false,
    };
  }

  loadData = () => {
    //fetch and set Local and api var
    fetch("/getInfo", {
      method: "post",
      body: JSON.stringify({
        id: localStorage.getItem("user_id"),
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          name: data.name,
          email: data.email,
          phone: data.phone,
          mobile: data.mobile,
          address: data.address,
          designation: data.designation,
          twitter: data.twitter,
          instagram: data.instagram,
          facebook: data.facebook,
          savedNotes: data.savedNotes,
          savedReports: data.savedReports,

          Lname: data.name,
          Lemail: data.email,
          Lphone: data.phone,
          Lmobile: data.mobile,
          Laddress: data.address,
          Ldesignation: data.designation,
          Ltwitter: data.twitter,
          Linstagram: data.instagram,
          Lfacebook: data.facebook,
        });
      });

    fetch("/getPic", {
      method: "post",
      headers: { responseType: "blob", "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({
        id: localStorage.getItem("user_id"),
      }),
    })
      .then((response) => {
        return response.blob();
      })
      .then((data) => {
        this.setState({
          picName: URL.createObjectURL(data),
          LpicName: data,
        });
      });
  };

  componentDidMount() {
    this.loadData();
  }

  updateName = (e) => {
    this.setState({
      Lname: e.target.value,
    });
  };

  updateEmail = (e) => {
    this.setState({
      Lemail: e.target.value,
    });
  };

  updatePhone = (e) => {
    this.setState({
      Lphone: e.target.value,
    });
  };

  updateMobile = (e) => {
    this.setState({
      Lmobile: e.target.value,
    });
  };

  updateAdress = (e) => {
    this.setState({
      Laddress: e.target.value,
    });
  };

  updateDesig = (e) => {
    this.setState({
      Ldesignation: e.target.value,
    });
  };

  updatePicPath = (e) => {
    e.preventDefault();
    this.setState({
      LpicName: e.target.files[0],
      // picName: URL.createObjectURL(e.target.files[0])
    });
  };

  updateTwitter = (e) => {
    this.setState({
      Ltwitter: e.target.value,
    });
  };

  updateInsta = (e) => {
    this.setState({
      Linstagram: e.target.value,
    });
  };

  updateFb = (e) => {
    this.setState({
      Lfacebook: e.target.value,
    });
  };

  toggle = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  Close = () => {
    this.setState({
      Lname: this.state.name,
      Lemail: this.state.email,
      Lphone: this.state.phone,
      Lmobile: this.state.mobile,
      Laddress: this.state.address,
      Ldesignation: this.state.designation,
      LpicName: this.state.picName,
      Ltwitter: this.state.twitter,
      Linstagram: this.state.instagram,
      Lfacebook: this.state.facebook,
      showModal: !this.state.showModal,
    });
  };

  updateInfo = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("pic", this.state.LpicName);
    formData.append("id", localStorage.getItem("user_id"));
    formData.append("name", this.state.Lname);
    formData.append("phone", this.state.Lphone);
    formData.append("mobile", this.state.Lmobile);
    formData.append("address", this.state.Laddress);
    formData.append("designation", this.state.Ldesignation);
    formData.append("twitter", this.state.Ltwitter);
    formData.append("instagram", this.state.Linstagram);
    formData.append("facebook", this.state.Lfacebook);

    // fetch("/updateUser", {
    //   method: "post",
    //   body: formData,
    // }).then((response) => {
    this.setState(
      {
        name: this.state.Lname,
        email: this.state.Lemail,
        phone: this.state.Lphone,
        mobile: this.state.Lmobile,
        address: this.state.Laddress,
        designation: this.state.Ldesignation,
        picName: URL.createObjectURL(this.state.LpicName),
        twitter: this.state.Ltwitter,
        instagram: this.state.Linstagram,
        facebook: this.state.Lfacebook,
        showModal: false,
      },
      () => {
        fetch("/updateUser", {
          method: "post",
          body: formData,
        });
      }
    );
  };

  render() {
    const {
      Lname,
      Lemail,
      Lphone,
      Lmobile,
      Laddress,
      Ldesignation,
      LpicName,
      Ltwitter,
      Linstagram,
      Lfacebook,
      name,
      email,
      phone,
      mobile,
      address,
      designation,
      picName,
      twitter,
      instagram,
      facebook,
      savedNotes,
      savedReports,
      showModal,
    } = this.state;

    return (
      <div className="container">
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src={picName}
                      alt="Admin"
                      className="rounded-circle"
                      width={150}
                    />
                    <div className="mt-3">
                      <h4>{name}</h4>
                      <p className="mb-1">{designation}</p>
                      <p className="text-muted font-size-sm">{address}</p>
                      <button onClick={this.toggle} className="btn btn-success">
                        Edit Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mt-3">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-twitter mr-2 icon-inline text-info"
                      >
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                      </svg>
                      Twitter
                    </h6>
                    <span className="text-dark">@{twitter}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-instagram mr-2 icon-inline text-danger"
                      >
                        <rect
                          x={2}
                          y={2}
                          width={20}
                          height={20}
                          rx={5}
                          ry={5}
                        />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                      Instagram
                    </h6>
                    <span className="text-dark">{instagram}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-facebook mr-2 icon-inline text-primary"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                      Facebook
                    </h6>
                    <span className="text-dark">{facebook}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9">{name}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9">{email}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9">{phone}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Mobile</h6>
                    </div>
                    <div className="col-sm-9">{mobile}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9">{address}</div>
                  </div>
                </div>
              </div>
              <div className="row gutters-sm">
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div
                      className="card-body align-items-center text-center"
                      style={{ height: 200 }}
                    >
                      <h6 class="d-flex align-items-center mb-3">Your Notes</h6>
                      <h1 className="alerts" style={{ paddingTop: "6%" }}>
                        {savedNotes}
                      </h1>
                      <h4 style={{ paddingTop: "3%" }}>Saved Notes</h4>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div
                      className="card-body align-items-center text-center"
                      style={{ height: 200 }}
                    >
                      <h6 class="d-flex align-items-center mb-3">
                        Your Reports
                      </h6>
                      <h1 className="alerts" style={{ paddingTop: "6%" }}>
                        {savedReports}
                      </h1>
                      <h4 style={{ paddingTop: "3%" }}>Saved Reports</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <Modal className="prof" isOpen={showModal} toggle={this.toggle}>
          <form onSubmit={this.updateInfo}>
            <ModalHeader className="prof" toggle={this.Close}>
              <h2>Edit Profile</h2>
            </ModalHeader>
            <ModalBody className="prof">
              <div>
                <div>
                  <h5>Full Name:</h5>
                  <input
                    className="input"
                    type="text"
                    id="fname"
                    name="fname"
                    size="50"
                    value={Lname}
                    onChange={this.updateName}
                  />
                </div>
                <div
                  className="seg"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <h5>Email:</h5>
                    <input
                      className="input"
                      type="text"
                      id="email"
                      name="email"
                      size="30"
                      value={email}
                      // onChange={this.updateEmail}
                    />
                  </div>
                  <div>
                    <h5>Designation:</h5>
                    <input
                      className="input"
                      type="text"
                      id="desig"
                      name="desig"
                      size="30"
                      value={Ldesignation}
                      onChange={this.updateDesig}
                    />
                  </div>
                </div>
                <div
                  className="seg"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <h5>Phone Number:</h5>
                    <input
                      className="input"
                      type="text"
                      id="pNo"
                      name="pNo"
                      size="30"
                      value={Lphone}
                      onChange={this.updatePhone}
                    />
                  </div>
                  <div>
                    <h5>Mobile Number:</h5>
                    <input
                      className="input"
                      type="text"
                      id="mNo"
                      name="mNo"
                      size="30"
                      value={Lmobile}
                      onChange={this.updateMobile}
                    />
                  </div>
                </div>
              </div>
              <div className="seg">
                <h5>Profile Pic:</h5>
                <input
                  className="input"
                  type="file"
                  id="pPic"
                  name="pPic"
                  style={{ border: "none" }}
                  // value={LpicName}
                  onChange={this.updatePicPath}
                />
              </div>
              <div className="seg">
                <h5>Address:</h5>
                <textarea
                  style={{
                    border: "1px solid gray",
                    borderRadius: "15px",
                    padding: "8px",
                  }}
                  type="text"
                  id="add"
                  name="add"
                  rows="4"
                  cols="60"
                  value={Laddress}
                  onChange={this.updateAdress}
                />
              </div>
              <div class="seg">
                <h5>Social Handles</h5>
                <hr />
                <div className="seg1" style={{ display: "flex" }}>
                  <h5 style={{ marginRight: "55px" }}>Twitter:</h5>
                  <input
                    className="input"
                    type="text"
                    id="twit"
                    name="twit"
                    size="28"
                    value={Ltwitter}
                    onChange={this.updateTwitter}
                  />
                </div>
                <div className="seg1" style={{ display: "flex" }}>
                  <h5 style={{ marginRight: "29px" }}>Instagram:</h5>
                  <input
                    className="input"
                    type="text"
                    id="insta"
                    name="insta"
                    size="28"
                    value={Linstagram}
                    onChange={this.updateInsta}
                  />
                </div>
                <div className="seg1" style={{ display: "flex" }}>
                  <h5 style={{ marginRight: "30px" }}>Facebook:</h5>
                  <input
                    className="input"
                    type="text"
                    id="fb"
                    name="fb"
                    size="28"
                    value={Lfacebook}
                    onChange={this.updateFb}
                  />
                </div>
              </div>
            </ModalBody>

            <ModalFooter className="prof">
              <Button
                style={{ width: "15%" }}
                color="danger"
                onClick={this.Close}
              >
                Cancel
              </Button>{" "}
              <Button
                style={{ width: "25%" }}
                color="success"
                type="submit"
                // onClick={this.updateInfo}
              >
                Update!
              </Button>{" "}
            </ModalFooter>
          </form>
        </Modal>
      </div>
    );
  }
}

export default Profile;
