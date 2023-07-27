import p404 from '../assets/images/404.png'
export const PageNotFound = () => {
    return <section className="page-404-wrapper flex column align-center justify-center">
        <div className="page-404 flex column align-center justify-center">
            <h1>Page not found</h1>
            <p>looks like you got lost...</p>
            <a href="/">Head back</a>
        </div>
            <img src={p404} alt="" />
    </section>
}