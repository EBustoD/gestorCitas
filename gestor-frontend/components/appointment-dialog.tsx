"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface AppointmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function AppointmentDialog({ open, onOpenChange, onSuccess }: AppointmentDialogProps) {
  const [formData, setFormData] = useState({
    Nombre: "",
    Telefono: "",
    Fecha: "",
    Nota: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:3001/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        onSuccess()
        setFormData({ Nombre: "", Telefono: "", Fecha: "", Nota: "" })
      } else {
        toast({
          title: "Error",
          description: "No se pudo crear la cita",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: "Ocurrió un error al crear la cita",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nueva Cita</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="Nombre">Nombre</Label>
            <Input id="Nombre" name="Nombre" value={formData.Nombre} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="Telefono">Teléfono</Label>
            <Input id="Telefono" name="Telefono" value={formData.Telefono} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="Fecha">Fecha y Hora</Label>
            <Input
              id="Fecha"
              name="Fecha"
              type="datetime-local"
              value={formData.Fecha}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="Nota">Nota</Label>
            <Textarea id="Nota" name="Nota" value={formData.Nota} onChange={handleChange} rows={3} />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

