const fs = require('fs');
const https = require('https');
const parser = require("iptv-playlist-parser");


class Make {

    constructor() {
        this.chanellsItem = [];
        this.fileName = './public/m3u/playlist.m3u8';
        this.removeChanals = ['Religious', 'Music', 'Geo-blocked']
        this.EPG_LIST = [
            {
                country: 'AZ',
                url: "https://iptv-org.github.io/iptv/countries/az.m3u"
            },
            {
                country: 'AM',
                url: "https://iptv-org.github.io/iptv/countries/am.m3u"
            },
            {
                country: 'BY',
                url: "https://iptv-org.github.io/iptv/countries/by.m3u"
            },
            {
                country: 'KZ',
                url: "https://iptv-org.github.io/iptv/countries/kz.m3u"
            },
            {
                country: 'KG',
                url: "https://iptv-org.github.io/iptv/countries/kg.m3u"
            },
            {
                country: 'RU',
                url: "https://iptv-org.github.io/iptv/countries/ru.m3u"
            },
            {
                country: 'TJ',
                url: "https://iptv-org.github.io/iptv/countries/tj.m3u"
            },
            {
                country: 'TM',
                url: "https://iptv-org.github.io/iptv/countries/tm.m3u"
            },
            {
                country: 'UZ',
                url: "https://iptv-org.github.io/iptv/countries/uz.m3u"
            },

        ];
    }

    clearFile() {
        fs.truncate(this.fileName, err => {
            if (err) {
                throw err; // не удалось очистить файл
            }
        });

    }

    setItems(item) {
        this.chanellsItem.push(item);
    }


    getElements() {
        this.EPG_LIST.forEach(list => {
            https.get(list.url, (response) => {
                let body = "";
                response.on("data", (chunk) => {
                    body += chunk;
                });
                response.on("end", () => {
                    const playlist = parser.parse(body);
                    playlist.items.forEach((channel) => {
                        let remove = false
                        this.removeChanals.forEach(blocker => {
                            if (channel.raw.indexOf(blocker) >= 0) {
                                remove = true;
                            }
                        });
                        if (!remove) {
                            channel.tvg.country = list.country;
                            this.setItems(channel);
                        }
                    });
                });
            })
        });
    }

    createFile() {
        this.clearFile();
        this.getElements();
        setTimeout(() => {
            console.log(this.chanellsItem)
            fs.appendFileSync(this.fileName, JSON.stringify(this.chanellsItem));
        }, 4000)
    }
}


let creater = new Make();

creater.createFile();





