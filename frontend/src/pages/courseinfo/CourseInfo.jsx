import React, { useEffect, useState } from "react";
import "./CourseInfo.css";
import Topbar from "../../components/Topbar/Topbar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import CourseDetailBox from "../../components/CourseDetailBox/CourseDetailBox";
import CommentsTextArea from "../../components/CommentsTextArea/CommentsTextArea";
import Accordion from "react-bootstrap/Accordion";
import { Link, useParams } from "react-router";
import { FaLock } from "react-icons/fa6";

import Swal from "sweetalert2";
export default function CourseInfo() {
  const { courseName } = useParams();
  const [courseDetails, setCourseDetails] = useState([]);
  const [courseCategory, setCourseCategory] = useState([]);
  const [updatedAt, setPpdatedAt] = useState("");
  const [sessions, setSessions] = useState([]);
  const [isUserRegisteredToThisCourse, setIsUserRegisteredToThisCourse] =
    useState(false);
  const [courseStudentsCount, setCourseStudentsCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const getCourseDetail = () => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    fetch(`http://localhost:3000/v1/courses/${courseName}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          localStorageData == null ? null : localStorageData
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourseDetails(data);
        setCourseCategory(data.categoryID);
        setPpdatedAt(data.updatedAt);
        setSessions(data.sessions);
        setIsUserRegisteredToThisCourse(data.isUserRegisteredToThisCourse);
        setCourseStudentsCount(data.courseStudentsCount);
        setComments(data.comments);
      });
  };
  useEffect(() => {
    getCourseDetail();
    fetch(`http://localhost:3000/v1/courses/related/${courseName}`)
      .then((res) => res.json())
      .then((data) => {
        setRelatedCourses(data);
        console.log(data);
      });
  }, [courseName]);

  const submitComment = (newCommentBody, commentScore) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    fetch("http://localhost:3000/v1/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageData}`,
      },
      body: JSON.stringify({
        body: newCommentBody,
        courseShortName: courseName,
        score: commentScore,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          title: "عالیه!",
          text: "کامنت با موفقیت ثبت شد",
          icon: "success",
          timer: 3000,
          confirmButtonText: "تایید",
        });
      });
  };
  // const localStorageData = JSON.parse(localStorage.getItem("user"));

  // fetch(`http://localhost:3000/v1/comments`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${localStorageData}`,
  //   },
  //   body: JSON.stringify({
  //     body: newCommentBody,
  //     courseShortName: courseName,
  //   }),
  // })
  //   .then((res) => res.json())
  //   .then((result) => {
  //     console.log(result);
  //   });
  // registerUser
  const registerUser = (course) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    console.log(course);
    if (course.price == 0) {
      Swal.fire({
        title: "آیا از ثبت نام در دوره اطمینان دارید؟",
        icon: "question",
        showConfirmButton: true,
        confirmButtonText: "بله",
        showCancelButton: true,
        cancelButtonText: "خیر",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:3000/v1/courses/${course._id}/register`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorageData}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ price: course.price }),
          }).then((res) => {
            console.log(res);
            if (res.ok) {
              Swal.fire({
                title: "شمابا موفقیت در دوره ثبت نام کردین",
                icon: "success",
                confirmButtonText: "تایید",
              }).then(() => {
                getCourseDetail();
              });
            } else {
              Swal.fire({
                title: "متاسفانه شما در دوره ثبت نام نکردین",
                icon: "error",
                confirmButtonText: "تایید",
              });
            }
          });
        }
      });
    } else {
      Swal.fire({
        title: "آیا از ثبت نام در دوره اطمینان دارید؟",
        icon: "question",
        showConfirmButton: true,
        confirmButtonText: "بله",
        showCancelButton: true,
        cancelButtonText: "خیر",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "اگر کد تخفیف دارید آن را وارد کنید",
            icon: "info",
            input: "text",
            inputPlaceholder: "کد تخفیف",
            showConfirmButton: true,
            confirmButtonText: "اعمال کد تخفیف",
            showCancelButton: true,
            cancelButtonText: "ثبت نام بدون کد تخفیف",
          }).then((code) => {
            if (code.isDismissed) {
              fetch(`http://localhost:3000/v1/courses/${course._id}/register`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${localStorageData}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ price: course.price }),
              }).then((res) => {
                console.log(res);
                if (res.ok) {
                  Swal.fire({
                    title: "شمابا موفقیت در دوره ثبت نام کردین",
                    icon: "success",
                    confirmButtonText: "تایید",
                  }).then(() => {
                    getCourseDetail();
                  });
                } else {
                  Swal.fire({
                    title: "متاسفانه شما در دوره ثبت نام نکردین",
                    icon: "error",
                    confirmButtonText: "تایید",
                  });
                }
              });
            } else {
              fetch(`http://localhost:3000/v1/offs/${code.value}`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${localStorageData}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ course: course._id }),
              })
                .then((res) => {
                  console.log(res);
                  if (res.status === 404) {
                    Swal.fire({
                      title: "کد تخفیف معتبر نیست",
                      icon: "error",
                    });
                  } else if (res.status === 409) {
                    Swal.fire({
                      title: "انقضای کد تخفیف تمام شده است",
                      icon: "error",
                    });
                  } else {
                    res.json();
                  }
                })
                .then((code) => {
                  console.log(code);

                  fetch(
                    `http://localhost:3000/v1/courses/${course._id}/register`,
                    {
                      method: "POST",
                      headers: {
                        Authorization: `Bearer ${localStorageData}`,
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        price: course.price - (course.price * code) / 100,
                      }),
                    }
                  ).then((res) => {
                    if (res.ok) {
                      Swal.fire({
                        title: "شما در دوره با موفقیت ثبت نام شدید",
                        icon: "success",
                      }).then(() => {
                        getCourseDetail();
                      });
                    } else {
                      Swal.fire({
                        title: "متاسفیم شما ثبت نام نشدید",
                        icon: "error",
                      });
                    }
                  });
                });
            }
          });
        }
      });
    }
  };
  return (
    <>
      <Topbar />
      <Navbar />
      <BreadCrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          {
            id: 2,
            title: "آموزش برنامه نویسی فرانت اند",
            to: "category-info/frontend/1",
          },
          { id: 3,  title: `${courseDetails.name}`, to: `course-info/${courseDetails.shortName}` },
        ]}
      />

      {/* Start Course Main Info  */}
      <section className="course-info">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <a href="#" className="course-info__link">
                {courseCategory.title}
              </a>
              <h1 className="course-info__title">{courseDetails.name}</h1>
              <p className="course-info__text">{courseDetails.description}</p>
              <div className="course-info__social-media">
                <a href="#" className="course-info__social-media-item">
                  <i className="fab fa-telegram-plane course-info__icon"></i>
                </a>
                <a href="#" className="course-info__social-media-item">
                  <i className="fab fa-twitter course-info__icon"></i>
                </a>
                <a href="#" className="course-info__social-media-item">
                  <i className="fab fa-facebook-f course-info__icon"></i>
                </a>
              </div>
            </div>

            <div className="col-6">
              <video
                poster={`http://localhost:3000/courses/covers/${courseDetails.cover}`}
                className="course-info__video"
                controls
              ></video>
            </div>
          </div>
        </div>
      </section>
      {/* Finish Course Main Info */}

      <main className="main">
        <div className="container">
          <div className="row">
            <div className="col-8">
              <div className="course">
                {/* Start Course Boxes  */}
                <div className="course-boxes">
                  <div className="row">
                    <CourseDetailBox
                      title="وضعیت دوره:"
                      text={
                        courseDetails.isCompeleted
                          ? "به اتمام رسیده"
                          : "در حال برگزاری"
                      }
                      icon="graduation-cap"
                    />
                    <CourseDetailBox
                      title="مدت زمان دوره:"
                      text=" 19 ساعت"
                      icon="clock"
                    />
                    <CourseDetailBox
                      title="آخرین بروزرسانی:"
                      text={updatedAt.length && updatedAt.slice(0, 10)}
                      icon="calendar-alt"
                    />
                    <CourseDetailBox
                      title="روش پشتیبانی"
                      text={courseDetails.support}
                      icon="user-alt"
                    />
                    <CourseDetailBox
                      title="قیمت"
                      text={
                        courseDetails.price === 0
                          ? "رایگان"
                          : courseDetails.price
                      }
                      icon="info-circle"
                    />
                    <CourseDetailBox
                      title="نوع مشاهده:"
                      text="ضبط شده / آنلاین"
                      icon="play"
                    />
                  </div>
                </div>
                {/* finish course boxes */}
                {/* Start Course Progress  */}
                <div className="course-progress">
                  <div className="course-progress__header">
                    <i className="fas fa-chart-line course-progress__icon"></i>
                    <span className="course-progress__title">
                      درصد پیشرفت دوره: 70%
                    </span>
                  </div>
                  <div className="progress course-progress__bar">
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated"
                      role="progressbar"
                      aria-label="Animated striped example"
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
                {/* Finish Course Progress  */}
                {/* Start Introduction  */}
                <div className="introduction">
                  <div className="introduction__item">
                    <span className="introduction__title title">
                      آموزش 20 کتابخانه جاوا اسکریپت مخصوص بازار کار
                    </span>
                    <img
                      src="/images/info/1.gif"
                      alt="course info image"
                      className="introduction__img img-fluid"
                    />
                    <p className="introduction__text">
                      کتابخانه های بسیار زیادی برای زبان جاوا اسکریپت وجود دارد
                      و سالانه چندین کتابخانه جدید نیز به این لیست اضافه می شود
                      که در بازار کار به شدت از آن ها استفاده می شود و اگر بدون
                      بلد بودن این کتابخانه ها وارد بازار کار شوید، خیلی اذیت
                      خواهید شد و حتی ممکن است ناامید شوید!
                    </p>
                    <p className="introduction__text">
                      در این دوره نحوه کار با 20 مورد از پر استفاده ترین
                      کتابخانه های جاوا اسکریپت به صورت پروژه محور به شما عزیزان
                      آموزش داده می شود تا هیچ مشکلی برای ورود به بازار کار
                      نداشته باشید
                    </p>
                  </div>
                  <div className="introduction__item">
                    <span className="introduction__title title">
                      هدف از این دوره چیست؟ (تنها راه ورود به بازار کار و کسب
                      درآمد)
                    </span>
                    <img
                      src="/images/info/2.jpg"
                      alt="course info image"
                      className="introduction__img img-fluid"
                    />
                    <p className="introduction__text">
                      وقتی برای اولین بار وارد یکی از شرکت های برنامه نویسی شدم،
                      از کتابخانه هایی به اسم Lodash و Formik استفاده می شد، در
                      حالی که من اولین بارم بود اسم Formik را می شنیدم و تا اون
                      موقع از این کتابخانه ها استفاده نکرده بودم.
                    </p>
                    <p className="introduction__text">
                      همینجا بود که متوجه شدم کتابخانه های جاوا اسکریپت یکی از
                      مهم ترین مباحثی هستند که هر برنامه نویس وب برای ورود به
                      بازار کار و کسب درآمد بهتر، راحت و بیشتر باید با آن ها کار
                      کرده باشد{" "}
                    </p>
                    <p className="introduction__text">
                      همان طور که از اسم این دوره مشخص است، هدف از این دوره
                      آموزش 20 مورد از کاربردی ترین و پر استفاده ترین کتابخانه
                      های جاوا اسکریپت است تا شما بتوانید بعد از این دوره با
                      قدرت و آمادگی بیشتر ادامه مسیر برنامه نویسی وب را ادامه
                      دهید، ری اکت یا نود یا … را راحت تر یاد بگیرید و در نهایت
                      وارد بازار کار شده و کسب درآمد کنید.
                    </p>
                    <p className="introduction__text">
                      شا به عنوان یک برنامه نویس وب، حداقل اگر با کتابخانه خاصی
                      کار نکرده باشید، باید بلد باشید که چطور باید یک کتابخانه
                      جدید را یاد بگیرید. فرض کنید یک یک کتابخانه جدید ساخته شد.
                      آیا شما باید منتظر دوره آموزشی باشید؟! قطعا نه.
                    </p>
                    <p className="introduction__text">
                      در این دوره سعی کردیم علاوه بر آموزش مستقیم هر کتابخانه،
                      نحوه یادگیری یک کتابخانه جدید را نیز به شما عزیزان آموزش
                      دهیم تا بعد از گذراندن دوره، دیگر وابسته هیچ دوره یا شخص
                      خاصی نباشید و اگر کتابخانه جدیدی به دنیای جاوا اسکریپت و
                      وب اضافه شد، به راحتی بتوانید آن را یاد بگیرید.
                    </p>
                  </div>
                  <div className="introduction__btns">
                    <a href="#" className="introduction__btns-item">
                      دانلود همگانی ویدیوها
                    </a>
                    <a href="#" className="introduction__btns-item">
                      دانلود همگانی پیوست‌ها
                    </a>
                  </div>

                  <div className="introduction__topic">
                    <Accordion defaultActiveKey="0">
                      {sessions.length ? (
                        <Accordion.Item eventKey="1">
                          <Accordion.Header>معرفی دوره</Accordion.Header>
                          {sessions.map((session, index) => (
                            <>
                              {session.free == 0 ? (
                                <Accordion.Body
                                  className=" introduction__accordion-body"
                                  key={index}
                                >
                                  <div className="introduction__accordion-right">
                                    <span className="introduction__accordion-count">
                                      {index + 1}
                                    </span>
                                    <i className="fab fa-youtube introduction__accordion-icon"></i>
                                    <span
                                      href="#"
                                      className="introduction__accordion-link"
                                    >
                                      {session.title}
                                    </span>
                                  </div>
                                  <div className="introduction__accordion-left">
                                    <span className="introduction__accordion-time">
                                      {session.time}
                                      <FaLock />
                                    </span>
                                  </div>
                                </Accordion.Body>
                              ) : (
                                <Accordion.Body
                                  className=" introduction__accordion-body"
                                  key={index}
                                >
                                  <div className="introduction__accordion-right">
                                    <span className="introduction__accordion-count">
                                      {index + 1}
                                    </span>
                                    <i className="fab fa-youtube introduction__accordion-icon"></i>
                                    <Link
                                      to={`/${courseName}/${session._id}`}
                                      className="introduction__accordion-link"
                                    >
                                      {session.title}
                                    </Link>
                                  </div>
                                  <div className="introduction__accordion-left">
                                    <span className="introduction__accordion-time">
                                      {session.time}
                                    </span>
                                  </div>
                                </Accordion.Body>
                              )}
                            </>
                          ))}
                        </Accordion.Item>
                      ) : (
                        <div className="alert alert-warning">
                          این دوره هنوز ویدیویی ندارد!
                        </div>
                      )}
                    </Accordion>
                  </div>
                </div>
                {/* Finish Introduction  */}
                {/* Start Teacher Details  */}

                <div className="techer-details">
                  <div className="techer-details__header">
                    <div className="techer-details__header-right">
                      <img
                        src="/images/profile.png"
                        alt="Teacher Profile"
                        className="techer-details__header-img"
                      />
                      <div className="techer-details__header-titles">
                        <a href="#" className="techer-details__header-link">
                          محمدامین سعیدی راد
                        </a>
                        <span className="techer-details__header-skill">
                          Front End & Back End Developer
                        </span>
                      </div>
                    </div>
                    <div className="techer-details__header-left">
                      <i className="fas fa-chalkboard-teacher techer-details__header-icon"></i>
                      <span className="techer-details__header-name">مدرس</span>
                    </div>
                  </div>
                  <p className="techer-details__footer">
                    اول از همه برنامه نویسی اندروید رو شروع کردم و نزدیک به 2
                    سال با زبان جاوا اندروید کار میکردم .بعد تصمیم گرفتم در
                    زمینه وب فعالیت داشته باشم.و..
                  </p>
                </div>

                {/* Finish Teacher Details  */}
                <CommentsTextArea
                  comments={comments}
                  submitComment={submitComment}
                />
              </div>
            </div>

            <div className="col-4">
              <div className="courses-info">
                <div className="course-info">
                  <div className="course-info__register">
                    <span className="course-info__register-title">
                      <i className="fas fa-graduation-cap course-info__register-icon"></i>
                      {isUserRegisteredToThisCourse === false ? (
                        <span
                          className="course-info__register-title"
                          style={{ cursor: "pointer" }}
                          onClick={() => registerUser(courseDetails)}
                        >
                          ثبت نام در دوره
                        </span>
                      ) : (
                        <span className="course-info__register-title">
                          دانشجوی دوره هستید
                        </span>
                      )}
                    </span>
                  </div>
                </div>
                <div className="course-info">
                  <div className="course-info__total">
                    <div className="course-info__top">
                      <div className="course-info__total-sale">
                        <i className="fas fa-user-graduate course-info__total-sale-icon"></i>
                        <span className="course-info__total-sale-text">
                          تعداد دانشجو :
                        </span>
                        <span className="course-info__total-sale-number">
                          {courseStudentsCount}
                        </span>
                      </div>
                    </div>
                    <div className="course-info__bottom">
                      <div className="course-info__total-comment">
                        <i className="far fa-comments course-info__total-comment-icon"></i>
                        <span className="course-info__total-comment-text">
                          67 دیدگاه
                        </span>
                      </div>
                      <div className="course-info__total-view">
                        <i className="far fa-eye course-info__total-view-icon"></i>
                        <span className="course-info__total-view-text">
                          14,234 بازدید
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="course-info">
                  <div className="course-info__header-short-url">
                    <i className="fas fa-link course-info__short-url-icon"></i>
                    <span className="course-info__short-url-text">
                      لینک کوتاه
                    </span>
                  </div>
                  <span className="course-info__short-url">
                    https://sabzlearn.ir/?p=117472
                  </span>
                </div>
                <div className="course-info">
                  <span className="course-info__topic-title">
                    سرفصل های دوره
                  </span>
                  <span className="course-info__topic-text">
                    برای مشاهده و یا دانلود دوره روی کلمه
                    <a href="#" style={{ color: "blue", fontWeight: "bold" }}>
                      لینک
                    </a>
                    کلیک کنید
                  </span>
                </div>
                {relatedCourses.length !== 0 && (
                  <div className="course-info">
                    <span className="course-info__courses-title">
                      دوره های مرتبط
                    </span>
                    <ul className="course-info__courses-list">
                      {relatedCourses.map((course) => (
                        <li
                          className="course-info__courses-list-item"
                          key={course._id}
                        >
                          <Link to={`/course-info/${course.shortName}`} className="course-info__courses-link">
                            <img
                              src={`http://localhost:3000/courses/covers/${course.cover}`}
                              alt="Course Cover"
                              className="course-info__courses-img"
                            />
                            <span className="course-info__courses-text">
                              {course.name}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
