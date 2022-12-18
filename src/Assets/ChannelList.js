import {M3uParser} from "m3u-parser-generator";


export const fetchM3U = fetch(
    "https://raw.githubusercontent.com/Free-TV/IPTV/master/playlist.m3u8"
)
    .then((res) => {
        return res.body.pipeThrough(new TextDecoderStream()).getReader();
    })
    .then((r) => {
        return r.read().then(({value, done}) => {
            const countries = []
            const playlist = M3uParser.parse(value);
            playlist.medias.forEach((channel) => {
                let country = channel.attributes['group-title'];
                if (!countries.includes(country)) {
                    countries.push(country)
                }
            })
            return {
                medias: playlist.medias,
                countries: countries
            };
        });
    });
