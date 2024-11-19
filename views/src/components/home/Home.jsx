import React from "react";
import "./HomeStyles.css";
import Button from "react-bootstrap/Button";
import logo from "../../assets/8808785-1@2x.png";
import logo1 from "../../assets/chm-1@2x.png";
import logo2 from "../../assets/oisp-official-logo01-1@2x.png";
import logo3 from "../../assets/container.png";
import logo4 from "../../assets/375756243-688982619370253-4579776695205593531-n-1@2x.png";
import { useNavigate } from "react-router-dom";
import Login1 from "../login1/Login1";
import Header from "../../utils/header";
import Footer from "../../utils/footer";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/Login1");
      }
      const { data } = await axios.post(
        "http://localhost:3001/accounts",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status ? <></> : (removeCookie("token"), navigate("/Login1"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    navigate("/Login1");
  };
  return (
    <div className="trang-da-dang-nhap-student-home">
      <Header></Header>
      <div className="welcome-container">
        <img className="chm-1-icon-student" alt="" src={logo1} />
        <div className="welcome-student">
          <span className="statement1-student">Chào mừng bạn đến với</span>
          <span className="statement2-student">HỆ THỐNG IN BÁCH KHOA</span>
        </div>
      </div>

      <div className="container-fluid mx-auto p-6">
        <div className="d-flex align-items-start gap-4">
          {/* <!-- Left side - Printer Image --> */}
          <div className="flex-grow-1">
            <div class="bg-light rounded-3 p-4">
              <img
                src={logo}
                alt="Printer illustration"
                className="img-fluid"
              />
            </div>
          </div>

          {/* <!-- Right side - Content --> */}
          <div className="flex-grow-1 d-flex flex-column justify-content-between py-4">
            {/* <!-- Text content --> */}
            <div className="mb-4">
              <h2 className="h2 text-purple-900">
                Tải lên tài liệu và in tại máy in gần bạn!
              </h2>
              <p className="text-muted">
                Đại học Bách Khoa TP.HCM có hệ thống máy in hiện đại nhất trong khối Đại học Quốc gia.
                Bạn hoàn toàn có thể tải lên tập tin và chọn máy in gần bạn để in trong vòng 5 phút.
              </p>
            </div>

            {/* <!-- Buttons --> */}
            <div className="d-flex gap-2 mt-4">
              <button
                className="master-primary-button1"
                onClick={() => {
                  navigate("/Upload");
                }}
              >
                Tải lên và in
              </button>
              <button
                className="master-secondary-button1"
                onClick={() => navigate("/PrintLocate")}
              >
                Xem vị trí máy in
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
      <ToastContainer />
    </div>
  );
};

export default Home;
