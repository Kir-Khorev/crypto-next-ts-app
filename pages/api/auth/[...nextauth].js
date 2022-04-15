import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: '10276809735bc5077f4b',
            clientSecret: '4890bc1d231a24f458d1ccaa8f48d4137b132c50',
        }),
        // ...add more providers here
    ],
})