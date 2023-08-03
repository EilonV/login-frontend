import { useRef } from "react"
import { httpsService } from "../services/https.service"
import eye from '../assets/images/eye.svg'
import shutEye from '../assets/images/eye-off.svg'
export const Register = () => {
    const errorRef = useRef()

    const handleForm = (e) => {
        let user
        let email = e.target[0]
        let fname = e.target[1]
        let lname = e.target[2]
        let pass = e.target[3]
        let passAuth = e.target[4]
        let userExist = false

        httpsService.find(email.value, 'email')
            .then((res) => {
                if (res.data.users.length) userExist = true

                if (pass.value !== passAuth.value) {
                    addError(pass, 'pass')
                    addError(passAuth, 'pass-auth')
                }
                else if (userExist) {
                    addError(email, 'email-exist')
                }
                else {
                    user = {
                        email: email.value,
                        name: fname.value.concat(' ', lname.value),
                        pass: pass.value
                    }
                    httpsService.postUser(user)
                }
            })
        e.preventDefault()


        console.log(user);
    }

    const addError = (el, type) => {
        removePriorErrors()
        errorRef.current.classList.add(`error-${type}`)
        el.classList.add('error')
    }

    const removePriorErrors = () => {
        errorRef.current.classList.remove('error-pass-auth')
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

    return <section className="register-wrapper flex column align-center justify-center">
        <div className="register" ref={errorRef}>
            <h1>Register</h1>
            <form className="flex column" action="/form" autoComplete="new-password" onSubmit={handleForm}>
                <input type="email" placeholder="Email" required onKeyDown={(e) => { if (e.code === 'Space') e.preventDefault() }} onClick={handleErrorRemovals} onChange={handleErrorRemovals} />
                <input type="text" name="fname" placeholder="First name" required />
                <input type="text" name="lname" placeholder="Last name" required />
                <div className="pass-wrapper flex justify-center align-center">
                    <img src={shutEye} alt="eye show password icon" onClick={showPass} />
                    <input type="password" id="pass" placeholder="Password" minLength={6} autoComplete="new-password" required onKeyDown={(e) => { if (e.code === 'Space') e.preventDefault() }} onClick={handleErrorRemovals} onChange={handleErrorRemovals} />
                </div>
                <div className="pass-wrapper flex justify-center align-center">
                    <img src={shutEye} alt="eye show password icon" onClick={showPass} />
                    <input type="password" placeholder="Password confirm" minLength={6} required onKeyDown={(e) => { if (e.code === 'Space') e.preventDefault() }} onClick={handleErrorRemovals} onChange={handleErrorRemovals} />
                </div>
                <button>Sign up</button>
            </form>
            <a href="/">Already a member?</a>

        </div>
        <div className="gradient" />
    </section>
}