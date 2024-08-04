import { JoblistingDetail } from "../../interfaces/joblisting";
import { populateTemplate } from "../../utils/replaceTemplateVar";

export const showJoblisting = async (data: JoblistingDetail[]) => {
  try {
    console.log(data);
    const filterHtml = await fetch("/src/views/joblisting/jobfilter.html").then(
      (response) => response.text()
    );

    const htmlFile = await fetch("/src/views/joblisting/joblisting.html").then(
      (response) => response.text()
    );
    const htmlString = data
      .map((data: JoblistingDetail) => populateTemplate(htmlFile, data))
      .join("");
    const addedHtmlString =
      filterHtml +
      '<div class="container p-5" id="filter-job"><div class="row">' +
      htmlString +
      "</div></div>";
    console.log("From show job listing");
    return addedHtmlString;
  } catch (error) {
    console.log("Error during listing:", error);
  }
};
export const showFilterJoblisting = async (data: JoblistingDetail[]) => {
  try {
    const htmlFile = await fetch("/src/views/joblisting/joblisting.html").then(
      (response) => response.text()
    );
    const htmlString = data
      .map((data: JoblistingDetail) => populateTemplate(htmlFile, data))
      .join("");
    const addedHtmlString =
      '<div class="container"><div class="row">' +
      htmlString +
      "</div></div>";
    return addedHtmlString;
  } catch (error) {
    console.log("Error during listing:", error);
  }
};

export const showJoblistingByEmployer = async (data: JoblistingDetail[]) => {
  try {
    if (data.length == 0) return "<h1>No Job to show</h1>";
    const htmlFile = await fetch("/src/views/joblisting/joblisting.html").then(
      (response) => response.text()
    );
    const htmlString = data
      .map((data: JoblistingDetail) => populateTemplate(htmlFile, data))
      .join("");
    const addedHtmlString =
      '<div class="container mt-4"><div class="row-jobs">' +
      htmlString +
      "</div></div>";
    return addedHtmlString;
  } catch (error) {
    console.log("Error during listing:", error);
  }
};
