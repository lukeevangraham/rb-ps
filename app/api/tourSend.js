import axios from "axios";

export default function handler(req, res) {

  console.log("API Route hit!")


  let data = JSON.stringify({
    recipients: [{ address: "luke@grahamwebworks.com" }, { address: "preschooldirector@rbcpc.org" }],
    content: {
      from: {
        email: "luke@mail.grahamwebworks.com",
        name: "RBCPCPRESCHOOL.ORG",
      },
      subject: "Tour form submission from rbcpcpreschool.org",
      text: `${req.body.firstName} ${req.body.lastname} just sent this message via RBCPCPRESCHOOL.ORG's tour form
        
        First name: ${req.body.firstName}
        Last name: ${req.body.lastname}
        Phone: ${req.body.phone}
        Email: ${req.body.email}
        Day of week: ${req.body.dayOfWeek}
        Time: ${req.body.time}
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

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      res.status(200).json({ status: 200 });
    })
    .catch((error) => console.log(error));
}
