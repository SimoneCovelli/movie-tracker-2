import "./ErrorToast.css";

type SuccessToastProps = {
  isOpen: boolean;
  children: string;
};

function ErrorToast({ isOpen, children }: SuccessToastProps) {
  return (
    <div className={isOpen ? "error-toast" : "error-toast hidden"}>
      {children}
    </div>
  );
}

export default ErrorToast;
