import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView";
import LoginView from "@/views/LoginView";
import ProfileView from "@/views/ProfileView";
import AboutTheProject from "@/views/AboutTheProject";
import LogoutView from "@/views/LogoutView";


const routes = [
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
