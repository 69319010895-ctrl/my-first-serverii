const http = require('http');
// 1. เรียกใชงาน Pool จากไลบรารี pg สำหรับจัดการการเชื่อมตอฐานขอมูล
const { Pool } = require('pg');
// 2. ตั้งคาการเชื่อมตอ โดยดึง URL มาจาก Environment Variable ของ Railway
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const port = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  try {
    // 3. ขอเชื่อมตอและสงคำสั่ง SQL ไปดึงขอมูลจากตาราง students
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM students');
    client.release(); // คนืการเชื่อมตอเมื่อใชงานเสร็จ

    // 4. นำขอมูลที่ได(result.rows) มาประกอบเปนตาราง HTML
    let html = `
    <!DOCTYPE html>
    <html lang="th">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>ฐานขอมูลนักศึกษา</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .container {
          background: white;
          border-radius: 15px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          max-width: 900px;
          width: 100%;
          overflow: hidden;
          animation: slideIn 0.5s ease-out;
        }

        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }

        .header h1 {
          font-size: 28px;
          margin-bottom: 8px;
          font-weight: 600;
        }

        .header p {
          font-size: 14px;
          opacity: 0.9;
        }

        .content {
          padding: 30px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        thead {
          background: #f8f9fa;
        }

        th {
          padding: 15px;
          text-align: left;
          font-weight: 600;
          color: #333;
          border-bottom: 3px solid #667eea;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        td {
          padding: 15px;
          border-bottom: 1px solid #e9ecef;
          color: #555;
          font-size: 15px;
        }

        tbody tr {
          transition: background-color 0.3s ease;
        }

        tbody tr:hover {
          background-color: #f8f9fa;
        }

        tbody tr:last-child td {
          border-bottom: none;
        }

        .count {
          margin-top: 20px;
          padding: 15px;
          background: #e7f3ff;
          border-left: 4px solid #667eea;
          border-radius: 5px;
          color: #333;
          font-size: 14px;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 600px) {
          .header {
            padding: 20px;
          }

          .header h1 {
            font-size: 22px;
          }

          .content {
            padding: 15px;
          }

          th, td {
            padding: 10px;
            font-size: 13px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📚 ฐานขอมูลนักศึกษา</h1>
          <p>ทดสอบการเชื่อมต่อระบบฐานข้อมูล</p>
        </div>
        <div class="content">
          <table>
            <thead>
              <tr>
                <th>รหัสนักศึกษา</th>
                <th>ชื่อ-นามสกุล</th>
              </tr>
            </thead>
            <tbody>
    `;

    // วนลูปนำขอมูลแตละแถวมาแสดง
    result.rows.forEach(row => {
      html += `<tr><td>${row.student_id}</td><td>${row.student_name}</td></tr>`;
    });

    html += `
            </tbody>
          </table>
          <div class="count">
            ✓ จำนวนนักศึกษาทั้งหมด: <strong>${result.rows.length}</strong> คน
          </div>
        </div>
      </div>
    </body>
    </html>
    `;

    res.end(html);
  } catch (err) {
    // กรณเีชื่อมตอไมไดหรือเขียนชื่อตารางผิด
    console.error(err);
    const errorHtml = `
    <!DOCTYPE html>
    <html lang="th">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>เกิดข้อผิดพลาด</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .error-container {
          background: white;
          border-radius: 15px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          max-width: 600px;
          width: 100%;
          padding: 40px;
          text-align: center;
          animation: slideIn 0.5s ease-out;
        }

        .error-icon {
          font-size: 60px;
          margin-bottom: 20px;
        }

        h1 {
          color: #f5576c;
          margin-bottom: 15px;
          font-size: 24px;
        }

        .error-message {
          background: #ffe5e5;
          border-left: 4px solid #f5576c;
          padding: 15px;
          border-radius: 5px;
          color: #555;
          font-family: monospace;
          font-size: 13px;
          text-align: left;
          margin-top: 20px;
          word-break: break-word;
        }

        p {
          color: #666;
          line-height: 1.6;
          margin-bottom: 10px;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      </style>
    </head>
    <body>
      <div class="error-container">
        <div class="error-icon">⚠️</div>
        <h1>เกิดข้อผิดพลาด!</h1>
        <p>ไม่สามารถเชื่อมต่อฐานข้อมูลได้</p>
        <div class="error-message">
          <strong>ข้อความข้อผิดพลาด:</strong><br>
          ${err.message}
        </div>
      </div>
    </body>
    </html>
    `;
    res.end(errorHtml);
  }
});

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
