import { logging } from "./_util.js";
import { getCommand } from "./components/terminal/terminal.js";
import { playCarousel } from "./pkgs/carousel.js";
import { addReasonItem, focusOnChipInput, initForm } from "./handlers/form/form.handler.js";
import { initRouter } from "./services/router.service/url-router.service.js";

try {
  window.onload = () => {
    initRouter(() => {
      const url = new URL(window.location.href)
      if (url.pathname.includes("sandbox")) {
        playCarousel()
        return
      }

      // loadGrid()
      logging();
      getCommand();
      focusOnChipInput()
      addReasonItem();
      initForm("formHitMeUp", { id: "hitMeUpDialog", openTrigger: "btnOpenHmuForm", closeTrigger: "btnCloseHmuForm" })
      playCarousel()
    })
  };
} catch (error) {
  throw new Error("No window bro. Where's your window bro???");
}

/**
 * does that cool block hover effect thing over a grid
 */
function loadGrid() {
  const divider = (24 * 24) * .75;
  const grid = document.querySelector('.bg__grid') as HTMLDivElement;
  const wrapper = document.querySelector('#hitMeUpDialog') as HTMLDialogElement;
  grid.innerHTML = ""
  const cells = Math.round(wrapper.clientHeight * (divider / 100))
  console.log(cells);

  for (let i = 0; i < divider; i++) {
    const newBlock = document.createElement('div');
    newBlock.classList.add('bg__block');
    grid.appendChild(newBlock);
  }
}



