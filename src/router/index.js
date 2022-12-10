import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView";
import LoginView from "@/views/LoginView";
import ProfileView from "@/views/ProfileView";
import AboutTheProject from "@/views/AboutTheProject";
import LogoutView from "@/views/LogoutView";
import ProgramAgentListView from "@/views/ProgramAgentListView";
import ProgramAgentView from "@/views/ProgramAgentView";
import CreateProgramAgentView from "@/views/CreateProgramAgentView";
import NotFoundView from "@/views/NotFoundView";
import RegistrationView from "@/views/RegistrationView";
import UsersListView from "@/views/UsersListView";
import ProgramAgentPaymentsAllListView from "@/views/ProgramAgentPaymentsAllListView.vue";


const routes = [
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/registration',
    name: 'registration',
    component: RegistrationView
  },
  {
    path: '/users-list',
    name: 'usersList',
    component: UsersListView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/about-the-project',
    name: 'aboutTheProject',
    component: AboutTheProject
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutView
  },
  {
    path: '/create-program-agent',
    name: 'createProgramAgent',
    component: CreateProgramAgentView
  },
  {
    path: '/program-agents',
    name: 'programAgents',
    component: ProgramAgentListView
  },
  {
    path: '/program-agent/:id',
    name: 'programAgentId',
    component: ProgramAgentView
  },,
  {
    path: '/payments/program-agent',
    name: 'program-agent-payments',
    component: ProgramAgentPaymentsAllListView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
