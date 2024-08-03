import { getJobseeker } from "../../interfaces/Users";
import { populateJobseekerTemplate } from "../../utils/replaceTemplateVar";

export const displayJobseekers = async (data: getJobseeker[]) => {
    const tableHTML = `<div class="container mt-4">
              <h1>Admin Dashboard - Jobseekers</h1>
              <div><button id='admin-create-jobseeker'>Create Jobseeker</button></div>
              <table class="table table-striped mt-4">
                  <thead>
                      <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Contact No</th>
                          <th>Skills</th>
                          <th>Industry</th>
                          <th>Options</th>
                      </tr>
                  </thead>
                  <tbody id="employer-table-body"></tbody>
              </table>
          </div>`;
    
  const employerHTML = `
  <tr>
    <td>{{userId}}</td>
    <td>{{userName}}</td>
    <td>{{userEmail}}</td>
    <td>{{userContactNo}}</td>
    <td>{{userSkills}}</td> 
    <td>{{userIndustry}}</td>
    <td>
      <button class='admin-update-jobseeker' data-id='{{userId}}'>Update Jobseeker</button>
      <button class='admin-delete-jobseeker' data-id='{{userId}}'>Delete Jobseeker</button>
    </td>
  </tr>
`
  const htmlString = data
      .map((data: getJobseeker) => populateJobseekerTemplate(employerHTML, data))
      .join("");
  
    return tableHTML.replace('<tbody id="employer-table-body"></tbody>',`<tbody id="employer-table-body">${htmlString}</tbody>`);
  };