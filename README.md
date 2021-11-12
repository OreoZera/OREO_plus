[![Typing SVG](https://readme-typing-svg.herokuapp.com?color=%2313EAF7&size=23&center=true&lines=Hí+mn%2C+Tui+là+Oreo!;Chúc+bạn+chạy+bot+vui+vẻ!)](https://github.com/OreoZera/Oreo_plus) 

<p align="center">
	<img alt="size" src="https://img.shields.io/github/repo-size/OreoZera/OREO_plus.svg?style=flat-square&label=size">
	<img alt="code-version" src="https://img.shields.io/badge/dynamic/json?color=red&label=code%20version&prefix=v&query=%24.version&url=https%3A%2F%2Fraw.githubusercontent.com%2FOreoZera%2FOREO_plus%2Fmaster%2Fpackage.json&style=flat-square">
	<a href="https://github.com/OreoZera/OREO_plus/commits"><img alt="commits" src="https://img.shields.io/github/commit-activity/m/OreoZera/OREO_plus.svg?label=commit&style=flat-square"></a>
    	<img alt="visitors" src="https://visitor-badge.laobi.icu/badge?page_id=OreoZera.OREO_plus">
</p>

<p align="center">
    <img align="center" alt="PNG" src="https://media0.giphy.com/media/cBncDNrdxga2I/giphy.gif" />
</p> 

<h1>HƯỚNG DẪN CHẠY BOT CHAT TRÊN CÁC NỀN TẢNG</h1>

> :warning: **TRƯỚC KHI CHẠY BOT CÁC BẠN PHẢI CHẤP NHẬN VIỆC ACC FACEBOOK BỊ QUÉT VÀ DIE, MỌI KHIẾU NẠI VỀ ACC FACEBOOK BÊN MÌNH KHÔNG CHỊU TRÁCH NHIỆM**

**Các link github có thể sử dụng để cài Bot**

- 🍪 **[OreoZera](https://github.com/OreoZera/OREO_plus)** 
- 🍪 **[Jukie](https://github.com/D-Jukie/jukie_main)**
- 🍪 **[Mai Huy Bảo](https://github.com/maihuybao/MiraiBypassGban)**
- 🍪 **[Crystal](https://github.com/Crystal7826/mirai-crystal-master)**
- 🍪 **[Klefo0](https:/github.com/Klefo0/mirai_maintain)**

<h1>Đối với Windows/VPS</h1> 

**Công cụ cần chuẩn bị cài đặt**

- **[Git](https://git-scm.com/)** 
- **[Nodejs](https://nodejs.org/en/)**
- **[Python](https://www.python.org/)** - **không thiết yếu**
- **Download zip** ở các link ở trên về máy rồi **giải nén** ra hoặc sử dụng: **git clone [link github]**
- Vào thư mục **đã giải nén** hoặc **đã git clone** ở phía trên
- Mở thư mục **config.json** để chỉnh thông tin bot
Ví dụ như: **name**, **prefix** và **UID** của adm...
- Lấy **fbstate** bằng cách dùng **Git bash here** ngoài **desktop**
```diff
git clone https://github.com/c3cbot/c3c-fbstate.git
```
- Lên trang gg đăng nhập fb, dùng **công cụ cho nhà p.triển** upload file vừa git ở trên để tải **fbstate** về
- Kéo file **fbstate.json** vừa tải vào **thư mục bot**

# Cài đặt - Gõ lệnh theo sau
1. **Đầu tiên** 
- Mở **Windows PowerShell** ở quyền **Administrator** thông qua **startMenu**
- Sau đó nhập:
```diff
npm install windows-build-tools
```
- Đợi chạy xong phần **python** thì **tắt** đi

2. **Run**
- Vào file bot - Sau đó **Click vào thanh địa chỉ đường dẫn tại đó** và gõ: **cmd** để mở Command Prompt trên máy tính của bạn
- Kiểm ra xem file bot có tệp **package.json** hay ko, rồi nhập:
```diff
npm install
```
- Đợi chạy xong, nhập:
```diff
npm audit fix
```
- Tận hưởng nào🥴 Nhập:
```diff
npm start
```
- Đợi nó load modules, tùy theo tốc độ mạng. **Xong!**
- **Lưu Ý: Khi cài đặt xong phải tắt đi và khởi động lại để tránh gặp lỗi không mong muốn.**




<h1>Đối với Replit - Dùng trên ĐT hoặc PC</h1> 

**Công cụ cần chuẩn cài đặt**

- **Một tài khoản trên [Replit](https://replit.com/)**

**Thứ tự các thao tác trên [Replit](https://replit.com/)**

- **+ New repl**
- Qua tab **Import from github**
- Nhập link **github** vào **from** và **click** vào nút **Import from github**
- Đợi repl **Cloning**
- Chọn **select language** là **Bash** và **configure the run button** là **npm start** xong rồi ấn **done**
- Đợi tầm 10s nếu không tự **refesh trang thì refesh thủ công bằng phím F5 hoặc nút refesh trên thanh địa chỉ**

**Cách cài đặt - gõ từng lệnh theo thứ tự dưới đây và đợi cài đặt**

- Chuyển qua tab **console** và gõ các lệnh theo thứ tự sau:
- **npm install** - đợi khoảng 3-5p tùy theo tốc độ mạng
- **npm audit fix**
- **Ấn nút run trên màn hình** - đợi khoảng 3-5p tùy theo tốc độ mạng
- **Lưu Ý: Khi cài đặt xong phải tắt đi và khởi động lại để tránh gặp lỗi không mong muốn.**

**Cách cài đặt treo 24/24 trên uptimerobot**

- Vào chỉnh sửa file **mirai.js**
- Thêm đoạn code sau vào dòng 1 của file **mirai.js**

```diff
const app = require ("express") ();  app.get ('/', (req, res) => {res.send ("RUN BOT");});app.listen(process.env. PORT);    
```

- **npm install express**
- **npm audit fix**
- **Ấn nút run trên màn hình** - đợi khoảng 3-5p tùy theo tốc độ mạng
- **Copy link** ở trang replit. Link có định dạng **https://miraiv2.nameuser.repl.co**
- **Tạo tài khoản trên trang [UptimeRobot](https://uptimerobot.com/)**

**Thứ tự các thao tác trên [UptimeRobot](https://uptimerobot.com/)**


- **+  Add New Monitor**
- **Monitor Type** chọn **HTTP(s)**
- **Friendly Name** đặt tùy ý
- **URL (or IP)**: Dán link vừa copy bên **[Replit](https://replit.com/)** 
- Ấn **tick** vào ô  **Select "Alert Contacts To Notify** (nhận thông báo từ email)
- Ấn **Create Monitor** để hoàn thành quá trình tạo **uptime**


<h1>CÁC LỖI THƯỜNG GẶP PHẢI</h1> 

**UPDATE SOON...**
# Contact and donate for me❤
<p align="center">

&nbsp; <a href="https://www.facebook.com/proOreoZera" target="_blank" rel="noopener noreferrer"><img src="https://img.icons8.com/plasticine/100/000000/facebook.png"  width="100" /></a>
&nbsp; <a href="mailto:oreozera.pro@gmail.com" target="_blank" rel="noopener noreferrer"><img src="https://img.icons8.com/plasticine/100/000000/gmail.png"  width="100" /></a>
</p>

