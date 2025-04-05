"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import type { AppointmentEvent } from "@/components/calendar-view"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface UpdateAppointmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  appointment: AppointmentEvent
  onSuccess: () => void
}

export function UpdateAppointmentDialog({ open, onOpenChange, appointment, onSuccess }: UpdateAppointmentDialogProps) {
  const [formData, setFormData] = useState({
    Nombre: "",
    Telefono: "",
    Fecha: "",
    Nota: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (appointment) {
      setFormData({
        Nombre: appointment.title,
        Telefono: appointment.phone,
        Fecha: new Date(appointment.start).toISOString().slice(0, 16),
        Nota: appointment.note,
      })
    }
  }, [appointment])

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
      const response = await fetch(`http://localhost:3001/appointments/${appointment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        onSuccess()
      } else {
        toast({
          title: "Error",
          description: "No se pudo actualizar la cita",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: "Ocurrió un error al actualizar la cita",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    setIsLoading(true)

    try {
      const response = await fetch(`http://localhost:3001/appointments/${appointment.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        onSuccess()
        toast({
          title: "Cita eliminada",
          description: "La cita ha sido eliminada exitosamente",
        })
      } else {
        toast({
          title: "Error",
          description: "No se pudo eliminar la cita",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: "Ocurrió un error al eliminar la cita",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setIsDeleteDialogOpen(false)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Cita</DialogTitle>
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
            <div className="flex justify-between">
              <Button type="button" variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
                Eliminar
              </Button>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Guardando..." : "Guardar"}
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente la cita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

