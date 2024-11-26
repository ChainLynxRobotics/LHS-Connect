import { SvelteKitAuth } from "@auth/sveltekit"
import Google from "@auth/sveltekit/providers/google"
import type { Provider } from "@auth/sveltekit/providers"

const providers: Provider[] = [
    Google({
        
    })
];
 
export const { handle, signIn, signOut } = SvelteKitAuth({
    providers,
    pages: {
        signIn: "/admin/login",
        signOut: "/"
    },
    callbacks: {
        signIn: (user) => {
            console.log(user);
            return true;
        }
    }
});