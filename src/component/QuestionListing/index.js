import React, { useEffect, useState } from "react";

import QuestionListing from "./QuestionListing";

export default ({ questionAns }) => {
  const [ip, setIp] = useState("");
  const getIp = async () => {
    const req = await fetch("https://api.ipify.org?format=json");
    const { ip } = await req.json();
    setIp(ip);
  };

  useEffect(() => {
    getIp();
  }, []);

  return <QuestionListing questionListing={questionAns} ipAddress={ip} />;
};
