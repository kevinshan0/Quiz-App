import { auth } from "$lib/firebase.app";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import type { Actions } from './$types';

export const actions = {
    signin: async ({ request }) => {
        const data = await request.formData();
        const email = data.get('email') as string;
        const password = data.get('password') as string;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch {
            return { success: false };
        }
    },
    register: async ({ request }) => {
        const data = await request.formData();
        const email = data.get('email') as string;
        const password = data.get('password') as string;

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await signInWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch {
            return { success: false };
        }
    }
} satisfies Actions;