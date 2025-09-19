import { useState } from "react";
import { useNavigate} from 'react-router-dom';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const navigate = useNavigate();

  // 로그인
  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      console.log("로그인 결과:", data);
      if (data.success) alert(`환영합니다, ${data.user.name}님!`);
      else alert(data.message);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("로그인 실패");
    }
  };

  // 회원가입
  const handleSignup = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: signupName, email: signupEmail, password: signupPassword }),
      });
      const data = await res.json();
      console.log("회원가입 결과:", data);
      if (data.success) alert("회원가입 완료! 로그인 해주세요.");
      else alert(data.message);
      navigate("");
    } catch (err) {
      console.error(err);
      alert("회원가입 실패");
    }
  };

  return (
    <div className="relative w-full h-full flex justify-center items-center min-h-screen">
      {/* 배경 이미지 */}
      <div
        className="fixed w-full h-full z-0"
        style={{
          backgroundImage: "url('/assets/parking.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* 회원가입/로그인 폼 카드 */}
      <div className="relative bg-white/50 shadow-2xl rounded-lg p-8 w-full max-w-[600px] h-[350px] z-10 overflow-hidden">
        {/* 슬라이딩 컨테이너 */}
        <div
          className={`absolute top-0 left-0 w-[200%] h-full flex transition-transform duration-1000 ease-in-out ${
            activeTab === "login" ? "translate-x-0" : "-translate-x-1/2"
          }`}
        >
          {/* 로그인 */}
          <div className="w-1/2 p-12 flex flex-col justify-center">
            <h2 className="text-2xl font-bold  text-sky-600 mb-6">LOGIN</h2>
            <input
              type="email"
              placeholder="이메일"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
            />
            <button
              onClick={handleLogin}
              className="w-fit self-end bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition"
            >
              로그인
            </button>
          </div>

          {/* 회원가입 */}
          <div className="w-1/2 p-12 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-sky-600 mb-6">SIGN UP</h2>
            <input
              type="text"
              placeholder="이름"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
            />
            <input
              type="email"
              placeholder="이메일"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
            />
            <button
              onClick={handleSignup}
              className="w-fit self-end bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition"
            >
              회원가입
            </button>
          </div>
        </div>

        {/* 슬라이드 토글 버튼 */}
        <div className="absolute top-5 right-5">
          <button
            onClick={() => setActiveTab(activeTab === "login" ? "signup" : "login")}
            className="text-sky-600 hover:underline"
          >
            {activeTab === "login" ? "Go to Sign up" : "Go to Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
