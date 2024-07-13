import { rain, freeze } from "../../pkgs/matrix.js";
import { commands } from "./commands.js";

export function getCommand() {
  const terminal = document.getElementById("terminal_window");
  if (terminal) {
    terminal.onclick = () => {
      window.onkeydown = (ev) => {
        ev.preventDefault()
        keydown_Handler(ev);
      };
    };
  }

  window.onclick = (ev: Event) => {
    const target = ev.target as HTMLElement;

    if (!target.className.includes("terminal")) {
      // console.log(target);
      // console.log("bye bitch biatch");

      window.onkeydown = null;
    }
  };
}

let history: Array<string> = []
const keydown_Handler = (ev: KeyboardEvent) => {
  const cmd = document.getElementById("terminal_input");
  switch (ev.code) {
    case "Space":
      cmd.innerText += `\u00a0`;
      console.log("click clack biatch");
      window.scrollTo(0, window.scrollX);
      break;
    case "Backspace":
      cmd.innerText = `${cmd?.innerText.slice(0, cmd.innerText.length - 1)}`;
      break;
    case "Enter":
      if (cmd.innerText.trim() && cmd.innerText.trim().length > 0) {
        history.push(cmd.innerText.trim())
      }
      const runner = cmd.innerText.trim()
      runCommand(runner)
      newLine();
      break;
    case "ArrowUp":
      console.log(history);

      cmd.innerText = rewind("forward", cmd.innerText.trim())
      break;
    case "ArrowDown":
      console.log(history);

      cmd.innerText = rewind("backward", cmd.innerText.trim())
      break;
    default:
      if (ev.code.includes("Key") || ev.code.includes("Digit")) {
        cmd.innerText += ev.key;
        // console.log(cmd.innerText);
      }
      break;
  }
};

function rewind(direction: "forward" | "backward", position: string) {
  if (!history.length || history.length <= 0) {
    return ""
  }

  if (!position || position === "") {
    return history[history.length - 1]
  }

  const i = history.findIndex((x, i) => x === position ? i : "")

  if (direction === "forward") {
    return history[i - 1]
  }

  return history[i + 1]
}

function newLine(): void {
  const terminal_input_area_container = document.getElementById(
    "terminal_input_area_container"
  );
  const rowIdNo: number = terminal_input_area_container.childElementCount;
  const rowId: string = "command_row_" + rowIdNo.toString();

  // document.getElementById("terminal_input_area").dataset.rowId = rowIdNo.toString();

  document.getElementById("terminal_input_area").id = rowId;

  const inputArea = document.createElement("div");
  inputArea.innerHTML = document.getElementById(rowId).innerHTML;
  inputArea.classList.add(...document.getElementById(rowId).classList.values());
  inputArea.id = "terminal_input_area";
  (inputArea.querySelector("#terminal_input") as HTMLElement).innerText = "";

  document.getElementById("terminal_input").id =
    "row_input_" + rowIdNo.toString();

  terminal_input_area_container.appendChild(inputArea);
  inputArea.scrollIntoView();
  window.scrollTo(0, window.scrollX);
  // terminal_input_area_container.scroll(0,findPosition(document.getElementById(inputArea.id))[0])
}

function findPosition(elem: HTMLElement): number[] {
  let currTop = 0;
  if (elem.offsetParent) {
    do {
      currTop += elem.offsetTop;
    } while (elem === elem.offsetParent);
  }
  return [currTop];
}

function runCommand(command: string) {
  const availableCommands = Object.values(commands)
  const prompt = availableCommands.some((x) => x.includes(command)) ? command.trim() : null

  // if (prompt)
  //   switch (prompt) {
  switch (command) {
    case "freeze":
      freeze()
      break;
    case "help":
      console.log("uhmmmmmmmmmmm");
      const cmd = document.getElementById("terminal_input");
      let response: string = ""
      response = "List of Commands \n"
      response += "------------------\n"
      availableCommands.forEach((x) => {
        response += ";\n"
        response += x
      })
      console.log(response);

      cmd.innerText = `${response}`
      break;
    case "hello alice":
      // case "rain":
      rain()
      break;
    default:
      console.log("??????????");
      break;
  }
}

