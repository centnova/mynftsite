import { useRouter } from "next/router";

const Post = () => {
    const router = useRouter()
    const { tid } = router.query

    return (
        <div>
            <h3>Token: {tid}</h3>
            <img src="/vercel.svg" alt="Token image" />
        </div>
    )
}

export default Post