import ArticleInfo from "./pages/Article/ArticleInfo";
import Articles from "./pages/Articles/Articles";
import CategoryInfo from "./pages/Category/CategoryInfo";
import Contact from "./pages/ContactUs/Contact";
import CourseInfo from "./pages/courseinfo/CourseInfo";
import Courses from "./pages/Courses/Courses";
import Index from "./pages/index/Index";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

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

]
export default Routes