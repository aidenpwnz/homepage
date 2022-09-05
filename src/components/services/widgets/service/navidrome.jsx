import useSWR from "swr";

import Widget from "../widget";
import Block from "../block";
import md5 from "md5";
import * as randomstring from "randomstring";

export default function Navidrome({ service }) {
  const config = service.widget;

  const fetcher = async (reqUrl) => {
    const { url, username, password } = config;

    const salt = randomstring.generate(10);
    const hashedPassword = md5(`${password}${salt}`);
    const finalUrl = `${url}${reqUrl}?u=${username}&t=${hashedPassword}&s=${salt}&v=1.16.1&c=myapp`;

    const res = await fetch(finalUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((str) => new window.DOMParser().parseFromString(str, "text/xml"));

    return res;
  };

  const { data: infoData, error: infoError } = useSWR(`/rest/getNowPlaying`, fetcher);

  if (infoError) {
    console.log(infoError);
    return <Widget error="Navidrome API Error" />;
  }

  if (!infoData) {
    return (
      <Widget>
        <Block label="Now Playing" value={"-"} />
      </Widget>
    );
  }

  const nowPlaying =
    infoData.getElementsByTagName("entry")[0] &&
    `${infoData.getElementsByTagName("entry")[0].getAttribute("artist")} - ${infoData
      .getElementsByTagName("entry")[0]
      .getAttribute("title")}`;

  return (
    <Widget>
      <Block label="Now Playing" value={nowPlaying.length > 20 ? nowPlaying.slice(0, 30) + "..." : nowPlaying} />
    </Widget>
  );
}
