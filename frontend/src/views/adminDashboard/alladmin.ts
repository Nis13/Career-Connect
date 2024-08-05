import { Admin } from "../../interfaces/Users";
import { navigateTo } from "../../scripts/eventHandlers/eventHandler";
import { createAdmin } from "../../scripts/services/admin";
import { populateAdminTemplate} from "../../utils/replaceTemplateVar";
import { getToken } from "../../utils/token";

export const displayAdmins = async (datas: Admin[]) => {
  const tableHTML = `<div class="container mt-4">
            <h1>Admin Dashboard - Admins</h1>
            <div><button id='admin-create-admin' class="btn">Create Admin</button></div>
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
  const adminHTML = `
                        <tr>
                        <td>{{userId}}</td>
                        <td>{{name}}</td>
                        <td>{{email}}</td>
                        <td><button class='btn admin-delete-admin' data-id='{{userId}}'>Delete Admin</button></td>
                        </tr> 
                    `;
                    const htmlString = datas
                    .map((data: Admin) => populateAdminTemplate(adminHTML, data))
                    .join("");

  return tableHTML.replace('<tbody id="employer-table-body"></tbody>',`<tbody id="employer-table-body">${htmlString}</tbody>`);
};

export const handleSignupAdmin = async (event: Event) => {
  event.preventDefault();

  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement)
    .value;
  
  const userData = {
    name:name,
    email:email,
    password:password
  }

  try {
    const response = await createAdmin(userData);
    alert(response.data.message);
    if (response.data.message == "Admin Created successfully") {
      if (getToken()) navigateTo('/adminDashboard/getallAdmin')
        else navigateTo('/login');
    }
  } catch (error) {
    console.error("Error during signup:", error);
  }
};