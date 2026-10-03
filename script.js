/* ============================================================
   ELIZA ART CORNER
   Main JavaScript
============================================================ */


/* ============================================================
   WEBSITE INFORMATION
   ============================================================

   EDIT THESE when the website is ready.

============================================================ */

const SITE = {

    name: "Eliza Art Corner",

    email: "",

    instagram: "@elizaartcorner",

    instagramUrl: "",

    beehiivUrl: ""

};


/* ============================================================
   PAINTINGS
   ============================================================

   THIS IS THE MAIN AREA YOU WILL EDIT.

   For every new painting, copy one of these blocks.

   IMPORTANT:
   The image filename must exactly match the file uploaded
   to the main GitHub repository.

   Example:

   image: "the-man-out.JPG"

   If the uploaded file is called:

   The-Man-Out.JPG

   then the code must say:

   image: "The-Man-Out.JPG"

   Capital letters matter on some servers.

============================================================ */


const paintings = [

    {
        title: "The Man Out",

        image: "the-man-out.JPG",

        size: "18 × 24 in",

        price: "$450",

        status: "Available",

        description:
            "A quiet original painting capturing a solitary moment with a warm and atmospheric mood."
    },


    {
        title: "Painting Two",

        image: "painting-02.JPG",

        size: "12 × 18 in",

        price: "$300",

        status: "Available",

        description:
            "Original acrylic painting. Replace this description with the story or inspiration behind the artwork."
    },


    {
        title: "Painting Three",

        image: "painting-03.JPG",

        size: "16 × 20 in",

        price: "$400",

        status: "Available",

        description:
            "Original artwork created with attention to atmosphere, colour and feeling."
    },


    {
        title: "Painting Four",

        image: "painting-04.JPG",

        size: "10 × 10 in",

        price: "$200",

        status: "Sold",

        description:
            "An original painting from the Eliza Art Corner collection."
    },


    {
        title: "Painting Five",

        image: "painting-05.JPG",

        size: "12 × 18 in",

        price: "$300",

        status: "Available",

        description:
            "An original painting inspired by quiet moments and familiar places."
    },


    {
        title: "Painting Six",

        image: "painting-06.JPG",

        size: "18 × 24 in",

        price: "$450",

        status: "Available",

        description:
            "Original artwork painted by hand."
    }

];


/* ============================================================
   DOM ELEMENTS
============================================================ */

const paintingsGrid =
    document.getElementById("paintingsGrid");

const paintingModal =
    document.getElementById("paintingModal");

const modalOverlay =
    document.getElementById("modalOverlay");

const modalClose =
    document.getElementById("modalClose");

const modalImage =
    document.getElementById("modalImage");

const modalTitle =
    document.getElementById("modalTitle");

const modalDescription =
    document.getElementById("modalDescription");

const modalSize =
    document.getElementById("modalSize");

const modalPrice =
    document.getElementById("modalPrice");

const modalStatus =
    document.getElementById("modalStatus");

const modalContact =
    document.getElementById("modalContact");


/* ============================================================
   RENDER PAINTINGS
============================================================ */

function renderPaintings() {

    if (!paintingsGrid) {
        return;
    }


    paintingsGrid.innerHTML = "";


    paintings.forEach((painting, index) => {

        const card =
            document.createElement("article");

        card.className = "painting-card";


        const statusClass =
            painting.status.toLowerCase() === "sold"
                ? "sold"
                : "";


        card.innerHTML = `

            <div class="painting-image-wrap">

                <img
                    src="${painting.image}"
                    alt="${painting.title}"
                    class="painting-image"
                    loading="lazy"
                    onerror="this.style.display='none'; this.parentElement.classList.add('image-placeholder');"
                >

                <div class="painting-overlay">
                    <span>View Painting</span>
                </div>

            </div>


            <div class="painting-meta">

                <div>

                    <h3 class="painting-title">
                        ${painting.title}
                    </h3>

                    <p class="painting-size">
                        ${painting.size}
                    </p>

                    <p class="painting-status ${statusClass}">
                        ${painting.status}
                    </p>

                </div>


                <div class="painting-price">
                    ${painting.price}
                </div>

            </div>
        `;


        card.addEventListener("click", () => {

            openPainting(index);

        });


        paintingsGrid.appendChild(card);

    });

}


/* ============================================================
   OPEN PAINTING MODAL
============================================================ */

function openPainting(index) {

    const painting =
        paintings[index];


    if (!painting) {
        return;
    }


    modalImage.src =
        painting.image;

    modalImage.alt =
        painting.title;


    modalTitle.textContent =
        painting.title;


    modalDescription.textContent =
        painting.description;


    modalSize.textContent =
        painting.size;


    modalPrice.textContent =
        painting.price;


    modalStatus.textContent =
        painting.status;


    /*
        If the painting is sold, change the enquiry button.
    */

    if (
        painting.status.toLowerCase() === "sold"
    ) {

        modalContact.textContent =
            "Ask About a Similar Painting";

    } else {

        modalContact.textContent =
            "Enquire About This Painting";

    }


    paintingModal.classList.add("active");

    paintingModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


/* ============================================================
   CLOSE PAINTING MODAL
============================================================ */

function closePainting() {

    paintingModal.classList.remove(
        "active"
    );


    paintingModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";
}


modalClose.addEventListener(
    "click",
    closePainting
);


modalOverlay.addEventListener(
    "click",
    closePainting
);


/* ESC KEY */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            paintingModal.classList.contains("active")
        ) {

            closePainting();

        }

    }
);


/* ============================================================
   MOBILE MENU
============================================================ */

const menuToggle =
    document.getElementById("menuToggle");

const siteNav =
    document.getElementById("siteNav");


if (menuToggle && siteNav) {

    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                siteNav.classList.toggle("active");


            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        }
    );


    /*
        Close the menu after clicking a link.
    */

    siteNav
        .querySelectorAll("a")
        .forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    siteNav.classList.remove(
                        "active"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });

}


/* ============================================================
   CONTACT INFORMATION
============================================================ */

const emailLink =
    document.getElementById("emailLink");

const emailText =
    document.getElementById("emailText");


if (SITE.email) {

    emailLink.href =
        `mailto:${SITE.email}`;

    emailText.textContent =
        SITE.email;

} else {

    /*
        Email hasn't been entered yet.
    */

    emailLink.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

        }
    );

}


/* ============================================================
   INSTAGRAM
============================================================ */

const instagramLink =
    document.getElementById(
        "instagramLink"
    );


if (SITE.instagramUrl) {

    instagramLink.href =
        SITE.instagramUrl;

}


if (SITE.instagram) {

    const instagramText =
        instagramLink.querySelector(
            "strong"
        );

    if (instagramText) {

        instagramText.textContent =
            SITE.instagram;

    }

}


/* ============================================================
   BEEHIIV
============================================================ */

const newsletterButton =
    document.getElementById(
        "newsletterButton"
    );


if (SITE.beehiivUrl) {

    newsletterButton.href =
        SITE.beehiivUrl;

} else {

    newsletterButton.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            alert(
                "The mailing list will be available soon."
            );

        }
    );

}


/* ============================================================
   CURRENT YEAR
============================================================ */

const currentYear =
    document.getElementById(
        "currentYear"
    );


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* ============================================================
   PUSHBIRD
   ============================================================

   The Pushbird code is intentionally kept BLANK in index.html.

   When you are ready:

   1. Copy the Pushbird initialization code from Ramsha's site.
   2. Paste it into the PUSHBIRD CODE section in index.html.
   3. Replace it with Eliza's Pushbird credentials/settings.

   Nothing else in this JavaScript needs to change.

============================================================ */


/* ============================================================
   START WEBSITE
============================================================ */

renderPaintings();
