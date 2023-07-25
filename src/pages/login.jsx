export const Login = () => {
    const handeForm = (e) => {
        e.preventDefault()
    }
    return <section className="home flex column align-center justify-center">
        <div className="gradient" />
        <div className="login">
            <h1>Login</h1>
            <form className="flex column" action="/form" autoComplete="new-password" onSubmit={handeForm}>
                <input type="text" autoComplete="new-password" />
                <input type="password" autoComplete="new-password" />
                <button>Sign in</button>
            </form>
            <div className="color-line-wrapper flex">
                <div className="color-line line1" />
                <div className="color-line line2" />
                <div className="color-line line3" />
                <div className="color-line line4" />
            </div>
        </div>
    </section>
}