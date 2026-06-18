import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, phone, email, area, budget, message, source, quizAnswers, matchedProfile } = data;

    // Email configuration from environment variables
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587');
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const targetEmail = 'asquaresolutions51@gmail.com';

    // Log the submission to the server console for immediate visibility
    console.log(`[Lead received from ${source || 'Unknown'}]`, {
      name,
      phone,
      email,
      area,
      budget,
      message,
      matchedProfile,
      quizAnswers
    });

    let mailSent = false;
    let responseMessage = 'Lead saved successfully.';

    if (smtpUser && smtpPass) {
      // Create Nodemailer Transporter
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      // Construct Email Subject
      const emailSubject = `[A Square Solution Lead] ${name || 'New Lead'} - ${source || 'Contact Form'}`;

      // Construct HTML Body with styling matching the brand identity
      let htmlBody = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #D8C3A5; background-color: #F7F1E8;">
          <h2 style="color: #24211E; border-bottom: 2px solid #B7955B; padding-bottom: 10px; font-family: Georgia, serif;">
            New Lead Submission
          </h2>
          <p style="font-size: 14px; color: #24211E;">
            A new lead has been captured from the website via the <strong>${source || 'Direct Channels'}</strong>.
          </p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background-color: #ffffff;">
              <td style="padding: 10px; border: 1px solid #D8C3A5; font-weight: bold; width: 35%;">Name:</td>
              <td style="padding: 10px; border: 1px solid #D8C3A5;">${name || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #D8C3A5; font-weight: bold;">Phone/WhatsApp:</td>
              <td style="padding: 10px; border: 1px solid #D8C3A5; font-family: monospace;">${phone || 'N/A'}</td>
            </tr>
            <tr style="background-color: #ffffff;">
              <td style="padding: 10px; border: 1px solid #D8C3A5; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border: 1px solid #D8C3A5;">${email || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #D8C3A5; font-weight: bold;">Estimated Area (Sq.Ft.):</td>
              <td style="padding: 10px; border: 1px solid #D8C3A5;">${area || 'N/A'}</td>
            </tr>
            <tr style="background-color: #ffffff;">
              <td style="padding: 10px; border: 1px solid #D8C3A5; font-weight: bold;">Expected Budget:</td>
              <td style="padding: 10px; border: 1px solid #D8C3A5;">${budget || 'N/A'}</td>
            </tr>
      `;

      if (matchedProfile) {
        htmlBody += `
            <tr>
              <td style="padding: 10px; border: 1px solid #D8C3A5; font-weight: bold; color: #A65F3D;">Matched Vibe:</td>
              <td style="padding: 10px; border: 1px solid #D8C3A5; font-weight: bold; color: #A65F3D;">${matchedProfile}</td>
            </tr>
        `;
      }

      if (message) {
        htmlBody += `
            <tr style="background-color: #ffffff;">
              <td style="padding: 10px; border: 1px solid #D8C3A5; font-weight: bold;">Desired Requirements:</td>
              <td style="padding: 10px; border: 1px solid #D8C3A5;">${message}</td>
            </tr>
        `;
      }

      htmlBody += `
          </table>
      `;

      if (quizAnswers && Object.keys(quizAnswers).length > 0) {
        htmlBody += `
          <h3 style="color: #24211E; margin-top: 25px; border-bottom: 1px solid #D8C3A5; padding-bottom: 5px;">Quiz Responses</h3>
          <ul style="list-style-type: square; padding-left: 20px;">
        `;
        for (const [key, val] of Object.entries(quizAnswers)) {
          htmlBody += `<li style="margin-bottom: 6px; font-size: 13px;"><strong>${key}:</strong> ${val}</li>`;
        }
        htmlBody += `</ul>`;
      }

      htmlBody += `
          <div style="margin-top: 30px; font-size: 11px; color: #B7955B; border-top: 1px solid #D8C3A5; padding-top: 10px; text-align: center;">
            A Square Solution • Jaipur Heritage Interiors
          </div>
        </div>
      `;

      // Send the mail
      await transporter.sendMail({
        from: `"A Square Solution Website" <${smtpUser}>`,
        to: targetEmail,
        subject: emailSubject,
        html: htmlBody,
      });

      mailSent = true;
      responseMessage = 'Email notification sent successfully.';
    } else {
      responseMessage = 'Lead logged on server console. (Configure SMTP_USER and SMTP_PASS in .env.local to send emails)';
    }

    return NextResponse.json({ success: true, mailSent, message: responseMessage });
  } catch (error: any) {
    console.error('Error in /api/contact:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
