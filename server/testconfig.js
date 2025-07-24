import nodemailer from 'nodemailer';

async function testSMTP() {
  let transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: "abs-certificates@um6p.ma",
      pass: "Um6p@2023",
    },
    tls: {
      minVersion: "TLSv1.2",
      rejectUnauthorized: false,
    },
  });

  try {
    await transporter.verify();
    console.log("✅ Connexion SMTP OK !");
  } catch (err) {
    console.error("❌ Erreur SMTP :", err);
  }
}

testSMTP();
