import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import dayjs from "dayjs";
import CircularProgress from "@mui/material/CircularProgress";
import { DatePicker } from "@mui/x-date-pickers";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../utils/header";
import Footer from "../../utils/footer";
import profileImg from "../../assets/N 1.png";
import {
  getStudentEmail,
  getStudentFaculty,
  getStudentName,
  getStudentPrintingHistory,
  getStudentRemainingPages,
  getStudentTransactionHistory,
  getStudentRemainingMoney,
} from "../../../../controllers/student/getFromStudent";
import { UserContext } from "../../../../controllers/UserProvider";

const Users = () => {
  const [value, setValue] = useState(dayjs("2003-03-10"));
  const [value2, setValue2] = useState(dayjs("2024-1-1"));
  const [value3, setValue3] = useState(dayjs("2003-03-10"));
  const [value4, setValue4] = useState(dayjs("2024-1-1"));
  const [beforePrint, setBeforePrint] = useState(dayjs("2003-03-10"));
  const [afterPrint, setAfterPrint] = useState(dayjs("2024-1-1"));
  const [beforeTran, setBeforeTran] = useState(dayjs("2003-03-10"));
  const [afterTran, setAfterTran] = useState(dayjs("2024-1-1"));
  const [A3Printed, setA3Printed] = useState(0);
  const [A4Printed, setA4Printed] = useState(0);
  const [A5Printed, setA5Printed] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [faculty, setFaculty] = useState("");
  const [printList, setPrintList] = useState([]);
  const [tranList, setTranList] = useState([]);
  const [remainingPages, setRemainingPages] = useState(0);
  const { stdID, compareTimes } = useContext(UserContext);
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleFilteringPrint = () => {
    setBeforePrint(value.format("HH:mm:ss, DD/MM/YYYY"));
    setAfterPrint(value2.format("HH:mm:ss, DD/MM/YYYY"));
  };

  const handleFilteringTran = () => {
    setBeforeTran(value3.format("HH:mm:ss, DD/MM/YYYY"));
    setAfterTran(value4.format("HH:mm:ss, DD/MM/YYYY"));
  };

  const verifyAuthentication = async () => {
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
    return status ? null : (removeCookie("token"), navigate("/Login1"));
  };

  useEffect(() => {
    verifyAuthentication();
  }, [cookies, navigate, removeCookie]);

  useEffect(() => {
    const fetchData = async () => {
      const name = await getStudentName(parseInt(stdID));
      const email = await getStudentEmail(parseInt(stdID));
      const faculty = await getStudentFaculty(parseInt(stdID));
      setName(name);
      setEmail(email);
      setFaculty(faculty);
      setBalance(await getStudentRemainingMoney(parseInt(stdID)));
    };
    fetchData();
  }, [stdID]);

  useEffect(() => {
    const fetchData = async () => {
      const printingHistory = await getStudentPrintingHistory(parseInt(stdID));
      const transactionHistory = await getStudentTransactionHistory(parseInt(stdID));
      setPrintList(printingHistory.reverse());
      setTranList(transactionHistory.reverse());
      let a3 = 0, a4 = 0, a5 = 0;
      printingHistory.forEach(item => {
        if (item.paperType[1] === "3") a3 += item.printedPages;
        else if (item.paperType[1] === "4") a4 += item.printedPages;
        else if (item.paperType[1] === "5") a5 += item.printedPages;
      });
      setA3Printed(a3);
      setA4Printed(a4);
      setA5Printed(a5);
      setLoading(false);
    };
    fetchData();
  }, [stdID]);

  useEffect(() => {
    const fetchData = async () => {
      setRemainingPages(await getStudentRemainingPages(parseInt(stdID)));
    };
    fetchData();
  }, [stdID]);

  return (
    <div className="container mt-4">
      <Header />
      <div className="row mt-5">
        <div className="col-lg-4">
          <div className="card-body text-center">
            <img src={profileImg} alt="Profile" className="rounded-circle img-fluid" style={{ width: "150px", height: "150px" }} />
            <h3 className="my-3">{name}</h3>
            <p className="text-muted">MSSV: {stdID}</p>
            <button className="btn btn-outline-danger" onClick={() => navigate("/Home")}>Thoát</button>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <h3 className="mb-0">Email: </h3>
                </div>
                <div className="col-sm-9 text-secondary">
                  <h3>{email}</h3>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-sm-3">
                  <h3 className="mb-0">Ngành học: </h3>
                </div>
                <div className="col-sm-9 text-secondary">
                  <h3>{faculty}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <h4 className="mb-3">Lịch sử in</h4>
        <div className="row">
          <div className="col-md-5 mb-3">
            <DatePicker
              label="Từ ngày"
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </div>
          <div className="col-md-5 mb-3">
            <DatePicker
              label="Đến ngày"
              value={value2}
              onChange={(newValue) => setValue2(newValue)}
            />
          </div>
          <Button className="col-md-2 btn btn-primary" onClick={handleFilteringPrint}>
            Tìm kiếm
          </Button>
        </div>

        {loading ? (
          <div className="text-center mt-4">
            <CircularProgress />
            <p>Loading ...</p>
          </div>
        ) : (
          <table className="table table-bordered mt-4">
            <thead>
              <tr>
                <th>Thời gian</th>
                <th>Tên file</th>
                <th>Số tờ</th>
                <th>Loại giấy</th>
                <th>Số mặt</th>
                <th>Địa điểm</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {printList.map((val, key) => (
                <tr key={key}>
                  <td>{val.time}</td>
                  <td>{val.filename}</td>
                  <td>{val.printedPages}</td>
                  <td>{val.paperType}</td>
                  <td>{val.sided === 1 ? "In một mặt" : "In hai mặt"}</td>
                  <td>{val.location}</td>
                  <td>Đã hoàn tất</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="sum1">
          <span>Số tờ </span>
          <div className="sum1Tex">
            A3 đã in: {A3Printed}
            <br />
            A4 đã in: {A4Printed}
            <br />
            A5 đã in: {A5Printed}
          </div>
        </div>
        <hr className="secondBreak" />
        <div className="buyHis">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "30px",
            }}
          >
            <div className="buyHisTex">Lịch sử mua</div>
            <div>Balance: {balance} VND</div>
            <Button id="addPrinterBtn" onClick={() => navigate("/Payment")}>
              Mua thêm giấy
            </Button>
          </div>
          <div className="datePrint">
            <div className="datePickerContainer">
              <DatePicker
                label="Từ ngày"
                value={value3}
                onChange={(newValue) => setValue3(newValue)}
              />
              <DatePicker
                label="Đến ngày"
                value={value4}
                onChange={(newValue) => setValue4(newValue)}
              />
              <Button className="upd" onClick={() => handleFilteringTran()}>
                {" "}
                Tìm kiếm{" "}
              </Button>
            </div>
          </div>
        </div>
        <div className="buyHis1-container">
          {loading ? (
            <div className="loading">
              <CircularProgress />
              <div>Loading ... </div>
            </div>
          ) : (
            <table className="buyHis1">
              <tr className="row1">
                <tr className="row1">
                  <th className="hea1">Thời gian</th>
                  <th className="hea1">Số tiền</th>
                  <th className="hea1">Số tờ</th>
                  <th className="hea1">Loại giấy</th>
                </tr>
                {tranList
                  .filter((val) => {
                    const a = compareTimes(
                      String(beforeTran),
                      String(val.time)
                    );
                    const b = compareTimes(String(afterTran), String(val.time));
                    return a <= 0 && b >= 0;
                  })
                  .map((val, key) => {
                    return (
                      <tr className="row1" key={key}>
                        <td className="dat1">
                          {val.time /* .format("HH:mm:ss, DD/MM/YYYY") */}
                        </td>
                        <td className="dat1">{val.price}</td>
                        <td className="dat1">{val.purchasedPages}</td>
                        <td className="dat1">{val.purchasedPaperType}</td>
                      </tr>
                    );
                  })}
              </tr>
            </table>
          )}
        </div>
        <span className="sum2">Số tờ còn lại: {remainingPages}(A4)</span>
      </div>
      <Footer />
    </div>
  );
};

export default Users;
