import "./SuccessToast.css";

type SuccessToastProps = {
  isOpen: boolean;
  children: string;
};

function SuccessToast({ isOpen, children }: SuccessToastProps) {
  return (
    <div className={isOpen ? "success-toast" : "success-toast hidden"}>
      {children}
    </div>
  );
}

export default SuccessToast;
