import React from "react";
import { useNavigate } from "react-router-dom";
import "./SubPage2.scss";

export default function SubPage2() {
  const navigate = useNavigate();
  return (
    <div>
      메인 페이지입니다.
      <div
        className="subpage5"
        onClick={() => {
          navigate("/subpage1");
        }}
      >
        subpage1 이동 버튼입니다.
      </div>
      <div
        className="subpage6"
        onClick={() => {
          navigate("/");
        }}
      >
        mainpage 이동 버튼입니다.
      </div>
    </div>
  );
}
