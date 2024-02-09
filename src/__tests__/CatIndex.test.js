import { render, screen } from "@testing-library/react"
import CatIndex from "../pages/CatIndex"
import { BrowserRouter } from "react-router-dom"
import mockCats from "../mockCats.js"

describe("<CatIndex />", () => {
  it("renders all the cats", () => {
    render(
      <BrowserRouter>
        <CatIndex cats={mockCats} />
      </BrowserRouter>
    )
   
    mockCats.forEach((cat) => {
      const catName = screen.getByText( 
        /Meet All the Cats/i
     )
      expect(catName).toBeInTheDocument()
    })
  })
})