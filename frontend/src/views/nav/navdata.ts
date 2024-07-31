

export interface NavItem {
    id: string;
    label: string;
}

export const employerNavItems = [
    { id: 'employerDashboard', label: 'Dashboard'},
    { id: 'job-postings', label: 'Job Postings'},
    { id: 'applications', label: 'Applications'},
    { id: 'company-profile', label: 'Company Profile'}
];

export const jobSeekerNavItems = [
    { id: 'dashboard', label: 'Dashboard'},
    { id: 'job-search', label: 'Job Search'},
    { id: 'applications', label: 'My Applications'},
    { id: 'profile', label: 'My Profile'}
];

export const defaultNavItems = [
    { id: 'login-link', label: 'Login'},
    { id: 'employer-signup-link', label: 'Signup as Employer'},
    { id: 'jobseeker-signup-link', label: 'Signup as Job Seeker'},
    { id: 'home-link', label: 'Home'}
];
