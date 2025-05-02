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
import PanelAdmin from "./pages/AdminPanel/Index"
import Users from "./pages/AdminPanel/Users/Users";
import AdminCourses from "./pages/AdminPanel/Courses/Courses";
import AdminArticles from "./pages/AdminPanel/Articles/Articles";
import Menus from "./pages/AdminPanel/Menus/Menus";
const Routes=[
    {path:'/',element:<Index/>},
    {path:'/category-info/:categoryName/:page',element:<CategoryInfo/>},
    {path:'/course-info/:courseName',element:<CourseInfo/>},
    {path:'/article-info/:articleName',element:<ArticleInfo/>},
    {path:'/articles/:page',element:<Articles/>},
    {path:'/courses/:page',element:<Courses/>},
    {path:'/login',element:<Login/>},
    {path:'/register',element:<Register/>},
    {path:'/contact',element:<Contact/>},
    {path:'/search/:value',element:<Search/>},
    {path:'/p-admin/*',element:<PanelAdmin/>, children:[
        {path:'users',element:<Users/>},
        {path:'courses',element:<AdminCourses/>},
        {path:'articles',element:<AdminArticles/>},
        {path:'menus',element:<Menus/>}
    ]},

]
export default Routes