import React, { useEffect, useState } from "react";

/**
 * Render the Instaread audio player.
 */
const IrPlayer = () => {
  const [playerLoaded, setPlayerLoaded] = useState(false);

  /**
   * Load the Instaread script and create the player when needed.
   */
  function loadInstareadScript(callback) {
    if (window.instareadLoaded == undefined) {
      const ir_script = document.createElement("script");
      const ir_version = new Date().valueOf();
      ir_script.src = `https://instaread.co/js/instaread.mindbodygreen.js?version=${ir_version}`;
      ir_script.setAttribute("type", "text/javascript");
      ir_script.setAttribute("async", "true");

      ir_script.addEventListener("load", () => {
        window.instareadLoaded = true;

        callback();
      });
      (
        document.getElementsByTagName("head")[0] ||
        document.getElementsByTagName("body")[0]
      ).appendChild(ir_script);
    } else {
      callback();
    }
  }

  useEffect(() => {
    loadInstareadScript(() => {
      // Initialize the player once the script is loaded
      if (!!window?._loadIRPlayer) window._loadIRPlayer();
    });
  }, []);

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

export default IrPlayer;
