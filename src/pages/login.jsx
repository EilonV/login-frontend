import { useRef } from "react";
import httpsService from "../services/https.service";

export const Login = () => {
    const errorRef = useRef()
    const handleForm = (e) => {
        e.preventDefault()
        let email = e.target[0]
        let pass = e.target[1]

        httpsService.find(email.value, 'email')
            .then((res) => {
                if (res.data.users.length && pass.value === res.data.users[0].password) {
                    console.log('YES')
                }
                else if (!res.data.users.length)
                    addError('email', email)
                else
                    addError('pass', pass)
            })
    }

    const addError = (type, el) => {
        removePriorErrors()
        errorRef.current.classList.add(`error-${type}`)
        el.classList.add('error')
    }

    const removePriorErrors = () => {
        if ([...errorRef.current.classList].includes('error-email')
            || [...errorRef.current.classList].includes('error-pass')) {
            errorRef.current.classList.remove('error-pass')
            errorRef.current.classList.remove('error-email')
        }
    }

    const handleErrorRemovals = (e) => {
        e.target.classList.remove('error')
        removePriorErrors()
    }

    return <section className="home flex column align-center justify-center">
        <div className="gradient"/>
        <div className="login" ref={errorRef}>
            <h1>Login</h1>
            <form className="flex column" action="/form" autoComplete="new-password" onSubmit={handleForm}>
                <input type="text" autoComplete="new-password" placeholder="Email" required onInput={handleErrorRemovals} onClick={handleErrorRemovals}/>
                <input type="password" autoComplete="new-password" placeholder="Password" required onInput={handleErrorRemovals} onClick={handleErrorRemovals} />
                <button>Sign in</button>
            </form>

            {/* <div className="color-line-wrapper flex">
                <div className="color-line line1" />
                <div className="color-line line2" />
                <div className="color-line line3" />
                <div className="color-line line4" />
            </div> */}
        </div>
    </section>
}