import { toast } from 'sonner';

interface IToastComponent {
  type: "success" | "error"
  message: string
}

const ToastComponent = ({ type, message }: IToastComponent) => {
  return (
    <>
      {type == "success" ? (
        toast.success(message)
      ) : (
        toast.error(message)
      )}
    </>
  )
}

export default ToastComponent