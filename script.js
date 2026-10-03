/* =========================================================
   ELIZA ART CORNER
   Main JavaScript
   ========================================================= */


/* =========================================================
   PAINTINGS
   =========================================================

   ONLY EDIT THIS SECTION WHEN ADDING/REMOVING PAINTINGS.

   Put the image files in the same repository as this file.

   Example:
   painting1.jpg
   painting2.jpg
   painting3.jpg

========================================================= */

const paintings = [

  {
    image: "painting1.jpg",
    title: "Quiet Morning",
    status: "Available",
    price: "300 USD (Shipping included)",
    size: "12 × 18 inches",
    medium: "Acrylic on canvas",
    description:
      "An original painting inspired by the warmth and stillness of an ordinary morning."
  },


  {
    image: "painting2.jpg",
    title: "The Little House",
    status: "Available",
    price: "300 USD (Shipping included)",
    size: "12 × 18 inches",
    medium: "Acrylic on canvas",
    description:
      "A quiet little scene painted with soft colours, warmth and a feeling of home."
  },


  {
    image: "painting3.jpg",
    title: "Afterglow",
    status: "Available",
    price: "200 USD (Shipping included)",
    size: "10 × 10 inches",
    medium: "Acrylic on canvas",
    description:
      "A small original painting capturing the gentle atmosphere of a fleeting moment."
  },


  {
    image: "painting4.jpg",
    title: "A Place to Remember",
    status: "Available",
    price: "400 USD (Shipping included)",
    size: "16 × 20 inches",
    medium: "Acrylic on canvas",
    description:
      "A nostalgic scene inspired by the places that remain with us long after we leave them."
  },


  {
    image: "painting5.jpg",
    title: "Home at Dusk",
    status: "Sold",
    price: "300 USD (Shipping included)",
    size: "12 × 18 inches",
    medium: "Acrylic on canvas",
    description:
      "A warm evening scene created around the feeling of returning home at the end of the day."
  },


  {
    image: "painting6.jpg",
    title: "Somewhere Quiet",
    status: "Available",
    price: "500 USD (Shipping included)",
    size: "18 × 24 inches",
    medium: "Acrylic on canvas",
    description:
      "A peaceful original painting inspired by quiet places and the feeling of being away from everything."
  }

];


/* =========================================================
   HELPERS
   ========================================================= */

const qs = (selector) =>
  document.querySelector(selector);


/* =========================================================
   GOOGLE ANALYTICS CLICK TRACKING
   ========================================================= */

function trackClick(name) {

  if (typeof gtag === "function") {

    gtag("event", "site_click", {

      click_name: name

    });

  }

}


/* =========================================================
   PUSHBIRD
   =========================================================

   IMPORTANT:

   This is intentionally BLANK for Eliza.

   Later, replace:

   const webhook = "";

   with HER OWN Pushbird webhook.

========================================================= */

function sendPushbird(title, message) {

  const webhook = "";

  /*
    Do nothing while the webhook is blank.
    This means the visitor system can stay in the code
    without accidentally sending anything to Ramsha's
    Pushbird account.
  */

  if (!webhook) {

    console.log(
      "PUSHBIRD: webhook not configured yet."
    );

    return;

  }


  const url =
    webhook +
    "?title=" +
    encodeURIComponent(title) +
    "&message=" +
    encodeURIComponent(message);


  console.log(
    "PUSHBIRD:",
    url
  );


  /*
    Same lightweight request method used by
    the original visitor notification system.
  */

  const img =
    document.createElement("img");


  img.src = url;

  img.style.display = "none";

  document.body.appendChild(img);

}


/* =========================================================
   VISITOR JOURNEY TRACKING
   ========================================================= */

function trackJourney(action) {

  let journey =
    sessionStorage.getItem(
      "visitorJourney"
    ) || "Gallery";


  /*
    Don't add the exact same action twice
    in a row.
  */

  if (
    !journey.endsWith(
      ` → ${action}`
    )
  ) {

    journey +=
      ` → ${action}`;

  }


  /*
    Keep the journey manageable.
  */

  const parts =
    journey.split(" → ");


  if (parts.length > 20) {

    parts.splice(
      1,
      parts.length - 20
    );

  }


  journey =
    parts.join(" → ");


  sessionStorage.setItem(
    "visitorJourney",
    journey
  );


  console.log(
    "VISITOR JOURNEY:",
    journey
  );

}


/* =========================================================
   SEND JOURNEY UPDATE
   ========================================================= */

function sendJourneyUpdate() {

  const journey =
    sessionStorage.getItem(
      "visitorJourney"
    );


  const visitorId =
    localStorage.getItem(
      "visitorId"
    );


  const visitCount =
    localStorage.getItem(
      "visitorVisitCount"
    );


  if (
    !journey ||
    !visitorId
  ) {

    return;

  }


  /*
    Don't send the exact same journey twice.
  */

  if (
    sessionStorage.getItem(
      "visitorJourneySent"
    ) === journey
  ) {

    return;

  }


  const message =
    `${visitorId} - Visit #${visitCount} - ${journey}`;


  sendPushbird(
    "Visitor activity",
    message
  );


  sessionStorage.setItem(
    "visitorJourneySent",
    journey
  );

}


/* =========================================================
   VISITOR LEFT
   ========================================================= */

function sendVisitorLeft() {

  if (
    sessionStorage.getItem(
      "visitorLeftNotificationSent"
    )
  ) {

    return;

  }


  const journey =
    sessionStorage.getItem(
      "visitorJourney"
    );


  const visitorId =
    localStorage.getItem(
      "visitorId"
    );


  const visitCount =
    localStorage.getItem(
      "visitorVisitCount"
    );


  if (
    !journey ||
    !visitorId
  ) {

    return;

  }


  const message =
    `${visitorId} - Visit #${visitCount} - ${journey} - Left`;


  sendPushbird(
    "Visitor left",
    message
  );


  sessionStorage.setItem(
    "visitorLeftNotificationSent",
    "1"
  );

}


/* =========================================================
   NEW / RETURNING VISITOR
   ========================================================= */

function notifyVisitor() {

  /*
    Don't notify twice during the same page session.
  */

  if (
    sessionStorage.getItem(
      "visitorNotificationSent"
    )
  ) {

    return;

  }


  /* -----------------------------------------
     Anonymous visitor ID
     ----------------------------------------- */

  let visitorId =
    localStorage.getItem(
      "visitorId"
    );


  if (!visitorId) {

    visitorId =
      Math.random()
        .toString(36)
        .substring(2, 7)
        .toUpperCase();


    localStorage.setItem(
      "visitorId",
      visitorId
    );

  }


  /* -----------------------------------------
     Visit count
     ----------------------------------------- */

  let visitCount =
    parseInt(
      localStorage.getItem(
        "visitorVisitCount"
      ) || "0",
      10
    );


  visitCount++;


  localStorage.setItem(
    "visitorVisitCount",
    visitCount
  );


  const isReturning =
    visitCount > 1;


  /* -----------------------------------------
     Traffic source
     ----------------------------------------- */

  const referrer =
    document.referrer;


  let source =
    "Direct";


  if (referrer) {

    try {

      const host =
        new URL(referrer)
          .hostname
          .toLowerCase();


      if (
        host.includes("reddit")
      ) {

        source = "Reddit";

      }

      else if (
        host.includes("google")
      ) {

        source = "Google";

      }

      else if (
        host.includes("instagram")
      ) {

        source = "Instagram";

      }

      else if (
        host.includes("facebook")
      ) {

        source = "Facebook";

      }

      else if (
        host.includes("pinterest")
      ) {

        source = "Pinterest";

      }

      else if (
        host.includes("bing")
      ) {

        source = "Bing";

      }

      else {

        source =
          host.replace(
            "www.",
            ""
          );

      }

    }

    catch {

      source = "Unknown";

    }

  }


  /* -----------------------------------------
     Device
     ----------------------------------------- */

  const ua =
    navigator.userAgent
      .toLowerCase();


  let device =
    "Desktop";


  if (
    ua.includes("iphone")
  ) {

    device = "iPhone";

  }

  else if (
    ua.includes("ipad")
  ) {

    device = "iPad";

  }

  else if (
    ua.includes("android")
  ) {

    device = "Android";

  }

  else if (
    ua.includes("mac")
  ) {

    device = "Mac";

  }

  else if (
    ua.includes("windows")
  ) {

    device = "Windows";

  }


  /* -----------------------------------------
     Starting page
     ----------------------------------------- */

  let page =
    "Gallery";


  if (
    window.location.hash ===
    "#about"
  ) {

    page = "About";

  }

  else if (
    window.location.hash ===
    "#contact"
  ) {

    page = "Contact";

  }


  /* -----------------------------------------
     Start journey
     ----------------------------------------- */

  sessionStorage.setItem(
    "visitorJourney",
    page
  );


  sessionStorage.removeItem(
    "visitorJourneySent"
  );


  sessionStorage.removeItem(
    "visitorLeftNotificationSent"
  );


  /* -----------------------------------------
     Notification
     ----------------------------------------- */

  const title =
    isReturning
      ? "Returning visitor"
      : "New visitor";


  const message =
    `${isReturning ? "Returning" : "New"} visitor - ` +
    `${visitorId} - Visit #${visitCount} - ` +
    `${source} - ${device} - ${page}`;


  sendPushbird(
    title,
    message
  );


  sessionStorage.setItem(
    "visitorNotificationSent",
    "1"
  );

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value = "") {

  return String(value)
    .replace(
      /[&<>"']/g,
      character => ({

        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"

      }[character])
    );

}


/* =========================================================
   CLEAN PRICE
   ========================================================= */

function cleanPrice(price) {

  return String(price)

    .replace(
      /\s*\(Shipping included\)/i,
      ""
    )

    .replace(
      /\s*USD/i,
      ""
    )

    .trim();

}


/* =========================================================
   RENDER GALLERY
   ========================================================= */

function renderGallery() {

  const gallery =
    qs("#painting-grid");


  if (!gallery) {

    return;

  }


  gallery.innerHTML =
    paintings.map(
      (painting, index) => {

        const sold =
          painting.status
            .toLowerCase() ===
          "sold";


        return `

          <article
            class="art-card"
            data-painting="${index}"
            tabindex="0"
            aria-label="View ${escapeHTML(painting.title)}"
          >

            <button
              class="art-image-button"
              type="button"
              data-painting="${index}"
              aria-label="View ${escapeHTML(painting.title)}"
            >

              <div class="art-image-wrap">

                <img
                  src="${escapeHTML(painting.image)}"
                  alt="${escapeHTML(painting.title)}"
                  loading="${index === 0 ? "eager" : "lazy"}"
                  fetchpriority="${index === 0 ? "high" : "auto"}"
                >


                <span class="view-art">
                  View artwork
                </span>


                ${
                  sold
                    ? `
                      <span class="art-status-badge">
                        Sold
                      </span>
                    `
                    : ""
                }

              </div>

            </button>


            <div class="art-caption">

              <h2>
                ${escapeHTML(painting.title)}
              </h2>


              <div class="art-meta">

                <span>
                  ${escapeHTML(painting.size)}
                </span>

                <span class="art-price">
                  ${
                    sold
                      ? "Sold"
                      : escapeHTML(
                          cleanPrice(
                            painting.price
                          )
                        ) + " USD"
                  }
                </span>

              </div>


              <p
                class="
                  art-status-text
                  ${
                    sold
                      ? "status-sold"
                      : "status-available"
                  }
                "
              >
                ${escapeHTML(painting.status)}
              </p>

            </div>

          </article>

        `;

      }
    ).join("");


  /* -----------------------------------------
     Image error handling
     ----------------------------------------- */

  gallery
    .querySelectorAll(
      ".art-image-wrap img"
    )
    .forEach(
      image => {

        image.addEventListener(
          "error",
          function () {

            this.style.display =
              "none";


            const placeholder =
              document.createElement(
                "div"
              );


            placeholder.className =
              "art-placeholder";


            const card =
              this.closest(
                ".art-card"
              );


            const index =
              Number(
                card.dataset.painting
              );


            placeholder.innerHTML =
              `<span>${escapeHTML(
                paintings[index].title
              )}</span>`;


            this.parentElement.appendChild(
              placeholder
            );

          }
        );

      }
    );


  /* -----------------------------------------
     Click handling
     ----------------------------------------- */

  gallery
    .querySelectorAll(
      ".art-image-button"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            const index =
              Number(
                button.dataset.painting
              );


            const painting =
              paintings[index];


            trackClick(
              `Painting: ${painting.title}`
            );


            openPainting(index);

          }
        );

      }
    );


  /* -----------------------------------------
     Keyboard handling
     ----------------------------------------- */

  gallery
    .querySelectorAll(
      ".art-card"
    )
    .forEach(
      card => {

        card.addEventListener(
          "keydown",
          event => {

            if (
              event.key === "Enter" ||
              event.key === " "
            ) {

              event.preventDefault();

              const index =
                Number(
                  card.dataset.painting
                );


              openPainting(index);

            }

          }
        );

      }
    );

}


/* =========================================================
   OPEN PAINTING
   ========================================================= */

function openPainting(index) {

  const painting =
    paintings[index];


  const modal =
    qs("#painting-modal");


  if (
    !painting ||
    !modal
  ) {

    return;

  }


  /* Track viewing */

  trackJourney(
    `Viewed: ${painting.title}`
  );


  /* Fill modal */

  qs("#modal-image").src =
    painting.image;


  qs("#modal-image").alt =
    painting.title;


  qs("#modal-title").textContent =
    painting.title;


  qs("#modal-category").textContent =
    painting.category ||
    "ORIGINAL PAINTING";


  qs("#modal-status").textContent =
    painting.status
      .toLowerCase() === "sold"
      ? "Sold · Open for commission"
      : painting.status;


  qs("#modal-price").textContent =
    painting.price;


  qs("#modal-size").textContent =
    painting.size;


  qs("#modal-medium").textContent =
    painting.medium;


  qs("#modal-description").textContent =
    painting.description || "";


  /* -----------------------------------------
     Price for messages
     ----------------------------------------- */

  const displayPrice =
    `$${cleanPrice(
      painting.price
    )}`;


  /* -----------------------------------------
     WhatsApp
     ----------------------------------------- */

  const whatsappMessage =

    `Hi! I’m interested in ` +
    `purchasing “${painting.title}” ` +
    `(${painting.size}), listed at ` +
    `${displayPrice} on your website. ` +
    `How do I move forward with the purchase?`;


  /*
    IMPORTANT:
    Replace YOUR_WHATSAPP_NUMBER in
    the HTML/JS when Eliza has her number.
  */

  const whatsappNumber =
    "YOUR_WHATSAPP_NUMBER";


  const whatsappLink =
    `https://wa.me/${whatsappNumber}` +
    `?text=${encodeURIComponent(
      whatsappMessage
    )}`;


  qs("#modal-whatsapp").href =
    whatsappLink;


  /* -----------------------------------------
     Email
     ----------------------------------------- */

  const emailAddress =
    "YOUR_EMAIL_HERE";


  const emailSubject =
    `Inquiry about “${painting.title}”`;


  const emailBody =

    `Hi Eliza,\n\n` +

    `I’m interested in purchasing ` +
    `“${painting.title}” ` +
    `(${painting.size}), listed at ` +
    `${displayPrice} on your website. ` +
    `How do I move forward with the purchase?\n\n` +

    `Thank you!`;


  qs("#modal-email").href =
    `mailto:${emailAddress}` +
    `?subject=${encodeURIComponent(
      emailSubject
    )}` +
    `&body=${encodeURIComponent(
      emailBody
    )}`;


  /* -----------------------------------------
     Contact wording
     ----------------------------------------- */

  const contactHeading =
    qs(
      "#modal-contact-heading"
    );


  if (
    painting.status
      .toLowerCase() ===
    "available"
  ) {

    contactHeading.textContent =
      "Interested in purchasing this artwork? Contact Eliza below.";

  }

  else {

    contactHeading.textContent =
      "Interested in a similar painting? Contact Eliza below.";

  }


  /* -----------------------------------------
     Open
     ----------------------------------------- */

  modal.classList.add(
    "open"
  );


  modal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.classList.add(
    "modal-open"
  );

}


/* =========================================================
   CLOSE PAINTING
   ========================================================= */

function closePainting() {

  const modal =
    qs("#painting-modal");


  if (!modal) {

    return;

  }


  modal.classList.remove(
    "open"
  );


  modal.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.classList.remove(
    "modal-open"
  );

}


/* =========================================================
   MODAL SETUP
   ========================================================= */

function setupModal() {

  const modal =
    qs("#painting-modal");


  if (!modal) {

    return;

  }


  const closeButton =
    qs("#modal-close");


  if (closeButton) {

    closeButton.addEventListener(
      "click",
      closePainting
    );

  }


  const backdrop =
    qs(".modal-backdrop");


  if (backdrop) {

    backdrop.addEventListener(
      "click",
      closePainting
    );

  }


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape"
      ) {

        closePainting();

      }

    }
  );


  /* WhatsApp */

  qs("#modal-whatsapp")
    ?.addEventListener(
      "click",
      () => {

        const title =
          qs("#modal-title")
            .textContent;


        trackClick(
          `Painting inquiry: WhatsApp — ${title}`
        );


        trackJourney(
          `WhatsApp: ${title}`
        );

      }
    );


  /* Email */

  qs("#modal-email")
    ?.addEventListener(
      "click",
      () => {

        const title =
          qs("#modal-title")
            .textContent;


        trackClick(
          `Painting inquiry: Email — ${title}`
        );


        trackJourney(
          `Email: ${title}`
        );

      }
    );


  /* Instagram */

  qs("#modal-instagram")
    ?.addEventListener(
      "click",
      () => {

        const title =
          qs("#modal-title")
            .textContent;


        trackClick(
          `Painting inquiry: Instagram — ${title}`
        );


        trackJourney(
          `Instagram: ${title}`
        );

      }
    );

}


/* =========================================================
   PAGE ROUTING
   ========================================================= */

function showPage(page) {

  const validPages = [
    "home",
    "about",
    "contact"
  ];


  if (
    !validPages.includes(page)
  ) {

    page = "home";

  }


  document
    .querySelectorAll(
      ".site-page"
    )
    .forEach(
      section => {

        section.hidden =
          section.id !==
          `page-${page}`;

      }
    );


  document
    .querySelectorAll(
      "[data-page]"
    )
    .forEach(
      link => {

        link.setAttribute(
          "aria-current",
          link.dataset.page === page
            ? "page"
            : "false"
        );

      }
    );


  /* Track page */

  if (
    page === "about"
  ) {

    trackJourney(
      "About"
    );

  }


  if (
    page === "contact"
  ) {

    trackJourney(
      "Contact"
    );

  }


  /* Page title */

  if (
    page === "home"
  ) {

    document.title =
      "Eliza Art Corner — Original Paintings";

  }

  else {

    document.title =
      `${page.charAt(0).toUpperCase() + page.slice(1)} — Eliza Art Corner`;

  }


  window.scrollTo({
    top: 0,
    behavior: "auto"
  });


  closeMobileMenu();

}


/* =========================================================
   HASH ROUTING
   ========================================================= */

function routeFromHash() {

  const page =
    (
      window.location.hash ||
      "#home"
    )
      .slice(1)
      .toLowerCase();


  showPage(page);

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function closeMobileMenu() {

  const button =
    qs(".menu-button");


  const menu =
    qs(".mobile-menu");


  if (
    !button ||
    !menu
  ) {

    return;

  }


  menu.classList.remove(
    "open"
  );


  button.setAttribute(
    "aria-expanded",
    "false"
  );

}


function setupMobileMenu() {

  const button =
    qs(".menu-button");


  const menu =
    qs(".mobile-menu");


  if (
    !button ||
    !menu
  ) {

    return;

  }


  button.addEventListener(
    "click",
    () => {

      const open =
        menu.classList.toggle(
          "open"
        );


      button.setAttribute(
        "aria-expanded",
        String(open)
      );

    }
  );

}


/* =========================================================
   NAVIGATION TRACKING
   ========================================================= */

function setupNavigation() {

  window.addEventListener(
    "hashchange",
    routeFromHash
  );


  document
    .querySelectorAll(
      "[data-page]"
    )
    .forEach(
      link => {

        link.addEventListener(
          "click",
          () => {

            trackClick(
              `Navigation: ${link.dataset.page}`
            );


            closePainting();

          }
        );

      }
    );


  /* Gallery button */

  const galleryButton =
    document.querySelector(
      "[data-scroll-gallery]"
    );


  if (galleryButton) {

    galleryButton.addEventListener(
      "click",
      () => {

        trackClick(
          "Navigation: Paintings"
        );


        trackJourney(
          "Paintings"
        );

      }
    );

  }


  /* Contact cards */

  document
    .querySelectorAll(
      ".contact-card"
    )
    .forEach(
      card => {

        card.addEventListener(
          "click",
          () => {

            const label =
              card.dataset.contact ||
              "Contact";


            trackClick(
              `Contact: ${label}`
            );


            trackJourney(
              `Contact: ${label}`
            );

          }
        );

      }
    );


  /* Newsletter */

  const newsletter =
    qs("#newsletter-link");


  if (newsletter) {

    newsletter.addEventListener(
      "click",
      () => {

        trackClick(
          "Mailing list"
        );


        trackJourney(
          "Mailing list"
        );

      }
    );

  }


  /* Footer links */

  document
    .querySelectorAll(
      ".site-footer a"
    )
    .forEach(
      link => {

        link.addEventListener(
          "click",
          () => {

            trackClick(
              `Footer: ${link.textContent.trim()}`
            );


            trackJourney(
              `Footer: ${link.textContent.trim()}`
            );

          }
        );

      }
    );

}


/* =========================================================
   IMAGE FALLBACKS
   ========================================================= */

function setupStaticImageFallbacks() {

  const images = [

    {
      image: qs("#hero-image"),
      placeholder: qs("#hero-placeholder")
    },

    {
      image: qs("#about-image"),
      placeholder: qs("#about-placeholder")
    }

  ];


  images.forEach(
    item => {

      if (
        !item.image ||
        !item.placeholder
      ) {

        return;

      }


      item.image.addEventListener(
        "error",
        () => {

          item.image.style.display =
            "none";

          item.placeholder.style.display =
            "flex";

        }
      );


      item.image.addEventListener(
        "load",
        () => {

          item.placeholder.style.display =
            "none";

        }
      );

    }
  );

}


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    /* Gallery */

    renderGallery();


    /* Modal */

    setupModal();


    /* Navigation */

    setupNavigation();


    /* Mobile */

    setupMobileMenu();


    /* Static image fallback */

    setupStaticImageFallbacks();


    /* Routing */

    routeFromHash();


    /* Visitor notification */

    notifyVisitor();


    /* Current year */

    const year =
      qs("#current-year");


    if (year) {

      year.textContent =
        new Date()
          .getFullYear();

    }

  }
);


/* =========================================================
   PERIODIC VISITOR JOURNEY UPDATES
   =========================================================

   Same behavior as your Ramsha system:
   every 30 seconds, if the journey changed,
   send an update.

========================================================= */

setInterval(
  () => {

    sendJourneyUpdate();

  },
  30000
);


/* =========================================================
   FINAL VISITOR EXIT
   =========================================================

   pagehide is used rather than visibilitychange,
   so merely switching browser tabs doesn't count
   as leaving.

========================================================= */

window.addEventListener(
  "pagehide",
  () => {

    sendVisitorLeft();

  }
);
