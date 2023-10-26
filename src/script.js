// Utility function to encode the article title slug
function instareadPlayerTitleSlug(e) {
  if (e.includes("http://") || e.includes("https://")) {
    return encodeURIComponent(e);
  } else {
    let t = e || "";
    return (
      (t = t
        .replace(/\&nbsp;/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^\wéÉèÈêÊëËôÔöÖîÎïÏûÛüÜàÀáÁíÍóÓúÚñÑ _-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")) || console.log(`article title is empty: ${e}`),
      t
    );
  }
}

// Utility function to bind events
function bindEvent(e, t, a) {
  e.addEventListener
    ? e.addEventListener(t, a, false)
    : e.attachEvent && e.attachEvent("on" + t, a);
}

// Utility function to send a message
function sendMessage(e) {
  window.parent.postMessage(e, "*");
  console.log("send");
}

// Utility function to add styles to an iframe
function addStyleToIframe(e) {
  let t = document.createElement("style");
  t.textContent = e;
  document.head.append(t);
  console.log("addStyle");
}

// Event listener for messages
bindEvent(window, "message", function (e) {
  const origin = e?.origin;
  if (origin && origin.includes("instaread.co")) {
    try {
      const data = e?.data;
      const parsedData = parseStringToJsonOrString(data);
      if (parsedData && parsedData.hideComingSoon) {
        addStyleToIframe(`
            .instaread-audio-player {
              height: 0px !important;
              width: 0px !important;
              display: none;
            }
          `);
      }
    } catch (error) {
      console.log("Error parsing JSON:", error);
    }
  }
});

var addStyletoiframediv = function (e) {
  let t = document.createElement("style");
  t.textContent = e;
  const c = document.querySelector(".instaread-audio-player");
  if (c) {
    c.append(t);
  }
  console.log("fraem");
};

addStyletoiframediv(`
    @media only screen and (min-width: 1130px) {
      .instaread-audio-player {
        width: 729px;
        height: 100px;
      }
    }
    @media only screen and (max-width: 1129px) {
      .instaread-audio-player {
        width: 354px;
        height: 158px !important;
        margin-left:25px;
      }
    }
    `);

function parseStringToJsonOrString(input) {
  try {
    // Attempt to parse as JSON
    const parsedData = JSON.parse(input);
    return parsedData;
  } catch (error) {
    // If parsing as JSON fails, return the input as a plain string
    return input;
  }
}

// Define a function to be executed after the script is loaded
var _loadIRPlayer = async function () {
  console.log("=====>SCRIPT");
  const pageTitleElement = document.querySelector("h1.sc-181uops-5");
  const titleElement = document.querySelector("title");
  let content;
  if (pageTitleElement) {
    content = pageTitleElement.innerText;
  } else if (titleElement) {
    content = titleElement.innerText;
  }
  const ir_titleSlug = instareadPlayerTitleSlug(content);
  const ir_version = new Date().valueOf();
  const ir_article_url = instareadPlayerTitleSlug(document.location.href);
  const instareadPlayerIframe = document.getElementById("instaread_iframe");
  const ir_publication = "mindbodygreen";

  instareadPlayerIframe.setAttribute(
    "src",
    `https://instaread.co/player?article=${ir_titleSlug}&publication=${ir_publication}&article_url=${ir_article_url}&version=${ir_version}`
  );
  instareadPlayerIframe.style.display = "block";
  instareadPlayerIframe.setAttribute("frameborder", "0");
  instareadPlayerIframe.setAttribute("frameborder", "0");
  instareadPlayerIframe.setAttribute("seamless", "");
  instareadPlayerIframe.setAttribute("width", "100%");
  instareadPlayerIframe.setAttribute("height", "100%");
  instareadPlayerIframe.setAttribute("scrolling", "no");
  instareadPlayerIframe.setAttribute("horizontalscrolling", "no");
  instareadPlayerIframe.setAttribute("verticalscrolling", "no");
  instareadPlayerIframe.setAttribute("marginwidth", "0");
  instareadPlayerIframe.setAttribute("marginheight", "0");
  instareadPlayerIframe.setAttribute("mozallowfullscreen", "");
  instareadPlayerIframe.setAttribute("webkitallowfullscreen", "");
  instareadPlayerIframe.setAttribute("allowfullscreen", "");
  instareadPlayerIframe.setAttribute("loading", "lazy");
};
window._loadIRPlayer = _loadIRPlayer;
// `_loadIRPlayer();`
