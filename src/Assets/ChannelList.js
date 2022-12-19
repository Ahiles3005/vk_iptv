// import { M3uParser } from "m3u-parser-generator";
import parser from "iptv-playlist-parser";

export const fetchM3U = fetch(
  "https://raw.githubusercontent.com/Free-TV/IPTV/master/playlist.m3u8"
)
  .then((res) => {
    return res.body.pipeThrough(new TextDecoderStream()).getReader();
  })
  .then((r) => {
    return r.read().then(({ value, done }) => {
      const countries = [];
      const playlist = parser.parse(value);
      console.log(playlist);
      playlist.items.forEach((channel) => {
        let country = channel.group.title;
        if (!countries.includes(country)) {
          countries.push(country);
        }
      });
      return {
        medias: playlist.items,
        countries: countries,
      };
    });
  });
