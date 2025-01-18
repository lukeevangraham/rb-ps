import axios from "axios";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const body = await req.json();

  let data = JSON.stringify({
    recipients: [{ address: "luke@grahamwebworks.com" }, { address: "preschooldirector@rbcpc.org" }],
    content: {
      from: {
        email: "luke@mail.grahamwebworks.com",
        name: "RBCPCPRESCHOOL.ORG",
      },
      subject: "Contact form submission from rbcpcpreschool.org",
      text: `${body.name} just sent this message via RBCPCPRESCHOOL.ORG's contact form
        
        Name: ${body.name}
        Phone: ${body.phone}
        Email: ${body.email}
        Message: ${body.message}
        `,
    },
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.sparkpost.com/api/v1/transmissions",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.SPARKPOST_API_KEY,
    },
    data: data,
  };

  const messageSubmissionResponse = await axios.request(config);

  if (messageSubmissionResponse.status === 200) {
    return NextResponse.json({ status: 200 });
  } else {
    console.log("ERROR", messageSubmissionResponse.statusText);
  }
};
