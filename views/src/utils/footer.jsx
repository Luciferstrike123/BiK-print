import "./footer.css"
const Footer = () => {
  return (
    <div>
      <div className="wrapper-footer">
        <div className="left-footer">Bản quyền © The Liems</div>
        <div className="right-footer">
          <span className="phat-trien-boi-thieu-nhi-cc02">
            <span>Phát triển bởi The Liems</span>
            <span className="span">{` | `}</span>
            <span className="policy">{`Điều khoản & điều kiện`}</span>
            <span className="span1">{` | `}</span>
            <span className="policy">Chính sách pháp lý</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer

