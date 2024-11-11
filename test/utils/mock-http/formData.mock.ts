import { http, HttpResponse } from "msw";
import { BASE_URL } from "../constand";

const formDataHandlers = [
  http.post(BASE_URL + "/form", async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    return new HttpResponse(JSON.stringify(data));
  }),

  http.post(BASE_URL + "/file", async ({ request }) => {
    try {
      const formData = await request.formData();
      // const file = formData.get("file") as File;
      console.log(formData);

      return new HttpResponse("123123", {
        headers: {
          "content-type": "text/plain", // Set the correct content type for the file
          "content-disposition": "attachment; filename=file.txt", // Set the correct content disposition for the file
        },
      });
    } catch (error) {
      return new HttpResponse("Error uploading file", { status: 500 });
    }
  }),
];

export default formDataHandlers;
