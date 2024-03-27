import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"


function LoadingButton() {
  return (
    <Button disabled>
      <Loader2 className="my-2 h-4 w-4 animate-spin flex-1 mt-4" />
      Loading
    </Button>
  )
}

export default LoadingButton
