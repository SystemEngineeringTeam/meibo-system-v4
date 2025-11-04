import { useNavigate } from "react-router";

export function useBack(): () => void {
  const navigate = useNavigate();
  return () => {
    void navigate(-1);
  };
}
