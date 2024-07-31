// navLoader.ts
import { getrole } from '../../utils/token';
import { defaultNavItems, employerNavItems, jobSeekerNavItems, NavItem } from './navdata';

document.addEventListener("DOMContentLoaded", ()=>{
    if (getrole()){
        const role = getrole()!;
        loadNavigation(role);
    }
    else{
        loadNavigation('not logged');
    }
})

export function loadNavigation(role: string) {
    let navItems: NavItem[] = [];

    switch (role) {
        case 'employer':
            navItems = employerNavItems;
            break;
        case 'jobseeker':
            navItems = jobSeekerNavItems;
            break;
        default:
            navItems = defaultNavItems;
    }

    const navContainer = document.getElementById('nav-container');
    if (navContainer) {
        navContainer.innerHTML = navItems.map(item => `
            <a class="nav-link" id="${item.id}">${item.label}</a>
        `).join('');
    }
}
