import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { baseUrl } from "@/services";
import { setUser } from "@/store/user";
import { setCookie } from "nookies";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type LoginDto = {
  email: string;
  password: string;
};

const Login = () => {
  const defaultValues: LoginDto = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginDto>({ defaultValues });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<LoginDto> = (data) => {
    const headers = new Headers();

    headers.append("Content-Type", "application/json");

    const body = JSON.stringify(data);

    fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers,
      body,
    })
      .then(async (response) => {
        const data = await response.json();

        if (response.status !== 200) throw new Error(data.message[0]);

        setCookie(undefined, "nextauth.token", data.access_token, {
          maxAge: 60 * 60 * 1, // 1 hour
        });

        dispatch(setUser(data));
        navigate("/");
      })
      .catch((error) => {
        toast({
          title: "Erro",
          description: error.message,
          variant: "destructive",
        });
      });
  };

  return (
    <div className="flex flex-col items-center  text-white">
      <div className="flex flex-col w-full items-center  gap-3 p-4">
        <h1 className="font-bold text-xl">Login</h1>

        <p> Realize o login para acessar o sistema</p>

        <form
          className="flex flex-col items-center gap-3 w-full "
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register("email")}
            type={"email"}
            className="bg-[#2a3942] rounded-sm w-full px-3 py-3 "
            placeholder="Email"
          />

          <input
            {...register("password")}
            type={"password"}
            className="bg-[#2a3942] rounded-sm w-full px-3 py-3 "
            placeholder="Senha"
          />

          <button className="bg-green-600 rounded-lg px-2 py-1">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
