import React from "react";
import { useNavigate } from "react-router-dom";
import "./SubPage1.scss";

export default function SubPage1() {
  const navigate = useNavigate();
  return (
    <div>
      메인 페이지입니다.
      <div
        className="subpage3"
        onClick={() => {
          navigate("/");
        }}
      >
        mainPage 이동 버튼입니다.
      </div>
      <div
        className="subpage4"
        onClick={() => {
          navigate("/subpage2");
        }}
      >
        subpage2 이동 버튼입니다.
      </div>
    </div>
  );
}
