import React, { useEffect, useState } from "react";
import "./../script";

/**
 * Render the Instaread audio player.
 */
const IrPlayerWithScript = () => {
  const [playerLoaded, setPlayerLoaded] = useState(false);

  useEffect(() => !!window?._loadIRPlayer && window._loadIRPlayer(), []);

  function parseStringToJsonOrString(input) {
    try {
      return JSON.parse(input);
    } catch (error) {
      return input;
    }
  }

  useEffect(() => {
    // listening for iframe events
    const eventHandler = (e) => {
      const origin = e?.origin;
      if (origin && origin.includes("instaread.co")) {
        try {
          const data = e?.data;
          const parsedData = parseStringToJsonOrString(data);
          //condition will be true when player will be ready
          if (parsedData && parsedData?.event === "ready") {
            setPlayerLoaded(true);
          }
        } catch (error) {
          console.log("Error parsing JSON:", error);
        }
      }
    };

    window.addEventListener("message", eventHandler);

    return () => {
      window.removeEventListener("message", eventHandler);
    };
  }, []);

  return (
    <div
      className="instaread-audio-player"
      style={
        playerLoaded
          ? {
              width: "100%",
              height: "100%",
              border: "0px",
              overflow: "hidden",
              position: "static",
              pointerEvents: "auto",
              marginLeft: "25px",
            }
          : {
              width: "0%",
              height: "0%",
              border: "0px",
              overflow: "hidden",
              position: "absolute",
              pointerEvents: "none",
            }
      }
    >
      <iframe
        title="Audio Article"
        id="instaread_iframe"
        name="instaread_playlist"
        allow="autoplay"
        allowFullScreen
        seamless
      ></iframe>
    </div>
  );
};

export default IrPlayerWithScript;
