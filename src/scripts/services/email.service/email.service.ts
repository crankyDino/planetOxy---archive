import { IEmail } from "../../models/email-payload.model.js";

export function sendEmail(content: IEmail): Promise<any> {
    try {
        const URL = "http://localhost:5200/api/communication"

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(content),
            // redirect: "follow"
        };

        return fetch(URL + "/send", requestOptions)
        // .then((response) => response.text())
        // .then((result) => console.log(result))
        // .catch((error) => console.error(error));

    } catch (error) {
        // throw new invali(error.);
        console.log(error);
    }
}