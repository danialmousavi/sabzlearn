import ArticleInfo from "./pages/Article/ArticleInfo";
import CategoryInfo from "./pages/Category/CategoryInfo";
import CourseInfo from "./pages/courseinfo/CourseInfo";
import Index from "./pages/index/Index";

const Routes=[
    {path:'/',element:<Index/>},
    {path:'/category-info/:categoryName',element:<CategoryInfo/>},
    {path:'/course-info/:courseName',element:<CourseInfo/>},
    {path:'/article-info/:articleName',element:<ArticleInfo/>},

]
export default Routes