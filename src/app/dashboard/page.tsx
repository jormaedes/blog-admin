import useAuthStore from "@/stores/authStore"

export default function Dashboard(){
	const user = useAuthStore((state) => state.user);
	return (
		<h1>Olá, {user?.firstname}</h1>
	)
}