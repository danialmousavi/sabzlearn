import React, { useEffect, useState } from "react";
import "./Topbar.css";
export default function Topbar() {
  const [adminData, setAdminData] = useState({});
  const [notification, setNotification] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  //fetch admin data
  const fetchData = () => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    fetch("http://localhost:3000/v1/auth/me", {
      headers: {
        Authorization: `Bearer ${localStorageData}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAdminData(data);
        setNotification(data.notifications);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  // change notification status
  const seeNotification = (id) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    fetch(`http://localhost:3000/v1/notifications/see/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorageData}`,
      },
    }).then((res) =>
      res.json().then((data) => {
        fetchData();
      })
    );
  };
  return (
    <div className="container-fluid">
      <div className="container">
        <div
          class={`home-header ${
            showNotification && "active-modal-notfication"
          }`}
        >
          <div className="home-right">
            <div className="home-searchbar ">
              <input
                type="text"
                className="search-bar"
                placeholder="جستجو..."
              />
            </div>
            <div className="home-notification ">
              <button
                type="button"
                onMouseEnter={() => setShowNotification(true)}
              >
                <i className="far fa-bell"></i>
              </button>
            </div>
            <div
              className="home-notification-modal "
              onMouseEnter={() => setShowNotification(true)}
              onMouseLeave={() => setShowNotification(false)}
            >
              <ul className="home-notification-modal-list ">
                {notification.length === 0 ? (
                  <>
                    <li className="home-notification-modal-item alert alert-warning">
                        هیچ پیفامی وجود نداد!
                    </li>
                  </>
                ) : (
                  <>
                    {notification &&
                      notification.map((item) => (
                        <li
                          className="home-notification-modal-item"
                          key={item._id}
                        >
                          <span className="home-notification-modal-text">
                            {item.msg}
                          </span>
                          <label className="switch">
                            <button
                              className="btn btn-success"
                              onClick={() => seeNotification(item._id)}
                            >
                              دیدم
                            </button>
                          </label>
                        </li>
                      ))}
                  </>
                )}
              </ul>
            </div>
          </div>
          <div className="home-left">
            <div className="home-profile">
              <div className="home-profile-image">
                <a href="#">
                  <img src={adminData.profile} alt="" />
                </a>
              </div>
              <div className="home-profile-name">
                <a href="#">{adminData.name}</a>
              </div>
              <div className="home-profile-icon">
                <i className="fas fa-angle-down"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
