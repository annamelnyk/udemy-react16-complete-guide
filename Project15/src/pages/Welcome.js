import { Route, Routes } from "react-router";

const Welcome = () => {
  return (
    <section>
      <h1>The Welcome page</h1>
      <Routes>
        <Route path="/welcome/new-user" element={<p>Welcome new user</p>} />
      </Routes>
    </section>
  )
}

export default Welcome;