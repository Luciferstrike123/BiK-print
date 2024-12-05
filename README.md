# BKPrint

## Giới thiệu

BKPrint là một Dịch vụ In Ấn Thông Minh dành cho sinh viên trường Đại học Bách Khoa TP.HCM (HCMUT). Hệ thống hỗ trợ in tài liệu một cách nhanh chóng, tiện lợi, và bảo mật, đáp ứng nhu cầu học tập của sinh viên.

## Phiên bản

Phiên bản hiện tại: **1.1.3**

Xem chi tiết lịch sử thay đổi tại tệp [CHANGELOG.md](https://github.com/Luciferstrike123/BiK-print/blob/main/CHANGELOG.md).

## Tài liệu

Tất cả tài liệu và sơ đồ quan trọng được lưu trữ tại thư mục **documents**:


## Tính năng

### Dành cho sinh viên:

- Tải tệp lên
- Lựa chọn máy in
- Cấu hình in (kích thước giấy, chế độ in, số bản in)
- Kiểm tra lịch sử in và thanh toán
- Kiểm tra số dư tài khoản in
- Kiểm tra trạng thái lệnh in
- Mua thêm trang in

### Dành cho nhân viên SPSO:

- Quản lý loại tệp được phép in
- Quản lý máy in (thêm, kích hoạt, hoặc vô hiệu hóa)
- Cấu hình hệ thống (thay đổi số trang mặc định, quyền loại tệp)
- Xem báo cáo sử dụng dịch vụ
- Theo dõi lịch sử in ấn

---

## Hướng dẫn sử dụng
Khởi tạo

```
npm run install-server      # Cài đặt các gói cho server
npm run controller-client   # Cấu hình controller cho client
npm run install-client      # Cài đặt các gói cho client
npm run build-client        # Xây dựng ứng dụng client
```

Chạy trên 2 cửa sổ terminal khác nhau
```
npm run start-server        # Chạy server
npm run start-client        # Chạy client
```

### Sinh viên:

1. Đăng nhập bằng tài khoản HCMUT SSO.
2. Chọn chức năng **Tải lên và in** để tải tệp.
3. Cấu hình in và chọn máy in phù hợp.
4. Hoàn tất việc in hoặc mua thêm trang nếu cần.

### Nhân viên SPSO:

1. Đăng nhập với quyền quản trị.
2. Sử dụng các công cụ quản lý máy in, cấu hình hệ thống, hoặc xem báo cáo.
3. Theo dõi lịch sử in và hỗ trợ sinh viên khi cần.

Cảm ơn bạn đã sử dụng BKPrint!
