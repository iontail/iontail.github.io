/* ==========================================================================
   Various functions that we want to use within the template
   ========================================================================== */

const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const defaultTheme = document.documentElement.dataset.theme || "light";

function determineThemeSetting() {
  const theme = localStorage.getItem("theme");
  return ["dark", "light", "system"].includes(theme) ? theme : defaultTheme;
}

function determineComputedTheme() {
  const theme = determineThemeSetting();
  return theme === "system" ? (systemTheme.matches ? "dark" : "light") : theme;
}

function setTheme(theme = determineComputedTheme()) {
  if (theme === "dark") {
    $("html").attr("data-theme", "dark");
    $("#theme-icon").removeClass("fa-sun").addClass("fa-moon");
  } else {
    $("html").removeAttr("data-theme");
    $("#theme-icon").removeClass("fa-moon").addClass("fa-sun");
  }
}

// Toggle the theme manually
var toggleTheme = () => {
  const current_theme = $("html").attr("data-theme");
  const new_theme = current_theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", new_theme);
  setTheme(new_theme);
};

/* ==========================================================================
   Plotly integration script so that Markdown codeblocks will be rendered
   ========================================================================== */

// Read the Plotly data from the code block, hide it, and render the chart as new node. This allows for the 
// JSON data to be retrieve when the theme is switched. The listener should only be added if the data is 
// actually present on the page.
import { plotlyDarkLayout, plotlyLightLayout } from './theme.js';
let plotlyElements = document.querySelectorAll("pre>code.language-plotly");
if (plotlyElements.length > 0) {
  document.addEventListener("readystatechange", () => {
    if (document.readyState === "complete") {
      plotlyElements.forEach((elem) => {
        // Parse the Plotly JSON data and hide it
        var jsonData = JSON.parse(elem.textContent);
        elem.parentElement.classList.add("hidden");

        // Add the Plotly node
        let chartElement = document.createElement("div");
        elem.parentElement.after(chartElement);

        // Set the theme for the plot and render it
        const theme = (determineComputedTheme() === "dark") ? plotlyDarkLayout : plotlyLightLayout;
        if (jsonData.layout) {
          jsonData.layout.template = (jsonData.layout.template) ? { ...theme, ...jsonData.layout.template } : theme;
        } else {
          jsonData.layout = { template: theme };
        }
        Plotly.react(chartElement, jsonData.data, jsonData.layout);
      });
    }
  });
}

const cardMotion = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");

document.querySelectorAll("[data-card-motion]").forEach((card) => {
  let frame = 0;

  card.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse" || !cardMotion.matches) return;

    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (event.clientX - left) / width;
      const y = (event.clientY - top) / height;

      card.style.setProperty("--card-x", `${x * 100}%`);
      card.style.setProperty("--card-y", `${y * 100}%`);
      card.style.setProperty("--card-tilt-x", `${(0.5 - y) * 4.8}deg`);
      card.style.setProperty("--card-tilt-y", `${(x - 0.5) * 4.8}deg`);
      card.classList.add("is-tracking");
    });
  });

  card.addEventListener("pointerleave", () => {
    cancelAnimationFrame(frame);
    card.classList.remove("is-tracking");
  });
});

/* ==========================================================================
   Actions that should occur when the page has been fully loaded
   ========================================================================== */

$(document).ready(function () {
  // SCSS SETTINGS - These should be the same as the settings in the relevant files 
  const scssLarge = 925;          // pixels, from /_sass/_themes.scss
  const scssMastheadHeight = 70;  // pixels, from the current theme (e.g., /_sass/theme/_default.scss)

  setTheme();
  systemTheme.addEventListener("change", () => {
    if (determineThemeSetting() === "system") setTheme();
  });

  // Enable the theme toggle
  $('#theme-toggle').on('click', toggleTheme);

  // Enable the sticky footer
  var bumpIt = function () {
    $("body").css("padding-bottom", "0");
    $("body").css("margin-bottom", $(".page__footer").outerHeight(true));
  }
  $(window).resize(function () {
    didResize = true;
  });
  setInterval(function () {
    if (didResize) {
      didResize = false;
      bumpIt();
    }}, 250);
  var didResize = false;
  bumpIt();

  // FitVids init
  fitvids();

  // Follow menu drop down
  $(".author__urls-wrapper button").on("click", function () {
    $(".author__urls").fadeToggle("fast", function () { });
    $(".author__urls-wrapper button").toggleClass("open");
  });

  // Restore the follow menu if toggled on a window resize
  jQuery(window).on('resize', function () {
    if ($('.author__urls.social-icons').css('display') == 'none' && $(window).width() >= scssLarge) {
      $(".author__urls").css('display', 'block')
    }
  });

  // Preserve the native focus change for the skip link.
  $("a").not(".masthead__skip").smoothScroll({
    offset: -scssMastheadHeight,
    preventDefault: false,
  });

});
