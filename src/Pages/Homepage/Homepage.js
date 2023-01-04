import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import SpatialNavigation, {
//   Focusable,
//   FocusableSection,
// } from "react-js-spatial-navigation";
import Navbar from "../../Components/layout/Navbar/Navbar";
import Image from "../../Components/commons/Image/Image";
import { fetchM3U } from "../../Assets/ChannelList";
import defaultChannelImage from "../../Assets/images/img1.png";
import placeholderImage from "../../Assets/images/placeholder.png";
import "./Homepage.css";

const Homepage = () => {
  const navigate = useNavigate();
  const [channels, setChannels] = useState([]);
  const [originalChannels, setOriginalChannels] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchM3U.then((m) => {
      console.log(m);
      setChannels(m.medias);
      setOriginalChannels(m.medias);
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
    let newChannels = originalChannels;
    if (val !== "all") {
      newChannels = originalChannels.filter((chanel) => {
        return chanel.tvg.country === val;
      });
    }
    setChannels(newChannels);
  };

  return (
    <div className="homepageWrapper">
      <div>
        <Navbar filterHandler={filterHandler} />
        <section className="contentWrapper">
          <div className="channelListWrapper">
            <ul className="channelList">
              <div>
                <div
                  onClick={() => {
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
                </div>

                {countries?.length ? (
                  countries.map((country, index) => {
                    return (
                      <div
                        onClick={() => {
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
                      </div>
                    );
                  })
                ) : (
                  <div className="noResults">Sorry, No Results Found!</div>
                )}
              </div>
            </ul>
          </div>
          <div className="channelsView">
            {channels?.length ? (
              channels.map((channelItem, index) => {
                return (
                  <div
                    onClick={() => {
                      navigate(
                        `/channel?channelUrl=${window.encodeURIComponent(
                          channelItem.url
                        )}`
                      );
                    }}
                    key={index}
                  >
                    <span
                      onClick={() => {
                        navigate(
                          `/channel?channelUrl=${window.encodeURIComponent(
                            channelItem.url
                          )}`
                        );
                      }}
                      className="channelItem"
                      title={channelItem.name}
                    >
                      <Image
                        src={channelItem.tvg.logo || defaultChannelImage}
                        alt={channelItem.name || "channelImage"}
                        placeholderImage={placeholderImage}
                        wrapperClassName="channelItemImage"
                      />
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="noResults">Sorry, No Results Found!</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Homepage;
