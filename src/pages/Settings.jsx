import { useMemo } from "react";
import { jwtDecode } from "jwt-decode";

function getUserRole() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return jwtDecode(token).role;
  } catch (error) {
    console.log(error);
    return null;
  }
}

function Settings() {
  const role = useMemo(getUserRole, []);

  return (
    <div className="p-4">
      <h1>Настройки камеры</h1>

      <section className="mt-6">
        <h2>Базовые</h2>
      </section>

      {role === "root" && (
        <section className="mt-6 bg-gray-100 p-4 rounded">
          <h2>Dev-настройки|только root</h2>
          <button className="btn">Перезапустить систему</button>
          <button className="btn m1-2">SSH-доступ</button>
        </section>
      )}
    </div>
  );
}

export default Settings;
