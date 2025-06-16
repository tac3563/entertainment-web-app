import { create } from "zustand/react";
import type { User } from "firebase/auth";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { app } from "../firebaseConfig.ts";

const auth = getAuth(app);

type AuthState = {
  user: User | null;
  loading: boolean;
  userIsAuthenticated: boolean;
  login: (email: string, password: string) => void;
  signUp: (email: string, password: string) => void;
  logout: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  userIsAuthenticated: false,
  login: async (email, password) => {
    set({ loading: true });
    try {
      const userLogin = await signInWithEmailAndPassword(auth, email, password);
      set({ user: userLogin.user, userIsAuthenticated: true });
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      set({ loading: false });
    }
  },
  signUp: async (email, password) => {
    set({ loading: true });
    try {
      const userLogin = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      set({ user: userLogin.user, userIsAuthenticated: true });
    } catch (error) {
      console.error("Sign up failed:", error);
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    set({ loading: true });
    try {
      await signOut(auth);
      set({ user: null, userIsAuthenticated: false });
    } catch (error) {
      console.error("Sign out failed::", error);
    } finally {
      set({ loading: false });
    }
  },
}));

onAuthStateChanged(auth, (user) => {
  useAuthStore.setState({
    user,
    loading: false,
    userIsAuthenticated: !!user,
  });
});

export default useAuthStore;
