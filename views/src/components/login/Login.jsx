import React from "react";
import "./LoginStyles.css";

import logo from "../../assets/8808785-1@2x.png";
import logo1 from "../../assets/chm-1@2x.png";
import logo2 from "../../assets/oisp-official-logo01-1@2x.png";

import { useNavigate } from "react-router-dom";
import ScrollToTop from "../../routes/scrollToTop";
import { useContext } from "react";
import { UserContext } from "../../../../controllers/UserProvider";

import Footer from "../../utils/footer";

const Login = () => {
  const { printerCount } = useContext(UserContext);
  console.log(printerCount);
  const navigate = useNavigate();
  return (
    <div className="container-fluid">
      <div className="section1" onClick={() => navigate("Choose")}>
        Đăng nhập
      </div>

      <div className="header-choose-pre">
        <img className="bklogo-choose" src={logo2} alt="bklogo" />
        <div className="name-choose">BK Fast Automated Printing Service </div>
      </div>

      <div className="welcome-container-pre">
        <img className="chm-1-icon-student" alt="" src={logo1} />
        <div className="welcome-student">
          <span className="statement1-student">Chào mừng bạn đến với</span>
          <span className="statement2-student">HỆ THỐNG IN BÁCH KHOA</span>
        </div>
      </div>

      <div className="intro-container-pre">
        <div className="white-space-left-pre"></div>

        <div className="wrapper1-student">
          <div className="column-1-pre">
            <div className="printer-img-container-pre">
              <img className="printer-img-pre" alt="" src={logo} />
            </div>
          </div>

          <div className="column-2-pre">
            <div className="heading-student-pre">
              Tải lên tài liệu và in tại máy in gần bạn!
            </div>
            <div className="paragraph-student-pre">
              Đại học Bách Khoa TP.HCM có hệ thống máy in hiện đại nhất trong
              khối Đại học Quốc gia. Bạn hoàn toàn có thể tải lên tập tin và
              chọn máy in gần bạn để in trong vòng 5 phút.
            </div>
            <div className="button-set-pre">
              <button
                className="master-primary-button-pre"
                onClick={() => navigate("Choose")}
              >
                Đăng nhập ngay
              </button>
            </div>
          </div>
        </div>
        <div className="white-space-right-pre"></div>
      </div>

      <Footer></Footer>
      <ScrollToTop />
    </div>
  );
};

export default Login;
