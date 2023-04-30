import React from "react";
import { useNavigate } from "react-router-dom";
import "./MainPage.scss";
import ExamCard from "../conponents/ExamCard";
import { testType } from "../types/type";

export default function MainPage() {
  const navigate = useNavigate();
  let submitProp: testType = { testString: "aa", testString2: "bb" };
  return (
    <div>
      메인 페이지입니다.
      <div
        className="subpage1"
        onClick={() => {
          navigate("/subpage1");
        }}
      >
        subpage1 이동 버튼입니다.
      </div>
      <div
        className="subpage2"
        onClick={() => {
          navigate("/subpage2");
        }}
      >
        subpage2 이동 버튼입니다.
      </div>
      <ExamCard {...submitProp} />
    </div>
  );
}
