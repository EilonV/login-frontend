import { useRef } from "react"
import httpsService from "../services/https.service"

export const Register = () => {
    const errorRef = useRef()

    const handleForm = (e) => {
        let user
        let email = e.target[0]
        let fname = e.target[1]
        let lname = e.target[2]
        let pass = e.target[3]
        let passAuth = e.target[4]

        e.preventDefault()
        if (pass.value !== passAuth.value) {
            addError(pass)
            addError(passAuth)
        }
        else {
            user = {
                email: email.value,
                name: fname.value.concat(' ', lname.value),
                pass: pass.value
            }
            httpsService.postUser(user)
                .then(console.log('success'))
        }

        console.log(user);
    }

    const addError = (el) => {
        removePriorErrors()
        errorRef.current.classList.add(`error-pass-auth`)
        el.classList.add('error')
    }

    const removePriorErrors = () => {
        errorRef.current.classList.remove('error-pass-auth')
    }

    const handleErrorRemovals = (e) => {
        e.target.classList.remove('error')
        removePriorErrors()
    }

    return <section className="register-wrapper flex column align-center justify-center">
        <div className="register" ref={errorRef}>
            <h1>Register</h1>
            <form className="flex column" action="/form" autoComplete="new-password" onSubmit={handleForm}>
                <input type="email" placeholder="Email" required />
                <input type="text" name="fname" placeholder="First name" required />
                <input type="text" name="lname" placeholder="Last name" required />
                <input type="password" placeholder="Password" minLength={6} autoComplete="new-password" required onKeyDown={(e) => { if (e.code === 'Space') e.preventDefault() }} onClick={handleErrorRemovals} onChange={handleErrorRemovals} />
                <input type="password" placeholder="Password confirm" minLength={6} required onKeyDown={(e) => { if (e.code === 'Space') e.preventDefault() }} onClick={handleErrorRemovals} onChange={handleErrorRemovals} />
                <button>Sign up</button>
            </form>
        </div>
        <div className="gradient" />
    </section>
}