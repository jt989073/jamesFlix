import { useAuthStore } from "../../store/AuthUser.js";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

const HomePage = () => {
  const { user } = useAuthStore();
  console.log(user)
  return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
};

export default HomePage;
