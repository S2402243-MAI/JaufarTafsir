/* === === ===
--- REGULAR PAGE CODE ---
=== === === */

//

/* === === ===
--- SET MOBILE WIDTH CODE ---
=== === === */

let isMobile = window.innerWidth <= 800; // Boolean to check if the current view is mobile

/* --- */

/* === === ===
FILI AND FOOTNOTE REMOVE CODE
=== === === */

//  implement  toggle functionality for removing and restoring tashkeel characters in  DataTable

/**
 * Removes tashkeel characters from the given string
 * @param {string} data - The input string
 * @return {string} The string with tashkeel characters removed
 */
function removeThashkeel(data) {
  return data.replace(/[َ|ً|ُ|ٌ|ِ|ٍ|ْ|ّ|~|⁽|⁾|¹²³⁴⁵⁶⁷⁸⁹⁰]/g, "");
}

// Declare global variables
let tashkeelRemoved = false;
let originalData = [];

/**
 * Toggles the visibility of tashkeel characters in the DataTable
 */
// NEW CODE, adapted to work for quran pages also
function toggleTashkeel() {
  tashkeelRemoved = !tashkeelRemoved;

  // Store the current page index
  const currentPage = table.page();

  if (tashkeelRemoved) {
    // Remove tashkeel from each cell that contains a string
    const newData = originalData.map((row) =>
      row.map((cell) =>
        typeof cell === "string" ? removeThashkeel(cell) : cell,
      ),
    );
    // Update the table with the new data
    table.clear().rows.add(newData).draw(false);
    // Update button text
    document.getElementById("toggleFiliButton").textContent =
      " ފިލިތައް ދައްކާ ";
  } else {
    // Restore original data with tashkeel
    table.clear().rows.add(originalData).draw(false);
    // Update button text
    document.getElementById("toggleFiliButton").textContent =
      " ފިލިތައް ފޮރުވާ ";
  }

  // Return to the previously stored page
  table.page(currentPage).draw("page");
}

// removes just smallish footnotes - do i need this?
function removeSmallishFootnotes(data) {
  return data.replace(/[⁽|⁾|¹²³⁴⁵⁶⁷⁸⁹⁰]/g, "");
}
//

/* google-closure-compiler --charset=UTF-8 --js=hmv-script.js --js_output_file=hmv-script.min.js */

/* copyURL BUTTON */
// https://stackoverflow.com/questions/33855641/copy-output-of-a-javascript-variable-to-the-clipboard/48542290#48542290
// https://stackoverflow.com/questions/10568815/replace-all-text-before-a-certain-point
function copyURLToClipButton() {
  let dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = window.location.href;

  // Replace text preceding "/uc/"

  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);

  // change copy page url button text
  let button = document.getElementById("copyPageLink");
  let originalText = button.innerHTML;
  let originalStyle = window.getComputedStyle(button);

  function changeButtonText(newText, duration) {
    let originalWidth = button.offsetWidth;
    //var originalTextAlign = originalStyle.textAlign;

    button.style.width = originalWidth + "px";
    button.style.textAlign = "center"; // originalTextAlign
    button.innerHTML = newText;

    setTimeout(function () {
      button.innerHTML = originalText;
      button.style.width = "";
      //button.style.textAlign = "";
    }, duration);
  }

  // Usage example:
  changeButtonText("📋 ކޮޕީ ވެއްޖެ", 1000); // ✓
}

//

// SCROLL TO TOP

function scrollUpTop() {
  // scroll to top
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Function to change the book in the URL
function changeBook(newBook) {
  let currentUrl = window.location.toString();
  let bookType, bookRegex, searchString;
}

/* === === ===
NESTED BELOWPAGE DROPDOWN CODE
=== === === */

// Wait for the DOM to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
  // Select the main bab dropdown container
  const babDropdown = document.querySelector(".belowPage-bab-dropdown");

  // Only proceed if the bab dropdown exists on the page
  if (babDropdown) {
    // Add a click event listener to the bab dropdown for event delegation
    babDropdown.addEventListener("click", function (e) {
      // Prevent the default anchor tag behavior
      e.preventDefault();
      // Get the clicked element
      const target = e.target;

      // Check if the clicked element is an anchor tag
      if (target.tagName === "A") {
        // Get the parent list item of the clicked anchor
        const parent = target.parentElement;

        // Handle different click scenarios
        if (target.classList.contains("open-all")) {
          // If "open all" is clicked, open all bab dropdowns
          openAllBabDropdowns(babDropdown);
        } else if (target.classList.contains("collapse-all")) {
          // If "collapse all" is clicked, collapse only sub-sub-bab-dropdowns
          collapseSubSubBabDropdowns(babDropdown);
        } else if (parent.querySelector("ul")) {
          // If the clicked item has a nested list, toggle its visibility
          parent.classList.toggle("active");
        } else if (target.hasAttribute("data-value")) {
          // If the clicked item has a data-value attribute, update URL and reload
          const value = target.getAttribute("data-value");

          // old code
          // Update the URL hash
          // window.location.hash = "#tableID=l1:p" + value;
          // l1: was resetting 10 row length pages like radheefs

          // new code
          // Get current URL hash
          const currentHash = window.location.hash;
          // Extract the current page length value using regex
          const lengthMatch = currentHash.match(/l(\d+)/);
          // Use the existing length value if found, otherwise default to 1
          const pageLength = lengthMatch ? lengthMatch[1] : "1";
          // Update hash while preserving the page length
          window.location.hash = `#tableID=l${pageLength}:p${value}`;
          //

          // Smoothly scroll to the top before reloading
          window.scrollTo({ top: 0, behavior: "smooth" });
          // Delay reload until after the smooth scroll completes
          setTimeout(() => {
            location.reload();
          }, 150); // Adjust the delay as needed
        }
      }
    });

    // Function to open all bab dropdowns
    function openAllBabDropdowns(rootElement) {
      // Select all list items in the bab dropdown
      const allItems = rootElement.querySelectorAll("li");
      allItems.forEach((item) => {
        // If the item contains a nested list, make it visible
        if (item.querySelector("ul")) {
          item.classList.add("active");
        }
      });
    }

    // Function to collapse only sub-sub-bab-dropdowns
    function collapseSubSubBabDropdowns(rootElement) {
      // Select only the active sub-sub-bab-dropdown items
      const subSubBabDropdowns = rootElement.querySelectorAll(
        "li > ul > li.active",
      );
      subSubBabDropdowns.forEach((item) => {
        // Remove the active class to collapse the sub-sub-bab-dropdown
        item.classList.remove("active");
      });
    }
  }

  // Ensure the page is smoothly scrolled to the top after reload
  // This runs regardless of whether the bab dropdown exists
  window.scrollTo({ top: 0, behavior: "smooth" });
});

//
/* === === ===
 DT CUSTOM JS BELOW
=== === === */
//

//
let table; // Variable to store the DataTable instance
//

// CUSTOM columnDefs CONFIGURATION
// remember to place ...columnDefsconfig at the very end of columnDefs: [], right before it is closed, otherwise overwrites and nonapplies will occur
let columnDefsconfig = [
  // settings for all book tables
  {
    targets: "_all",
    // hides panes for all other columns
    searchPanes: {
      show: false,
    },
    /*},
  {
    targets: "_all",*/
    // if \r\n|\n|\r occurs more than once, i dont want <br class="dtBr"> to occure more than once

    render: (data) => {
      return (
        data
          // double newlines
          .replace(
            /(\r\n\r\n|\n\n|\r\r)+/g,
            '\t<br class="dtBr">\t<br class="dtBr">',
          )
          // single newlines
          .replace(/(\r\n|\n|\r)+/g, '\t<br class="dtBr">')
      );
    },
  },
];
//

// CUSTOM DT CONFIGURATION
let DTconfig = {
  // can enable this to use globally via spread, but need to disable it if im going to do things like merging multiple js arrays
  //data: data,

  // keytable option is set to !isMobile, which means that it will be true if the user is not on a mobile device (i.e., isMobile is false), and false if the user is on a mobile device (i.e., isMobile is true).
  keys: !isMobile,

  // https://www.gyrocode.com/articles/jquery-datatables-save-and-restore-table-state-using-unique-url/
  keepConditions: true,

  // https://datatables.net/reference/option/columns
  // columns: [null, null, null, null, null, null, null],

  //columnDefs: [],

  layout: {
    top: [
      "search",
      // "inputPaging",
      "search",

      {
        buttons: [
          {
            extend: "copy",
            // https://datatables.net/forums/discussion/comment/234022/#Comment_234022
            // removes copied to clipboard notification
            copySuccess: false,

            key: {
              key: "c",
              altKey: true,
            },

            titleAttr: "copy",
            text: "ނަކަލުކުރައްވާ",

            // Shown at the very top of the exported document
            // title: * (default) - Use the HTML page's title value.

            footer: false,
            header: false,

            fieldSeparator: "\n\n",
            exportOptions: {
              columns: ":visible",

              modifier: {
                page: "current",
              },
            },
            customize: function (data) {
              // Replace different newlines with \n
              data = data.replace(/\r\n|\n|\r/g, "\n");
              // Replace tabs with double newlines
              data = data.replace(/\t/g, "\n\n");
              //data = data.replace(/\t/g, "\n");
              // Replace more than 2 consecutive newlines with just 2 newlines
              data = data.replace(/\n{3,}/g, "\n\n");
              //
              // Convert sans-serif digits to regular digits
              // First, replace sans-serif digits with regular digits
              /*Object.entries(sansSerifDigits).forEach(
                ([regularDigit, sansSerifDigit]) => {
                  const regex = new RegExp(sansSerifDigit, "g");
                  data = data.replace(regex, regularDigit);
                }
              );*/

              //

              //  REPLACE quran page title with surah number and name
              // Only proceed if currentSurah is defined
              if (typeof currentSurah !== "undefined" && currentSurah) {
                // Split the data into rows
                var rows = data.split("\n");
                // Get the current Surah number and name
                var currentSurahNumber = currentSurah;
                var currentSurahName = arabicSurahNames[currentSurahNumber];
                // Define the lines we want to replace
                var linesToReplace = [
                  "الترجمة الرسمية – ރަސްމީ ޤުރްއާން ތަރުޖަމާ",
                ];
                // Replace the specified lines with Surah number and name
                rows = rows.map(function (row) {
                  if (linesToReplace.includes(row.trim())) {
                    return `${currentSurahNumber} ${currentSurahName}`;
                  }
                  return row;
                });
                // Join the rows back together
                data = rows.join("\n");
              }
              //

              //
              // NOTE that the below newline reduction will reduce even wanted newlines where footnotes come above other content, like in dfk
              // Split the data at the line of dashes
              let parts = data.split("\n\nـــــــــــــــــــــــــــ\n\n");
              if (parts.length > 1) {
                // Replace all double newlines with single newlines in the part after the line of dashes
                parts[1] = parts[1].replace(/\n\n/g, "\n");
                // Ensure there's a double newline at the very end
                parts[1] = parts[1].replace(/\n$/, "\n\n");
                // Join the parts back together with only a single newline after the dashes
                data =
                  parts[0] + "\n\nـــــــــــــــــــــــــــ\n" + parts[1];
              }
              //

              // print to console
              //console.log(JSON.stringify(data));
              return data;
            },
          },
        ],
      },
    ],

    bottom: ["inputPaging", "info"],
  }, // layout: { END
}; // var DTconfig = { END

// Remove the defaults
DataTable.defaults.layout = {
  topStart: null,
  topEnd: null,
  bottomStart: null,
  bottomEnd: null,
};
//

// DataTable.defaults.layout = { };
// DataTable.defaults.language = { };

//
Object.assign(DataTable.defaults, {
  // https://datatables.net/reference/option/layout

  // https://datatables.net/reference/option/language
  // LANGUAGE SET DEFAULTS
  language: {
    emptyTable: "– ނުފެނުނު –",
    info: "",
    // info: "_TOTAL_ ގެ ތެރެއިން _START_ އިން _END_ އަށް",

    infoFiltered: "(ޖުމްލަ ބެލުނީ _MAX_)",
    infoEmpty: "ނަތީޖާއެއް ނުފެނުނު",
    //lengthMenu: "ބަރި ދައްކާ _MENU_",
    loadingRecords: "",
    // loadingRecords: "ލޯޑުވަނީ...",
    search: "",
    searchPlaceholder: "ސާރޗްކުރައްވާ...",
    // searchPlaceholder: 'ސީދާ ލަފްޒު "މިހެން ހޯދާ"، !މިލަފްޒު ނުލާ ހޯދާ',
    zeroRecords: "ނަތީޖާއެއް ނުފެނުނު",
    paginate: {
      first: "<< ",
      last: " >>",
      next: " >",
      previous: "< ",
    },

    entries: {
      _: "",
      1: "",
    },

    // https://datatables.net/reference/option/buttons.buttons.text
    buttons: {
      // https://datatables.net/reference/button/pageLength
      pageLength: {
        _: "%d ބަރި ދައްކާ",
        "-1": "ހުރިހާ",
      },
      //colvis: "☰ ފޮރުވާ/ދައްކާ",
      // https://datatables.net/reference/button/copyHtml5
      copyTitle: "&nbsp; ކޮޕީ 📋",
      // copySuccess: {
      //   1: "1 ކޮޕީވެއްޖެ",
      //   _: "%d ކޮޕީވެއްޖެ",
      // },
    },
    searchBuilder: {
      button: "🔍 ކަސްޓަމް ސާޗް",
      data: "Column",
    },
    searchPanes: {
      // https://datatables.net/reference/option/language.searchPanes.collapse
      // looks like i wont need text: "⧩ ފިލްޓާ" with this
      collapse: { 0: "⧩ ބަރި ފިލްޓާ", _: "⧩ ބަރި ފިލްޓާ (%d)" },
      title: {
        _: "%d ފިލްޓާ ކުރެވިފާ",
        0: "0 ފިލްޓާ ކުރެވިފާ",
        1: "1 ފިލްޓާ ކުރެވިފާ",
      },
      count: "{total}",
      countFiltered: "{shown} ({total})",
      emptyMessage: "— ވަކި އެއްޗެއް ނުޖަހާ —",
      clearMessage: "ފިލްޓާތައް ދުއްވާލާ",
    },
  }, // language END
  //

  //
  // https://datatables.net/examples/basic_init/state_save.html
  stateSave: true,
  // currently" above works
  // above seems to break table, use the one below
  //bstateSave: true,

  // prevents state save from saving colvis / column visibility. else stuff like quran additional translations mess up the table on reload
  // https://datatables.net/reference/option/stateSaveParams
  stateSaveParams: function (settings, data) {
    //data.search.search = ""; // Remove a saved filter, so filtering is never saved:
    // delete data.search;
    //
    // https://datatables.net/reference/option/stateSaveCallback
    // https://datatables.net/forums/discussion/27259/selective-state-saving-only-on-colvis-plugin
    for (var i = 0; i < data.columns.length; i++) {
      // delete data.columns[i].search;
      delete data.columns[i].visible;
    }
  },
  //

  // https://datatables.net/reference/option/stateDuration
  // default is 2 hours, now set to 1 day
  stateDuration: 86400,
  //
  // https://datatables.net/reference/option/ordering
  ordering: false,
  //
  // https://datatables.net/reference/option/orderClasses
  orderClasses: false,
  //
  // https://datatables.net/reference/option/searchDelay
  searchDelay: 350,
  //
  // https://datatables.net/reference/option/autoWidth
  autoWidth: false,
  //
  //

  mark: {
    // pair whats needed between arabic diacritic normalization and markjs search highlight

    // ignorePunctuation is actually supposed to be used for making matches with or without punctuation characters, like ["'"]
    // i repurposed it as a arabic diacritic thaskeel remove
    // \u064B-\u065F

    ignorePunctuation: ["ًٌٍَُِّْٕٖٜٟٗ٘ٙٚٛٝٞ"],
    //
    synonyms: {
      // arabic
      أ: "ا",
      آ: "ا",
      إ: "ا",
      ٱ: "ا",
      //
      ؤ: "و",
      ة: "ه",
      ئ: "ى",

      // thaskeel \u064B-\u065F
      // مَ: "م",
      // كَ: "ك",

      // thikijehi thaana
      ޘ: "ސ",
      ޙ: "ހ",
      ޛ: "ޒ",
      ޜ: "ޒ",
      ޞ: "ސ",
      ޠ: "ތ",
      ޡ: "ޒ",
      ޢ: "އ",
      ޤ: "ގ",
      ޥ: "ވ",
    },
  },

  //
  lengthMenu: [1, 2, 3, 4, 5, 10, 20, 30, 40, 50],
  // this sets the default value on table load. make sure the value is available above too
  displayLength: 1,
  //
}); // Object.assign(DataTable.defaults, { END
//

// Function to initialize or reinitialize the DataTable
// function initializeDataTable() {
// Initialize DataTable with chosen config
//new DataTable("#example", {
table = new DataTable("#tableID", {
  //
  ...DTconfig,

  //
}); // new DataTable("#example", { END

//

// https://medium.com/@kashmiry/datatables-arabic-search-normalization-575949b0453c
// https://gist.github.com/kashmiry/ba35115ba23e8b6f034c2562dbd4042c#file-datatables-diacriticsarabic-js

// DataTables Arabic Search Normalization Function
// Extend diacritics to support Arabic characters

// pair whats needed between arabic diacritic normalization and markjs search highlight
$(function () {
  // Check if DataTable is defined
  if (typeof DataTable !== "undefined") {
    // Define a function to normalize Arabic text
    DataTable.util.diacritics(function (str, both) {
      // If the input is not a string, return it as is
      if (typeof str !== "string") {
        return str;
      }
      // Normalize the string by replacing specific Arabic characters
      var normalized = str
        .normalize("NFD") // Normalize the string to decompose characters
        // remember to repeat in 'mark: { synonyms: { } }'
        // added ٱ
        .replace(/[أآإٱ ٰ]/g, "ا") // Replace different forms of alef with a single form
        .replace("ؤ", "و") // Replace waw with its alternative form
        .replace(/ة/g, "ه") // Replace taa marbota with ha
        .replace(/[\u064B-\u065F]/g, "") // Remove diacritics (tashkeel)
        // added
        .replace("ئ", "ى") // Replace waw with its alternative form
        // thikijehi thaana
        .replace(/ޘ/g, "ސ")
        .replace(/ޙ/g, "ހ")
        .replace(/ޛ/g, "ޒ")
        .replace(/ޜ/g, "ޒ")
        .replace(/ޞ/g, "ސ")
        .replace(/ޠ/g, "ތ")
        .replace(/ޡ/g, "ޒ")
        .replace(/ޢ/g, "އ")
        .replace(/ޤ/g, "ގ")
        .replace(/ޥ/g, "ވ");

      // Return the normalized string, appending the original if lengths differ
      // Check if the length of the normalized string is different from the original
      return normalized.length !== str.length
        ? (both === true ? str + " " : "") + // If 'both' is true, append the original string
            normalized.replace(/[\u0300-\u036f]/g, "") // Remove (non arabic) diacritics from the normalized string
        : // "ًٌٍَُِّْٕٖٜٟٗ٘ٙٚٛٝٞ"
          normalized; // If lengths are the same, return the normalized string as is
    });
  }
});
//

// This ensures that the code runs after the entire DOM has been fully loaded.
document.addEventListener("DOMContentLoaded", function () {
  //
  //
  // Focus on search input for desktop view
  // IF DESKTOP, NOT MOBILE
  if (!isMobile) {
    // https://datatables.net/forums/discussion/comment/124081/#Comment_124081
    $("div.dt-search .dt-input").focus();

    // scrollToTop scroll to top on desktop https://datatables.net/blog/2019/scroll-to-top
    // instead of using the plugin externally, place the code here directly
    // it seems this does the same thing as the mobile version of the scroll
    table.on("page", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      // previously it would go to top of table, but now it goes to top of page
      /*window.scrollTo({
        top: 0,
        behavior: "smooth",
        // window.scrollTo({
        //    top: $(table.table().container()).offset().top,
        //    behavior: "smooth",
      });*/
      /*setTimeout(function () {
                  $(document).scrollTop($(table.table().container()).offset().top);
                }, 10);*/
    }); // table.on("page", function () { END
    //
    // IF MOBILE
  } else {
    // scroll to top of table row on mobile
    table.on("page", function () {
      //setTimeout(function () {
      // https://datatables.net/forums/discussion/comment/175697/#Comment_175697
      // CURRENTLY MOST UP TO DATE CODE USED
      // other code works too, but navbar hides the top of tr, so this code calculates the height of navbar and scrolls to where it ends
      const scrollToElement = document.querySelector("tbody");
      // const scrollToElement = document.querySelector("tbody tr");
      const navbarHeight = document.querySelector(".navbar").offsetHeight;

      const scrollToPosition =
        scrollToElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = scrollToPosition - navbarHeight;

      window.scrollTo({
        // top: offsetPosition,
        top: offsetPosition + 25, // scroll 25 pixels further down than the calculated position of the target
        behavior: "smooth",
      });
    }); // table.on("page", function () { END

    // NEW SWIPE CODE
    //
    // Set touch-action: auto for tableID https://hammerjs.github.io/touch-action/
    // https://stackoverflow.com/questions/1601933/how-do-i-stop-a-web-page-from-scrolling-to-the-top-when-a-link-is-clicked-that-t
    //document.getElementById("tableID").style.touchAction = "auto";
    // “I can’t select my text anymore!” https://hammerjs.github.io/tips/
    delete Hammer.defaults.cssProps.userSelect;
    //
    // Hammer(tableID).on("swipeleft", function () {
    Hammer(document.querySelector(".dataTable")).on("swipeleft", function () {
      //event.preventDefault(); // Prevent default behavior
      table.page("previous").draw("page");
    });
    //  Hammer(document.getElementById("tableID")).on("swiperight", function () {
    Hammer(document.querySelector(".dataTable")).on("swiperight", function () {
      //event.preventDefault(); // Prevent default behavior
      table.page("next").draw("page");
    });

    //
  } // if (!isMobile) { } else { END

  //
  // changes <input type="text"> type to search type, so that delete icon appears
  // adds a placeholder to the input
  $(".dt-paging-input input")
    .prop("type", "search")
    .attr("placeholder", "ސަފުހާ");
  // add more width, or make text smaller later?
  //

  /*
  this is my code

it uses the row().show() pluging to work
This plugin jumps to the right page of the DataTable to show the required row
i'd rather use scrollIntoView() instead
*/

  $("tbody").on("dblclick", "tr", function () {
    // Clear any existing search
    if (table.search() !== "") {
      table.search("").draw();
    }

    // Get the index of the clicked row
    var clickedRowIndex = table.row(this).index();

    // Check if the row index is valid
    if (clickedRowIndex !== undefined) {
      // Get the page info
      var pageInfo = table.page.info();
      var targetPage = Math.floor(clickedRowIndex / pageInfo.length);

      // Navigate to the target page
      table.page(targetPage).draw(false);

      // Get the row node after the page change
      var rowNode = table.row(clickedRowIndex).node();
      if (rowNode) {
        /*// Scroll the row into view
        rowNode.scrollIntoView({ behavior: "smooth", block: "start" });
        // block: "start" ? / center*/

        /* code modified to incorporate navbar height consideration: */

        // Get navbar height
        const navbarHeight =
          document.querySelector(".navbar")?.offsetHeight || 0;

        // Get the row's position
        const rowPosition =
          rowNode.getBoundingClientRect().top + window.pageYOffset;

        // Calculate offset position to account for navbar
        const offsetPosition = rowPosition - navbarHeight;

        // Scroll to the calculated position
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  });
}); // document.addEventListener("DOMContentLoaded", function () { END
