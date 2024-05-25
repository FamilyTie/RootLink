

function LoginForm({handleSubmit} : {handleSubmit: any}) {
  return (
    <form
          className="absolute z-[4] scale-[1.1] bg-white inset-0 mx-[66.42%] mt-[200px] w-[337px] h-[435px] rounded-[1px]"
          onSubmit={handleSubmit}
          aria-labelledby="login-heading"
        >
          <h2
            id="login-heading"
            className="font-400 text-[36px] m-auto text-center pt-10"
          >
            Welcome back!
          </h2>

          <label
            htmlFor="username"
            className="text-[18px] pt-[3rem] ml-[63px] m-auto font-500"
          >
            Email-Adress:
          </label>
          <input
            type="text"
            className="border bg-[#ceeafd20] border-[#0A69AE] m-auto rounded-sm w-[210px]"
            autoComplete="email"
            id="email"
            name="email"
          />

          <label
            htmlFor="password"
            className="text-[18px] pt-[8px] ml-[63px] m-auto font-500"
          >
            Password
          </label>
          <input
            type="password"
            className="border bg-[#ceeafd20] border-[#0A69AE] m-auto rounded-sm w-[210px]"
            autoComplete="current-password"
            id="password"
            name="password"
          />

          <button
            type="submit"
            className="w-[102px] h-[33px] ml-[35%] mt-[43px] bg-[#042B48] text-white"
          >
            Log-In
          </button>
          <p className="text-center pt-5">
            Don't have an account?{" "}
            <span className="underline">
              <a href="/sign-up">Sign up</a>
            </span>
          </p>
        </form>
  )
}

export default LoginForm