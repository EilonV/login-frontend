import { useRef } from "react";
import { httpsService } from "../services/https.service";
import { localStorageService } from "../services/localstorage";
import eye from '../assets/images/eye.svg'
import shutEye from '../assets/images/eye-off.svg'
export const Login = () => {
    const errorRef = useRef()

    const handleForm = (e) => {
        e.preventDefault()
        let email = e.target[0]
        let pass = e.target[1]

        httpsService.find(email.value, 'email')
            .then((res) => {
                if (res.data.users.length && pass.value === res.data.users[0].password) {
                    localStorageService.saveToStorage('user', res.data.users[0])
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
    const showPass = (e) => {
        if (e.target.nextSibling.type === 'password') {
            e.target.src = eye
            e.target.nextSibling.type = 'text'
        }
        else {
            e.target.src = shutEye
            e.target.nextSibling.type = 'password'
        }
    }
    return <section className="home flex column align-center justify-center">
        <div className="gradient" />
        <div className="login" ref={errorRef}>
            <h1>Login</h1>
            <form className="flex column" action="/form" autoComplete="new-password" onSubmit={handleForm}>
                <input type="text" autoComplete="new-password" placeholder="Email" required onInput={handleErrorRemovals} onClick={handleErrorRemovals} />
                <div className="pass-wrapper flex justify-center align-center">
                    <img src={shutEye} alt="eye show password icon" onClick={showPass} />
                    <input type="password" autoComplete="new-password" placeholder="Password" required onInput={handleErrorRemovals} onClick={handleErrorRemovals} />
                </div>
                <button>Sign in</button>
            </form>
            <a href="/register" onClick={() => errorRef.current.animation = "fade-out 1s 1 forwards ease"}>New around?</a>
            {/* <div className="color-line-wrapper flex">
                <div className="color-line line1" />
                <div className="color-line line2" />
                <div className="color-line line3" />
                <div className="color-line line4" />
            </div> */}
        </div>
    </section>
}