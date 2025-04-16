import ArticleInfo from "./pages/Article/ArticleInfo";
import CategoryInfo from "./pages/Category/CategoryInfo";
import CourseInfo from "./pages/courseinfo/CourseInfo";
import Courses from "./pages/Courses/Courses";
import Index from "./pages/index/Index";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

const Routes=[
    {path:'/',element:<Index/>},
    {path:'/category-info/:categoryName',element:<CategoryInfo/>},
    {path:'/course-info/:courseName',element:<CourseInfo/>},
    {path:'/article-info/:articleName',element:<ArticleInfo/>},
    {path:'/courses',element:<Courses/>},
    {path:'/login',element:<Login/>},
    {path:'/register',element:<Register/>},

]
export default Routes