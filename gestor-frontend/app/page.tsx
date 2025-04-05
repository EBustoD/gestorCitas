import { LoginForm } from "@/components/login-form"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-sky-50 to-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-sky-700">Gestor de Citas</h1>
          <p className="mt-2 text-gray-600">Inicie sesión para acceder al sistema</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

