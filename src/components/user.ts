import { getAuth, User } from "firebase/auth";
import { ref } from "vue";

import { app } from "@/firebase";

export const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
];

// User firebase to receive current user and autheticaiton status.
export const useUser = () => {
  const user = ref<User | null>(null);
  const isLoggedIn = ref(false);

  const auth = getAuth(app);
  auth.onAuthStateChanged((u) => {
    user.value = u;
    isLoggedIn.value = !!u && !u.isAnonymous;
  });

  return {
    user,
    isLoggedIn,
  };
};
