import { save_tokens_constant, session_expired } from "../utlis/constants";

export const exit_session = () => {
  localStorage.removeItem(save_tokens_constant);
  localStorage.setItem(session_expired, true);
  window.location.reload();
};
