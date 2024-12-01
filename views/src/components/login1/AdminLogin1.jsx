import React, { useContext } from "react";
import "./AdminLogin1Styles.css";
import Password from "../../utils/password";
import Button from "react-bootstrap/Button";
import logo2 from "../../assets/oisp-official-logo01-1@2x.png";
import logo3 from "../../assets/2203.i101.011.S.m004.c13 1.png";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useCookies } from "react-cookie";
import { UserContext } from "../../../../controllers/UserProvider";
import Footer from "../../utils/footer";

const AdminLogin1 = () => {
  const { setAdminEmail } = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const handleOnChange = (e) => {
    setUsername(e.target.value);
  };
  const [password, setPassword] = useState("");
  const handleOnChange1 = (e) => {
    setPassword(e.target.value);
  };
  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });
  const handleSubmit = async (e) => {
    console.log(username + password);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3001/accounts/adminLogin",
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        setAdminEmail(username);
        handleSuccess(message);
        setTimeout(() => {
          navigate("/AdminHome");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container-fluid">
      <div className="header-choose-login">
        <img className="bklogo-choose-login" src={logo2} alt="bklogo" />
        <div className="name-choose-login">
          BK Fast Automated Printing Service{" "}
        </div>
      </div>

      <div className="row d-flex justify-content-center align-items-center">
        <p className="texts text-center">Dịch vụ xác thực tập trung</p>
        <div class="col-md-9 col-lg-6 col-xl-5">
          
          <p className="text1s">Administrator - BKPrint</p>
          <p className="notice1">Bạn cần dùng tài khoản admin để đăng nhập.</p>
          <img src={logo3} class="img-fluid" alt="Sample image" />
        </div>

        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <form onSubmit={handleSubmit}>
            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
              <p class="lead fw-normal mb-0 me-3 loginframe">Nhập thông tin tài khoản</p>
            </div>
            <hr class="my-4" />

            <div class="mb-3">
              <input
                className="username"
                type="text"
                placeholder="Tên đăng nhập"
                value={username}
                onChange={handleOnChange}
              />
            </div>
            <div class="mb-3 pass">
              <Password onChange={handleOnChange1} value={password} />
            </div>
            <div class="mb-3 help">
              <NavLink to="/help">Trợ giúp đăng nhập?</NavLink>
            </div>
            <Button className="logbutt" type="submit">
              Đăng nhập
            </Button>
          </form>
          <ToastContainer />
        </div>
      </div>

      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5">
        <Footer />
      </div>
    </div>
  );
};

export default AdminLogin1;
