import ArticleInfo from "./pages/Article/ArticleInfo";
import Articles from "./pages/Articles/Articles";
import CategoryInfo from "./pages/Category/CategoryInfo";
import Contact from "./pages/ContactUs/Contact";
import CourseInfo from "./pages/courseinfo/CourseInfo";
import Courses from "./pages/Courses/Courses";
import Index from "./pages/index/Index";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Search from "./pages/Search/Search";
import PanelAdmin from "./pages/AdminPanel/Index";
import Users from "./pages/AdminPanel/Users/Users";
import AdminCourses from "./pages/AdminPanel/Courses/Courses";
import AdminArticles from "./pages/AdminPanel/Articles/Articles";
import Menus from "./pages/AdminPanel/Menus/Menus";
import AdminCategory from "./pages/AdminPanel/Category/Category";
import AdminContact from "./pages/AdminPanel/Contact/Contact";
import Sessions from "./pages/AdminPanel/Sessions/Sessions";
import Session from "./pages/Session/Session";
import Comments from "./pages/AdminPanel/Comments/Comments";
import Offs from "./pages/AdminPanel/Offs/Offs";
import PAdminIndex from "./pages/AdminPanel/Index/Index";
import UserPanel from "./pages/UserPanel/Index";
import UserPanelIndex from "./pages/UserPanel/Index/Index";
import Orders from "./pages/UserPanel/Orders/Orders";
import OrdersDetail from "./pages/UserPanel/Orders/OrdersDetail";
import UserPanelCourses from "./pages/UserPanel/Courses/Courses";
import EditUserAccount from "./pages/UserPanel/EditAccount/EditAccount";
import PAdminPrivate from "./components/Privates/PAdminPrivate";
const Routes = [
  { path: "/", element: <Index /> },
  { path: "/category-info/:categoryName/:page", element: <CategoryInfo /> },
  { path: "/course-info/:courseName", element: <CourseInfo /> },
  { path: "/article-info/:articleName", element: <ArticleInfo /> },
  { path: "/articles/:page", element: <Articles /> },
  { path: "/courses/:page", element: <Courses /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/contact", element: <Contact /> },
  { path: "/search/:value", element: <Search /> },
  { path: "/:courseName/:sessionId", element: <Session /> },

  {
    path: "/p-admin/*",
    element: (
      <PAdminPrivate>
        <PanelAdmin />
      </PAdminPrivate>
    ),
    children: [
      { path: "", element: <PAdminIndex /> },
      { path: "users", element: <Users /> },
      { path: "courses", element: <AdminCourses /> },
      { path: "articles", element: <AdminArticles /> },
      { path: "menus", element: <Menus /> },
      { path: "categories", element: <AdminCategory /> },
      { path: "contacts", element: <AdminContact /> },
      { path: "sessions", element: <Sessions /> },
      { path: "comments", element: <Comments /> },
      { path: "offs", element: <Offs /> },
    ],
  },
  {
    path: "/my-account/*",
    element: <UserPanel />,
    children: [
      { path: "", element: <UserPanelIndex /> },
      { path: "orders", element: <Orders /> },
      { path: "orders/:detail", element: <OrdersDetail /> },
      { path: "buyed", element: <UserPanelCourses /> },
      { path: "edit-account", element: <EditUserAccount /> },
    ],
  },
];
export default Routes;
