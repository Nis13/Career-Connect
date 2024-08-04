import { getEmployer } from "../../interfaces/Users";
import { populateEmployerTemplate } from "../../utils/replaceTemplateVar";

export const displayEmployers = async (data: getEmployer[]) => {
  const tableHTML = `<div class="container mt-4">
            <h1>Admin Dashboard - Employers</h1>
            <div><button id='admin-create-employer' class="btn">Create Employer</button></div>
            <table class="table table-striped mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Company Name</th>
                        <th>Email</th>
                        <th>Contact No</th>
                        <th>Location<th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="employer-table-body"></tbody>
            </table>
        </div>`;
  const employerHTML = `
                        <tr>
                        <td>{{employerId}}</td>
                        <td>{{employerName}}</td>
                        <td>{{employerEmail}}</td>
                        <td>{{employercontactNo}}</td>
                        <td>{{employerLocation}}</td>
                        <td><button class='btn admin-delete-jobseeker' data-id='{{employerId}}'>Delete Jobseeker</button></td>
                        </tr> 
                    `;
  const htmlString = data
    .map((data: getEmployer) => populateEmployerTemplate(employerHTML, data))
    .join("");

  return tableHTML.replace('<tbody id="employer-table-body"></tbody>',`<tbody id="employer-table-body">${htmlString}</tbody>`);
};
