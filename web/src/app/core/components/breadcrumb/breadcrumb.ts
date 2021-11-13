export interface Breadcrumb {
  name: string;
  url: string;
  queryParams?: any;
  pauseDisplay?: boolean;
}

export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: NavItem[];
}

export let menu: NavItem[] = [
  {
    displayName: 'Dashboard',
    iconName: 'group',
    route: 'dashboard',
  },
  {
    displayName: 'Project List',
    iconName: 'group',
    route: 'project',
    children: [
      {
        displayName: "Project Detail",
        iconName: 'group',
        route: 'project/detail',
      }
    ]
  },
  {
    displayName: 'Agent List',
    iconName: 'group',
    route: 'agent',
    children: [
      {
        displayName: "Agent Detail",
        iconName: 'group',
        route: 'agent/detail',
      }
    ]
  },
  {
    displayName: 'Environment List',
    iconName: 'grading',
    route: 'environment',
    children: [
      {
        displayName: "Environment Detail",
        iconName: 'grading',
        route: 'environment/detail',
      }
    ]
  },
  {
    displayName: 'Task Force List',
    iconName: 'grading',
    route: 'task-force',
    children: [
      {
        displayName: "Task Force Detail",
        iconName: 'grading',
        route: 'task-force/detail',
      }
    ]
  },
  {
    displayName: 'Job List',
    iconName: 'grading',
    route: 'job',
    children: [
      {
        displayName: "Job Detail",
        iconName: 'grading',
        route: 'job/detail',
      }
    ]
  }

];
