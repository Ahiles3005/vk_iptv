import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import SpatialNavigation, {
    Focusable,
    FocusableSection,
} from "react-js-spatial-navigation";
import Navbar from "../../Components/layout/Navbar/Navbar";
import Image from "../../Components/commons/Image/Image";
import {fetchM3U} from "../../Assets/ChannelList";
import defaultChannelImage from "../../Assets/images/img1.png";
import placeholderImage from "../../Assets/images/placeholder.png";
import "./Homepage.css";

const Homepage = () => {
    const navigate = useNavigate();
    const [channels, setChannels] = useState([]);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetchM3U.then((m) => {
            console.log(m)
            setChannels(m.medias);
            setCountries(m.countries);
        });
    }, []);

    useEffect(() => {
        const backEvent = function (e) {
            if (e.keyName === "back") {
                console.log("back event", e, window.location.href);
                window.history.back();
            }
        };

    }, []);

    const filterHandler = (val) => {
        fetchM3U.then((m) => {
            let newChannels = m.medias;
            if (val !== 'all') {
                newChannels = m.medias.filter((chanel) => {
                    return chanel.attributes['group-title'] === val;
                });
            }
            setChannels(newChannels);
        });
    };

    return (
        <div className="homepageWrapper">
            <SpatialNavigation>
                <Navbar filterHandler={filterHandler}/>
                <section className="contentWrapper">
                    <div className="channelListWrapper">
                        <ul className="channelList">
                            <FocusableSection>
                                <Focusable
                                    onClickEnter={() => {
                                        filterHandler("all");
                                    }}
                                >
                                    <li
                                        onClick={() => {
                                            filterHandler("all");
                                        }}
                                        className="channelListItem"
                                    >
                                        All
                                    </li>
                                </Focusable>

                                {countries?.length ? (
                                    countries.map((country, index) => {
                                        return (
                                            <Focusable
                                                onClickEnter={() => {
                                                    filterHandler(country);
                                                }}
                                                key={index}
                                            >
                                                <li
                                                    onClick={() => {
                                                        filterHandler(country);
                                                    }}
                                                    className="channelListItem"
                                                >
                                                    {country}
                                                </li>
                                            </Focusable>
                                        );
                                    })
                                ) : (
                                    <div className="noResults">Sorry, No Results Found!</div>
                                )}
                            </FocusableSection>
                        </ul>
                    </div>
                    <div className="channelsView">
                        {channels?.length ? (
                            channels.map((channelItem, index) => {
                                return (
                                    <Focusable
                                        onClickEnter={() => {
                                            navigate(
                                                `/channel?channelUrl=${window.encodeURIComponent(
                                                    channelItem.location
                                                )}`
                                            );
                                        }}
                                        key={index}
                                    >
                    <span
                        onClick={() => {
                            navigate(
                                `/channel?channelUrl=${window.encodeURIComponent(
                                    channelItem.location.replace("?fluxustv.m3u8", "")
                                )}`
                            );
                        }}
                        className="channelItem"
                        title={channelItem.name}
                    >
                      <Image
                          src={channelItem.attributes["tvg-logo"] || defaultChannelImage}
                          alt={channelItem.name || 'channelImage'}
                          placeholderImage={placeholderImage}
                          wrapperClassName='channelItemImage'
                      />
                    </span>
                                    </Focusable>
                                );
                            })
                        ) : (
                            <div className="noResults">Sorry, No Results Found!</div>
                        )}
                    </div>
                </section>
            </SpatialNavigation>
        </div>
    );
};

export default Homepage;
