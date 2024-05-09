import { useUI } from '@contexts/ui.context';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';

export interface SignUpInputType {
  email: string;
  password: string;
  first_name: string;
  // remember_me: boolean;
}
async function signUp(input: SignUpInputType) {

  const response = await http.post("http://localhost:8081/api/v1/user",input)
  console.log("Api responseeeeeeee============================",response)

}
export const useSignUpMutation = () => {
  const { authorize, closeModal } = useUI();
  return useMutation((input: SignUpInputType) => signUp(input), {
    onSuccess: (data) => {
      // Cookies.set('auth_token', data.token);
      // authorize();
      closeModal();
    },
    onError: (data) => {
      console.log(data, 'login error response');
    },
  });
};
