import useSWR from "swr";

import Widget from "../widget";
import Block from "../block";
import { useEffect, useState } from "react";

export default function Qbittorrent({ service }) {
  const config = service.widget;
  const { url } = config;

  const [cookie, setCookie] = useState();

  const fetcher = async (reqUrl) => {
    const { url, username, password } = config;
    const loginUrl = new URL(`/api/v2/auth/login`, url);
    const body = { username: username, password: password };
    const myURL = `/api/proxy?url=${encodeURIComponent(loginUrl)}`;
    const testURL = `${url}/api/v2/auth/login`;

    const res = await fetch(testURL, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => response.json())
      .then((response) => console.log(response));

    // if (!cookie) {
    //   const res = await fetch(myURL, {
    //     method: "POST",
    //     body: JSON.stringify(body),
    //     headers: {
    //       "Content-Type": "application/json",
    //       Referer: "http://100.81.189.127:8080",
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then(
    //       async (data) =>
    //         await fetch(reqUrl, {
    //           method: "GET",
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //         })
    //     );
    //   return res.json();
    // } else {
    //   const res = await fetch(reqUrl, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   return res.json();
    // }
  };

  // const { data: infoData, error: infoError } = useSWR(`${url}/api/v2/transfer/info`, fetcher);

  useEffect(() => {
    fetcher("");
  });

  // if (infoError) {
  //   return <Widget error="NGINX Proxy Manager API Error" />;
  // }

  // if (!infoData) {
  //   return (
  //     <Widget>
  //       <Block label="Running" />
  //       <Block label="Stopped" />
  //       <Block label="Total" />
  //     </Widget>
  //   );
  // }

  // const enabled = infoData.filter((c) => c.enabled === 1).length;
  // const disabled = infoData.filter((c) => c.enabled === 0).length;
  // const total = infoData.length;

  return (
    <Widget>
      <Block label="Enabled" value="{enabled}" />
      <Block label="Disabled" value="{disabled}" />
      <Block label="Total" value="{total}" />
    </Widget>
  );
}
