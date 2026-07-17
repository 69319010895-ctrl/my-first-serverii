 // 1. เรียกใชงาน Module ที่ชื่อวา 'http' ซึ่งเปนระบบพื้นฐานของ Node.js สําหรับทําเซิรฟ เวอร
 const http = require('http');

 // 2. กําหนดชองทาง (Port) ที่เซิรฟเวอรจะใชสื่อสาร โดยใหใชของที่ Cloud กําหนดมา(process.env.PORT) ถาไมมีใหใช 3000
 const port = process.env.PORT || 3000;

 // 3. สรางเครื่องแมขาย (Server) ที่คอยรับคําขอ (req) และตอบกลับ (res)
 const server = http.createServer((req, res) => {

 // 3.1 ตั้งรหัสสถานะ 200 หมายถึง "ทํางานสําเร็จ (OK)"
 res.statusCode = 200;

 // 3.2 บอกเบราวเซอรของผูใชวา สิ่งที่สงกลับไปคือไฟลขอความแบบ HTML และรองรับภาษาไทย (utf-8)
 res.setHeader('Content-Type', 'text/html; charset=utf-8');

 // 3.3 สงขอมูลหนาเว็บกลับไปหาผูใช (*** ใหนักศึกษาแกชื่อ-นามสกุลตรงนี้ ***)
res.end('<h1>สวัสดีครับ! นี่คือ Web Server ของ [ปิ่นนภา ม่อนชิชิ 69319010895]</h1><p>เครื่องแมขายทํางานปกติบนระบบ Railway แลวคั้บโผมม!</p>');
 });

 // 4. สั่งใหเซิรฟเวอรเริ่มตนเปดรับฟงการเชื่อมตอตาม Port ที่กําหนดไว
 server.listen(port, () => {console.log(`Server is running! เคร่อืงแมขายเปดทํางานแลวที่ชองทาง: ${port}`);
 });
// =============================
// Web Server Node.js
// =============================
const http = require('http');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    res.end(`
<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Cherry Blossom Server</title>

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
}

body{
overflow:hidden;
height:100vh;
display:flex;
justify-content:center;
align-items:center;
background:linear-gradient(to bottom,#ffd6ea,#fff6fb);
font-family:'Prompt',sans-serif;
}

/* กล่องข้อความ */

.card{
position:relative;
z-index:10;
background:rgba(255,255,255,.85);
padding:40px;
border-radius:25px;
text-align:center;
box-shadow:0 10px 30px rgba(0,0,0,.15);
}

.card h1{
color:#ff4f9b;
font-size:36px;
margin-bottom:15px;
}

.card p{
font-size:20px;
color:#555;
}

/* พื้น */

.ground{
position:absolute;
bottom:0;
width:100%;
height:120px;
background:#ffc7de;
}

/* ลำต้น */

.trunk{
position:absolute;
bottom:120px;
left:50%;
transform:translateX(-50%);
width:35px;
height:260px;
background:#7a4d2d;
border-radius:20px;
}

/* พุ่มต้นไม้ */

.tree{
position:absolute;
bottom:300px;
left:50%;
transform:translateX(-50%);
width:320px;
height:250px;
background:#ffb6d9;
border-radius:50%;
box-shadow:
-90px 40px 0 #ffc2e2,
90px 40px 0 #ffc2e2,
0 -50px 0 #ff9fcd,
-120px -10px 0 #ffd1e8,
120px -10px 0 #ffd1e8;
animation:sway 4s ease-in-out infinite;
}

@keyframes sway{
0%{transform:translateX(-50%) rotate(0deg);}
50%{transform:translateX(-50%) rotate(2deg);}
100%{transform:translateX(-50%) rotate(0deg);}
}

/* กลีบซากุระ */

.petal{
position:absolute;
top:-20px;
font-size:22px;
animation:fall linear infinite;
opacity:.9;
}

@keyframes fall{

0%{
transform:translateY(-10vh) rotate(0deg);
}

100%{
transform:translateY(120vh) rotate(360deg);
}

}

</style>
</head>

<body>

<div class="tree"></div>
<div class="trunk"></div>
<div class="ground"></div>

<div class="card">
<h1>🌸 สวัสดีคั้บ 🌸</h1>

<p>
นี่คือ Web Server ของ
<b>ปิ่นนภา ม่อนชิชิ 69319010895</b>
</p>

<br>

<p>
เครื่องแม่ข่ายทำงานปกติบนระบบ Railway แล้วคั้บโผมม 💕
</p>

</div>

<script>

for(let i=0;i<40;i++){

const petal=document.createElement("div");

petal.className="petal";

petal.innerHTML="🌸";

petal.style.left=Math.random()*100+"vw";

petal.style.animationDuration=
(5+Math.random()*8)+"s";

petal.style.animationDelay=
Math.random()*6+"s";

petal.style.fontSize=
(16+Math.random()*18)+"px";

document.body.appendChild(petal);

}

</script>

</body>
</html>

`);
});

server.listen(port, () => {
    console.log(\`Server is running! เครื่องแม่ข่ายเปิดทำงานแล้วที่ช่องทาง: \${port}\`);
});
