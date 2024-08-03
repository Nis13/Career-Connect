import { getEmployer } from "../../interfaces/Users";
import { populateAdminTemplate} from "../../utils/replaceTemplateVar";

export const displayEmployers = async (data: getEmployer[]) => {
  const tableHTML = `<div class="container mt-4">
            <h1>Admin Dashboard - Admins</h1>
            <div><button id='admin-create-admin'>Create Admin</button></div>
            <table class="table table-striped mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="employer-table-body"></tbody>
            </table>
        </div>`;
  const employerHTML = `
                        <tr>
                        <td>{{userId}}</td>
                        <td>{{name}}</td>
                        <td>{{email}}</td>
                        <td><button class='admin-delete-jobseeker' data-id='{{userId}}'>Delete Jobseeker</button></td>
                        </tr> 
                    `;
  const htmlString = data
    .map((data: getEmployer) => populateAdminTemplate(employerHTML, data))
    .join("");

  return tableHTML.replace('<tbody id="employer-table-body"></tbody>',`<tbody id="employer-table-body">${htmlString}</tbody>`);
};
