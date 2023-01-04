export const fetchM3U = fetch(
  "http://localhost:3000/m3u/playlist.m3u8"
)
  .then((res) => {
    return res.body.pipeThrough(new TextDecoderStream()).getReader();
  })
  .then((r) => {


    return r.read().then(({ value, done }) => {
      const countries = [];
      const playlist = JSON.parse(value);

      playlist.forEach((channel) => {
        let country = channel.tvg.country;
        if (!countries.includes(country)) {
          countries.push(country);
        }
      });
      return {
        medias: playlist,
        countries: countries,
      };
    });
  });
