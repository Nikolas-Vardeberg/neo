import { Spinner } from "@/components/global/loader/spinner"

const AuthLoading = () => {
    return(
        <div className="h-screen flex w-full justify-center items-center">
            <Spinner />
        </div>
    )
}

export default AuthLoading