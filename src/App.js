import React, { useEffect, useState } from "react"
import "./App.css"
import { Routes, Route, useNavigate } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import CatIndex from "./pages/CatIndex"
import CatShow from "./pages/CatShow"
import CatNew from "./pages/CatNew"
import CatEdit from "./pages/CatEdit"
import NotFound from "./pages/NotFound"

const App = () => {
  const [cats, setCats] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    readCat()
  }, [])

  const readCat = () => {
    fetch("https://cat-tinder-ivew.onrender.com/cats")
      .then((response) => response.json())
      .then((data) => setCats(data))
      .catch((errors) => console.log("Cat read errors:", errors))
  }

  const createCat = (newCat) => {
    fetch("https://cat-tinder-ivew.onrender.com/cats", {
      body: JSON.stringify(newCat),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then(() => readCat())
      .catch((errors) => console.log("Cat create errors:", errors))
  }

  const updateCat = (cat, id) => {
    fetch(`https://cat-tinder-ivew.onrender.com/cat_fights/${id}`, {
      body: JSON.stringify(cat),
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        readCat()
        navigate(`/catshow/${id}`)
      })
      .catch((errors) => console.log("Cat edit errors:", errors))
  }

  console.log(cats)
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catindex" element={<CatIndex cats={cats} />} />
        <Route path="/catshow/:id" element={<CatShow cats={cats} />} />
        <Route path="/catnew" element={<CatNew createCat={createCat} />} />
        <Route
          path="/catedit"
          element={<CatEdit cats={cats} updateCat={updateCat} />} // Passing cats and updateCat function as props
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
