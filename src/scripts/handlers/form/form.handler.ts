import { IContact } from "../../models/contact.model.js"
import { IEmail } from "../../models/email-payload.model.js"
import { IFullname } from "../../models/fullname.model.js"
import { sendEmail } from "../../services/email.service/email.service.js"

const validationOptions = {
  hasValue: {
    attribute: 'required',
    isValid: (controller: HTMLInputElement | HTMLTextAreaElement) => { return controller.value.trim() !== "" },
    onSuccess: (label: Element) => { label.setAttribute("hidden", "") },
    errorMsg: (controller: Element, label: Element) => { return `${label.textContent.split(":")[0]} is required` },
    onError: (errLabel: Element) => { errLabel.removeAttribute("hidden") }
  },
  maxLength: {
    attribute: 'maxlength',
    isValid: (controller: HTMLInputElement | HTMLTextAreaElement) => {
      const max = controller.getAttribute('maxlength');
      return controller.value.length <= parseInt(max)
    },
    errorMsg: (controller: Element, label: Element) => { return `${label.textContent.split(":")[0]} is too long` },
    onSuccess: (label: Element) => { label.setAttribute("hidden", "") },
    onError: (errLabel: Element) => { errLabel.removeAttribute("hidden") }
  },
  minLength: {
    attribute: 'minlength',
    isValid: (controller: HTMLInputElement | HTMLTextAreaElement) => {
      const min = controller.getAttribute('minlength');
      return controller.value.length >= parseInt(min)
    },
    onSuccess: (label: Element) => { label.setAttribute("hidden", "") },
    errorMsg: (controller: Element, label: Element) => { return `${label.textContent.split(":")[0]} is too short` },
    onError: (errLabel: Element) => { errLabel.removeAttribute("hidden") }
  },
  formatIsValid: {
    attribute: 'minlength',
    isValid: (controller: HTMLInputElement | HTMLTextAreaElement) => {
      const min = controller.getAttribute('minlength');
      return controller.value.length >= parseInt(min)
    },
    onSuccess: (label: Element) => { label.setAttribute("hidden", "") },
    errorMsg: (controller: Element, label: Element) => { return `${label.textContent.split(":")[0]} is too short` },
    onError: (errLabel: Element) => { errLabel.removeAttribute("hidden") }
  },
}

/**
 * 
 * @param {string} formId 
 * @param { {id: string, openTrigger: string, closeTrigger: string } } dialog 
 * @returns 
 */
export function initForm(formId: string, dialog?: { id: string, openTrigger: string, closeTrigger: string }): void {
  const formElem = document.getElementById(formId) as HTMLFormElement
  const formGroups = Array.from(formElem.querySelectorAll(".form__group"))
  console.log(formGroups)

  formGroups.forEach((group) => {
    const controller = group.querySelector("input,textarea") as HTMLInputElement | HTMLTextAreaElement;
    const errLabel = group.querySelector(".form--error") as HTMLElement;
    controller.onblur = (ev) => {
      console.log(ev);
      if (controller.hasAttribute(validationOptions.hasValue.attribute) && !validationOptions.hasValue.isValid(controller)) {
        // errLabel.textContent = validationOptions.hasValue.errorMsg(controller, controller.labels[0]); //dynamic error message
        validationOptions.hasValue.onError(errLabel);
      } else {
        validationOptions.hasValue.onSuccess(errLabel);
      }
    }
  })
  validateForm(formElem);

  if (dialog) {
    toggle(dialog.id, dialog.openTrigger, dialog.closeTrigger);
  }
}

/**
 * 
 * @param dialogId 
 * @param openTrigger 
 * @param closeTrigger 
 */
function toggle(dialogId: string, openTrigger: string, closeTrigger: string): void {
  const btnClose = document.getElementById(closeTrigger) as HTMLButtonElement;
  const btnOpen = document.getElementById(openTrigger) as HTMLButtonElement;
  const dialog = document.getElementById(dialogId) as HTMLDialogElement;

  btnClose.onclick = () => {
    resetForm(dialog.querySelector("form").id);
    dialog.close();
  };

  btnOpen.onclick = () => {
    dialog.showModal();
  };
}

let reasons: Map<string, string> = new Map();
export function addReasonItem() {
  const inputReasonList = document.getElementById("hmuReasonList") as HTMLDivElement;
  const reasonFormGroup = document.getElementById("hmuReasonList").parentElement as HTMLDivElement;
  const inputReason = document.getElementById("hmuReason") as HTMLInputElement;
  const errLabel = reasonFormGroup.querySelector(".form--error") as HTMLElement;

  console.log(reasonFormGroup);

  inputReason.onkeydown = (ev) => {
    if (ev.key === "Backspace" && inputReason.value === "" && reasons.size > 0) {
      deleteChipItem(`chip_${(reasons.size - 1).toString()}`);
    }

    if (ev.key === "Enter") {
      if (!validationOptions.hasValue.isValid(inputReason)) {
        validationOptions.hasValue.onError(errLabel);
        return
      }
      validationOptions.hasValue.onSuccess(errLabel);

      const chipId = `chip_${(reasons.size).toString()}`;
      reasons.set(
        chipId || "chip_0",
        inputReason.value
      );
      createChip(inputReasonList, inputReason, chipId);
    }
  };
}

export function focusOnChipInput(): void {
  const container = document.getElementById("hmuReasonList")
  const containerInput = document.getElementById("hmuReason")
  container.onclick = () => {
    containerInput.focus()
  }
}

/**
 * 
 * @param {HTMLDivElement} targetContainer - target input container  
 * @param {HTMLInputElement} inputSrc 
 * @param {Map<string, string>} data 
 * @returns 
 */
function createChip(targetContainer: HTMLDivElement, inputSrc: HTMLInputElement, data: string): void {
  try {
    //create chip
    const itemTemp = document.createElement("span");
    itemTemp.innerText = inputSrc.value
    itemTemp.id = data || "chip_0";
    itemTemp.classList.add(
      "rounded-xl",
      "bg-orange-dh",
      "font-semibold",
      "text-[#fff]",
      "flex",
      "flex-row",
      "gap-3",
      "h-[1.6em]",
      "px-2",
      "items-start"
    );

    const itemBtn = document.createElement("button");
    itemBtn.id = data || "chip_0";
    itemBtn.innerText = "x"
    itemBtn.type = "button"
    itemBtn.onclick = (ev: Event) => {
      deleteChipItem(itemBtn.id);
    }

    inputSrc.remove()
    inputSrc.value = ""

    itemTemp.append(itemBtn)
    targetContainer.append(itemTemp);
    targetContainer.append(inputSrc);
    inputSrc.focus()
  } catch (error) {
    console.error(`Unexpected error: ${error}`)
  }
}

/**
 * Deletes a chip item with the chip id and targeting the dom e 
 * @param {string} id 
 * @returns 
 */
function deleteChipItem(id: string): void {
  try {
    document.getElementById(id.toString()).remove()
    reasons.delete(id)
  } catch (error) {
    console.error(`Unexpected error: ${error}`)
  }
}

/**
 * 
 * @param {HTMLFormElement} form 
 * @returns 
 */
export function validateForm(form: HTMLFormElement): boolean {
  form.setAttribute("novalidate", "")

  form.onsubmit = (ev) => {
    ev.preventDefault()
    if (form.checkValidity()) {
      console.log("sending");
      submitHitMeUp(form)
    }

    validateAllFormGroups(form)
  }
  return true
}

/**
 * 
 * @param {HTMLFormElement}form 
 */
function validateAllFormGroups(form: HTMLFormElement): void {
  const formGroups = Array.from(form.querySelectorAll(".form__group"))

  formGroups.forEach((group) => {
    validateFormGroup(group)
  })
}

/**
 * 
 * @param {Element}formGroup 
 * @returns 
 */
function validateFormGroup(formGroup: Element): void {
  const label = formGroup.querySelector("label")
  const formControl = formGroup.querySelector("input, textarea") as HTMLInputElement | HTMLTextAreaElement
  const errLabel = formGroup.querySelector(".form--error") as Element

  for (const opt of Object.values(validationOptions)) {
    if (formControl.hasAttribute(opt.attribute) && !opt.isValid(formControl)) {
      errLabel.textContent = opt.errorMsg(formControl, label);
      opt.onError(errLabel)
      return
    }
  }
}

/**
 * 
 * @param {string}formId 
 * @returns 
 */
function resetForm(formId: string): void {
  const controls = Array.from(document.getElementById(formId).querySelectorAll<HTMLInputElement | HTMLInputElement>("input,textarea"));
  const errLabel = Array.from(document.getElementById(formId).querySelectorAll<HTMLElement>(".form--error"));

  controls.forEach((ctrl: HTMLInputElement | HTMLInputElement) => {
    ctrl.value = ""
  });

  errLabel.forEach((label) => {
    label.setAttribute("hidden", "true")
  });

  reasons.clear()
}

/**
 * 
 * @param {HTMLFormElement}form 
 * @returns 
 */
function submitHitMeUp(form: HTMLFormElement): void {
  const controls = Array.from(form.querySelectorAll<HTMLInputElement | HTMLInputElement>("input,textarea"))
  let payload: IEmail = new IEmail()
  let contact: IContact = new IContact()

  controls.forEach(control => {
    switch (control.labels[0].textContent) {
      case "First name:":
        {
          contact.fullname.firstname = control.value
          break;
        }
      case "Last name:":
        {
          contact.fullname.lastname = control.value
          break;
        }
      case "E-Mail":
        {
          contact.email = control.value
          break;
        }
      case "Reason":
        {
          let listOfReasons: string = "Re:"
          if (reasons) {
            reasons.forEach(reason => {
              listOfReasons += `, ${reason}`
            });
            payload.subject += listOfReasons
          }
          break
        };
      case "What's up?":
        {
          payload.message += control.value
          break;
        }
    }
  })

  payload.contacts = [contact]
  sendEmail(payload)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}