import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: '5143c8b190e6975a0f61',
            clientSecret: '24357e5d6032114f0c7f8a5ccd09c5b4c2fd9ac6',
        }),
        // ...add more providers here
    ],
})