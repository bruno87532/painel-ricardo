import { redirect } from "next/navigation"

const CatchAllPage = () => {
  redirect("/auth")
}

export default CatchAllPage